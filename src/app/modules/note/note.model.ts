import { Schema, model } from "mongoose";
import { TNote } from "./note.interface";

const noteSchema = new Schema<TNote>(
  {
    title: { type: String, required: true },
    content: { type: String },
    folder: { type: Schema.Types.ObjectId, ref: "Folder" },
  },
  { timestamps: true, versionKey: false }
);

export const Note = model<TNote>("Note", noteSchema);
