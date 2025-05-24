import { config } from "../../config";
import { IFlat } from "./flat.interface";
import { Flat } from "./flat.model";

export const addFlat2DB = async (flatData: IFlat) => {
  try {
    const result = await Flat.create(flatData);
    return result;
  } catch (error) {
    if (config.node_env === "development") {
      console.log("error: ", error);
    }
  }
};

export const getFlatFromDB = async (id: string) => {
  try {
    const result = Flat.findById(id).populate("ownerId");
    return result;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

export const updateFlatInDB = async function name(
  id: string,
  data: Partial<IFlat>
) {
  try {
    const result = await Flat.findByIdAndUpdate(id, data, { new: true });
    return result;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

export const deleteFlatFromDB = async (id: string) => {
  try {
    const result = await Flat.findByIdAndDelete(id);
    return result;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

export const getAllFlatsFromDB = async () => {
  try {
    const allFlats = await Flat.find({});
    return allFlats;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};
