import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized request",
      });
    }

    const { productId } = req.params;
    const { content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({
        error: "Content of comment required",
      });
    }
    

    const existingProduct = await queries.getProductById(productId as string);
    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const comment = await queries.createComment({
      content,
      userId,
      productId: productId as string
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      error: "Failed to create comment",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized request",
      });
    }

    const { commentId } = req.params;

    const existingComment = await queries.getCommentById(commentId as string);

    if (!existingComment) {
      return res.status(404).json({
        error: "Comment not found",
      });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({
        error: "Forbidden - No permission",
      });
    }

    await queries.deleteComment(commentId as string);

    return res.status(204).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({
      error: "Failed to delete comment",
    });
  }
};
