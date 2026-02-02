import { Router } from "express";
import { requireAuth } from "@clerk/express";

import * as userController from '../controllers/userController'

const router = Router();

// POST /api/users/sync => sync the clerk user to DB (protected)
router.post("/sync", requireAuth(), userController.syncUser)

export default router;
