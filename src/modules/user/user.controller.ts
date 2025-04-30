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

// CRUD

const createUserController: RequestHandler = async (req, res, next) => {
  const userData = req.body;
  try {
    const newUser = await addNewUserToDB(userData);

    const token = generateJWTToken({
      email: userData.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    (newUser as IUser).password = "HIDDEN";

    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const readUserController: RequestHandler = async (req, res, next) => {
  try {
    const user = await getUserDataFromDB(req.query.email as string);
    (user as IUser).password = "HIDDEN";
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserController: RequestHandler = async (req, res, next) => {
  try {
    ["email", "password"].forEach((key) => delete req.body.updated[key]);
    const updatedUser = await updateUserFromDB(
      req.body.updated,
      req.query.email as string
    );
    (updatedUser as IUser).password = "HIDDEN";
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUserController: RequestHandler = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserFromDB(req.query.email as string);
    (deletedUser as IUser).password = "HIDDEN";
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

// Others

const loginUser: RequestHandler = async (req, res, next) => {
  try {
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
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: config.node_env === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.json(userData);
    }
  } catch (error) {
    next(error);
  }
};

export {
  createUserController,
  updateUserController,
  readUserController,
  deleteUserController,
  loginUser,
};
