import { Types } from "mongoose";

export interface TPdf {
  filename: string;
  url: string;
  folder?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
