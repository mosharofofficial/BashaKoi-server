import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  loginUser,
  readUserController,
  updateUserController,
} from "./user.controller";
import { verifyToken } from "../../utils/verify";

export const userRouter = Router();

userRouter.post("/create-user", createUserController);
userRouter.patch("/update-user", verifyToken, updateUserController);
userRouter.post("/get-user", verifyToken, readUserController);
userRouter.delete("/delete-user", verifyToken, deleteUserController);
userRouter.post("/login", loginUser);
userRouter.get("/get-all", verifyToken, getAllUserController);
