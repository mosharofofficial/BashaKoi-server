import { RequestHandler } from "express";
import {
  addNewUserToDB,
  deleteUserFromDB,
  getUserDataFromDB,
  updateUserFromDB,
} from "./user.service";
import { IUser } from "./user.interface";

const createUserController: RequestHandler = async (req, res, next) => {
  const userData = req.body;
  try {
    const user = await addNewUserToDB(userData);
    (user as IUser).password = "HIDDEN";
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserController: RequestHandler = async (req, res) => {
  try {
    const updatedUser = await updateUserFromDB(
      req.body,
      req.query.email as string
    );
    res.json(updatedUser);
  } catch (error) {}
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

const deleteUserController: RequestHandler = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserFromDB(req.query.email as string);
        (deletedUser as IUser).password = "HIDDEN";
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export {
  createUserController,
  updateUserController,
  readUserController,
  deleteUserController,
};
