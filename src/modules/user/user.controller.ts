import { RequestHandler } from "express";
import { addNewUserToDB, updateUserFromDB } from "./user.service";
import { IUser } from "./user.interface";

const createUserController: RequestHandler = async (req, res) => {
  const userData = req.body;
  try {
    const user = await addNewUserToDB(userData);
    (user as IUser).password = "HIDDEN";
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUserController: RequestHandler = async (req, res) => {
  try {
    console.log(req.body, "--", req.query.email);
    const updatedUser = await updateUserFromDB(
      req.body,
      req.query.email as string
    );
    res.json(updatedUser);
  } catch (error) {}
};

export { createUserController, updateUserController };
