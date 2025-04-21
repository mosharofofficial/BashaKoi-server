import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const addNewUserToDB = async (userData: IUser) => {
  try {
    const hashedPass = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({ ...userData, password: hashedPass });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const updateUserFromDB = async (updatedInfo: Partial<IUser>, email: string) => {
  try {
    const user = await User.findOneAndUpdate({ email }, updatedInfo, {
      new: true,
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

const getUserDataFromDB = async (email: string) => {
  try {
    const userData = await User.findOne({ email });
    console.log("service: ",userData);
    return userData;
  } catch (error) {
    console.log(error);
  }
}; 

const deleteUserFromDB = async (email: string) => {
  try {
    const result = await User.findOneAndDelete({ email });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {
  addNewUserToDB,
  updateUserFromDB,
  getUserDataFromDB,
  deleteUserFromDB,
};
