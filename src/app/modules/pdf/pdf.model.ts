// pdf.model.ts
import { Schema, model } from "mongoose";
import { TPdf } from "./pdf.interface";

const pdfSchema = new Schema<TPdf>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    folder: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  },
  { timestamps: true, versionKey: false }
);

export const Pdf = model<TPdf>("Pdf", pdfSchema);
