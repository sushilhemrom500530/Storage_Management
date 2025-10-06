import { Types } from "mongoose";

export interface TFavorite {
  user?: Types.ObjectId;
  itemType: "Folder" | "Note" | "Image" | "Pdf";
  itemId: Types.ObjectId;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
