import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  readUserController,
  updateUserController,
} from "./user.controller";

export const userRouter = Router();

userRouter.post("/create-user", createUserController);
userRouter.patch("/update-user", updateUserController);
userRouter.get("/get-user", readUserController);
userRouter.delete("/delete-user", deleteUserController);
