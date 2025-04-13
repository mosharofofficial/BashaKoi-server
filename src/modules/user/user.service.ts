import { IUser } from "./user.interface";
import { User } from "./user.model";

const addNewUserToDB = async (userData: IUser) => {
  try {
    return await User.create(userData);
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
