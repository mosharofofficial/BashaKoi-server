import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "owner" | "tenant";
  profileImage?: string;
  createdAt: Number;
  favouriteFlats: mongoose.Types.ObjectId;
}

export interface AuthUser extends Omit<IUser, "password"> {
  token: String;
}
