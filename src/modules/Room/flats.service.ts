import { IFlat } from "./flat.interface";
import { Flat } from "./flat.model";

export const addFlat2DB = async (flatData: IFlat) => {
  try {
    const result = await Flat.create(flatData);
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getFlatFromDB = async (id: string) => {
  try {
    const result = Flat.findById(id).populate("ownerId");
    return result;
  } catch (error) {
    console.log(error);
  }
};
