import { Types } from "mongoose";

export interface TFolder {
  name: string;
  description?: string;
  parentFolder?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
