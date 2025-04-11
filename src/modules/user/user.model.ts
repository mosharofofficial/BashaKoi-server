import mongoose, { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profileImage: { type: String, required: false },
  createdAt: { type: Number, required: true },
  favouriteFlats: { type: Schema.Types.ObjectId, ref: "Flat", required: false },
});

export const User = model<IUser>("User", userSchema);
