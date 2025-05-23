import { RequestHandler } from "express";
import {
  addNewUserToDB,
  deleteUserFromDB,
  getUserDataFromDB,
  updateUserFromDB,
} from "./user.service";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../../utils/jwt";
import { config } from "../../config";
import { controllerWrapper } from "../../utils/controllerWrapper";

// CRUD

const createUserController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const userData = req.body;

    const newUser = await addNewUserToDB(userData);

    const token = generateJWTToken({
      email: userData.email,
      role: userData.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    (newUser as IUser).password = "HIDDEN";

    res.json(newUser);
  }
);

const readUserController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const user = await getUserDataFromDB(req.body.email as string);
    (user as IUser).password = "HIDDEN";
    res.json(user);
  }
);

const updateUserController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    ["email", "password"].forEach((key) => delete req.body.updated[key]);
    const updatedUser = await updateUserFromDB(
      req.body.updated,
      req.query.email as string
    );
    (updatedUser as IUser).password = "HIDDEN";
    res.json(updatedUser);
  }
);

const deleteUserController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const deletedUser = await deleteUserFromDB(req.query.email as string);
    (deletedUser as IUser).password = "HIDDEN";
    res.json(deletedUser);
  }
);
// Others

const loginUser: RequestHandler = controllerWrapper(async (req, res, next) => {
  const userData = await getUserDataFromDB(req.body.email);
  if (
    !userData ||
    !(await bcrypt.compare(req.body.password, userData.password))
  ) {
    res.status(401).json({
      status: "failed",
      message: "Invalid email or password",
    });
    return;
  }

  if (await bcrypt.compare(req.body.password, userData?.password as string)) {
    (userData as IUser).password = "HIDDEN";
    const token = generateJWTToken({
      email: req.body.email,
      role: userData.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.json(userData);
  }
});

export {
  createUserController,
  updateUserController,
  readUserController,
  deleteUserController,
  loginUser,
};
