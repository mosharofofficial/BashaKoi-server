import { Router } from "express";

import { verifyToken } from "../../utils/verify";
import { createFlatController, readFlatController } from "./flat.controller";
import { isRole } from "../../utils/isRole";

export const flatRouter = Router();

flatRouter.post(
  "/create-flat",
  verifyToken,
  isRole('owner'),
  createFlatController
);
flatRouter.post("/get-flat", verifyToken, readFlatController);
// flatRouter.patch("/update-flat", verifyToken, updateUserController);
// flatRouter.delete("/delete-flat",verifyToken, deleteUserController);
