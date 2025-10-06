import { Schema, model } from "mongoose";
import { TFavorite } from "./favorite.interface";

const favoriteSchema = new Schema<TFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },

    itemType: {
      type: String,
      enum: ["Folder", "Note", "Image", "Pdf"],
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },

    name: { type: String },
    description: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const Favorite = model<TFavorite>("Favorite", favoriteSchema);
