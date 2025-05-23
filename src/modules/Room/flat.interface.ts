import mongoose from "mongoose";
import { IUser } from "../user/user.interface";

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
  ownerId: string|IUser;
}
