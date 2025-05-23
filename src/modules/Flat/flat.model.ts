import mongoose, { model, Schema } from "mongoose";
import { IFlat, IRoomTypes } from "./flat.interface";
import { User } from "../user/user.model";
import { config } from "../../config";

const roomTypesSchema = new Schema<IRoomTypes>(
  {
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    kitchen: { type: Number, required: true },
    livingRoom: { type: Number, required: true },
    balcony: { type: Number, required: false },
  },
  { _id: false }
);

const coordinatesSchema = new Schema<{ lat: number; lng: number }>(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const flatSchema = new Schema<IFlat>(
  {
    rooms: { type: Number, required: true },
    roomTypes: { type: roomTypesSchema, required: true },
    location: { type: String, required: true },
    coordinates: { type: coordinatesSchema, required: false },
    availableFrom: { type: Schema.Types.Mixed, required: true },
    image: { type: [String] },
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// middlewares :

flatSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc) {
      await User.updateMany(
        { favouriteFlats: doc._id },
        { $pull: { favouriteFlats: doc._id } }
      );
    }
  } catch (error) {
    if (config.node_env === "development") {
      console.log("flat schema post middleware: ---------------------");
      console.log(error);
    }
  }
});

export const Flat = model<IFlat>("Flat", flatSchema);
