import { Router } from "express";
import { createUserController, updateUserController } from "./user.controller";

export const userRouter = Router();

userRouter.post("/create-user", createUserController);
userRouter.patch("/update-user", updateUserController);
