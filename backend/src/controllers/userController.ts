import type { Request, Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorised request" });
    }

    const { name, email, imageUrl } = req.body;
    if ([name, email, imageUrl].includes(undefined)) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const user = await queries.upsertUser({
      id: userId,
      name,
      email,
      imageUrl,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    return res.status(500).json({
      error: "Failed to sync user",
    });
  }
};
