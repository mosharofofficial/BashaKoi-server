import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  loginUser,
  readUserController,
  updateUserController,
} from "./user.controller";
import { verifyToken } from "../../utils/verify";

export const userRouter = Router();

userRouter.post("/create-user", createUserController);
userRouter.patch("/update-user", verifyToken, updateUserController);
userRouter.get("/get-user", readUserController);
userRouter.delete("/delete-user",verifyToken, deleteUserController);
userRouter.post("/login", loginUser);

