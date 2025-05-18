import { RequestHandler } from "express";
import { addFlat2DB } from "./flats.service";



const createFlatController: RequestHandler = async (req, res, next) => {
    const flatData = req.body;

    try {
      const newflat = await addFlat2DB(flatData);  
      res.json(newflat);
    } catch (error) {
      next(error);
    }
  };

const readFlatController: RequestHandler = async (req, res, next) => {
    try {
        // const flatData = await getFlatFromDB();
    } catch (error) {
        
    }
}
  
  export {createFlatController}