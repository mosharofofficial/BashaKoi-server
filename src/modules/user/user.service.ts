import { config } from "../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const addNewUserToDB = async (userData: IUser) => {
  try {
    const hashedPass = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({ ...userData, password: hashedPass });

    return newUser;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

const updateUserFromDB = async (updatedInfo: Partial<IUser>, email: string) => {
  try {
    const user = await User.findOneAndUpdate({ email }, updatedInfo, {
      new: true,
    });

    // console.log("updated user controller: ", user);
    return user;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

const getUserDataFromDB = async (email: string) => {
  try {
    const userData = await User.findOne({ email }).populate("favouriteFlats");
    // console.log("service: ",userData);
    return userData;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

const deleteUserFromDB = async (email: string) => {
  try {
    const result = await User.findOneAndDelete({ email });
    return result;
  } catch (error) {
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

export {
  addNewUserToDB,
  updateUserFromDB,
  getUserDataFromDB,
  deleteUserFromDB,
};
