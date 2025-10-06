import { Schema, model } from "mongoose";
import { TImage } from "./image.interface";

const imageSchema = new Schema<TImage>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    folder: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  },
  { timestamps: true, versionKey: false }
);

export const Image = model<TImage>("Image", imageSchema);
