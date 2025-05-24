import { RequestHandler } from "express";
import {
  addFlat2DB,
  deleteFlatFromDB,
  getAllFlatsFromDB,
  getFlatFromDB,
  updateFlatInDB,
} from "./flats.service";
import { controllerWrapper } from "../../utils/controllerWrapper";
import { IUser } from "../user/user.interface";
import { IFlat } from "./flat.interface";

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
    res.status(200).json({
      message: "success",
      data: newFlat,
    });
  }
);

export const readFlatController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const flatData = await getFlatFromDB(req.body.id);
    (flatData?.ownerId as IUser).password = "HIDDEN";
    res.status(200).json({
      message: "success",
      data: flatData,
    });
  }
);

export const updateFlatController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const flatData = req.body.updated;
    const id = req.query.id;

    ["ownerId"].forEach((key) => delete flatData[key]);
    const newFlatData = await updateFlatInDB(id as string, flatData);
    res.status(200).json({
      message: "success",
      data: newFlatData,
    });
  }
);

export const deleteFlatController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const id = req.query.id;
    const deleted = await deleteFlatFromDB(id as string);
    res.status(200).json({
      message: "success",
      data: deleted,
    });
  }
);

export const getAllFlatController: RequestHandler = controllerWrapper(
  async (req, res, next) => {
    const allFlats = await getAllFlatsFromDB();
    res.status(200).json({
      message: "success",
      data: allFlats,
    });
  }
);
