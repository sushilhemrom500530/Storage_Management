import { Schema, model } from "mongoose";
import { TFolder } from "./folder.interface";

const folderSchema = new Schema<TFolder>(
  {
    name: { type: String, required: true },
    description: { type: String },
    parentFolder: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  },
  { timestamps: true, versionKey: false }
);

export const Folder = model<TFolder>("Folder", folderSchema);
