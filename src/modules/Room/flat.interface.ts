import mongoose from "mongoose";

export interface Flat {
  id: mongoose.Types.ObjectId;
  rooms: number;
  description: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  availableFrom: Date | null;
  image: string[];
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
}
