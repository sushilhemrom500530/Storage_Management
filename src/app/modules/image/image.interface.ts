import { Types } from "mongoose";

export interface TImage {
  filename: string;
  url: string;
  folder?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
