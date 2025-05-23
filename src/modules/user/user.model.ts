import mongoose, { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    role: { type: String, required: [true, "role is required"] },
    profileImage: { type: String, required: false },
    favouriteFlats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Flat",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
