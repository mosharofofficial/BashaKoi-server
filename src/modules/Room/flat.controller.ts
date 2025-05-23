import { RequestHandler } from "express";
import { addFlat2DB, getFlatFromDB } from "./flats.service";
import { controllerWrapper } from "../../utils/controllerWrapper";
import { IUser } from "../user/user.interface";

// export const createFlatController: RequestHandler = async (req, res, next) => {
//     const flatData = req.body;

//     try {
//       const newflat = await addFlat2DB(flatData);
//       res.json(newflat);
//     } catch (error) {
//       next(error);
//     }
//   };

export const createFlatController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const flatData = req.body;
    const newFlat = await addFlat2DB(flatData);
    res.json(newFlat);
  }
);

export const readFlatController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const flatData = await getFlatFromDB(req.body.id);
    (flatData?.ownerId as IUser).password = "HIDDEN";
    res.json(flatData);
  }
);
