import { Types } from "mongoose";

export interface TNote {
  title: string;
  content?: string;
  folder?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
