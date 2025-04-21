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

userRouter.post("/register-user", createUserController);
userRouter.patch("/update-user", verifyToken, updateUserController);
userRouter.get("/get-user", readUserController);
userRouter.delete("/delete-user", deleteUserController);
userRouter.post("/login", loginUser);

