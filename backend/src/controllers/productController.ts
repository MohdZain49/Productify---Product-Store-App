import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    return res.status(500).json({
      error: "Failed to get products",
    });
  }
};

export const getUserProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized request",
      });
    }

    const products = await queries.getProductsByUserId(userId);
    if (!products) {
      return res.status(404).json({
        error: "Products not found",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error getting user products:", error);
    return res.status(500).json({
      error: "Failed to get user products",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await queries.getProductById(id as string);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product", error);
    return res.status(500).json({
      error: "Failed to get product",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized request",
      });
    }

    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product", error);
    return res.status(500).json({
      error: "Failed to create new product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized request",
      });
    }

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id as string);
    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (existingProduct.userId !== userId) {
      return res.status(403).json({
        error: "Invalid request",
      });
    }

    const updatedProduct = await queries.updateProduct(id as string, {
      title: title ?? existingProduct.title,
      description: description ?? existingProduct.description,
      imageUrl: imageUrl ?? existingProduct.imageUrl,
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product", error);
    return res.status(500).json({
      error: "Failed to update the product",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized request",
      });
    }

    const { id } = req.params;

    const existingProduct = await queries.getProductById(id as string);
    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (existingProduct.userId !== userId) {
      return res.status(403).json({
        error: "Invalid request",
      });
    }

    await queries.deleteProduct(id as string);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product", error);
    return res.status(500).json({
      error: "Failed to delete product",
    });
  }
};
