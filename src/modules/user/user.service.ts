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
    throw error;
  }
};

export { addNewUserToDB, updateUserFromDB };
