import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "owner" | "tenant";
  profileImage?: string;
  createdAt: Number;
  favouriteFlats: mongoose.Types.ObjectId;
  token?: string;
}
