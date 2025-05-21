import { Router } from "express";

import { verifyToken } from "../../utils/verify";
import { createFlatController } from "./flat.controller";
import { isRole } from "../../utils/isRole";

export const flatRouter = Router();

flatRouter.post("/create-flat",verifyToken,isRole('owner'), createFlatController); 
// flatRouter.get("/get-flat",verifyToken, readUserController);
// flatRouter.patch("/update-flat", verifyToken, updateUserController);
// flatRouter.delete("/delete-flat",verifyToken, deleteUserController);

