import mongoose from "mongoose";

export interface IRoomTypes {
  bedroom: number;
  bathroom: number;
  kitchen: number;
  livingRoom: number;
  balcony?: number;
}

export interface IFlat {
  rooms: number;
  roomTypes: IRoomTypes;
  location: string;
  coordinates?: { lat: number; lng: number };
  availableFrom: Date | false;
  image: string[];
  ownerId: mongoose.Schema.Types.ObjectId;
}
