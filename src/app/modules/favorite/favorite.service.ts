/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Favorite } from "./favorite.model";
import { TFavorite } from "./favorite.interface";
import { Pdf } from "../pdf/pdf.model";
import { Folder } from "../folder/folder.model";
import { Note } from "../note/note.model";
import { Image } from "../image/image.model";

const getAllFavorite = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Favorite.find(), query);
  const usersData = queryBuilder.filter().sort().fields().paginate();

  const favorites = await usersData.build();

  const populatedData = await Promise.all(
    favorites.map(async (fav: any) => {
      let populatedItem = null;

      switch (fav.itemType) {
        case "Folder":
          populatedItem = await Folder.findById(fav.itemId);
          break;
        case "Note":
          populatedItem = await Note.findById(fav.itemId);
          break;
        case "Image":
          populatedItem = await Image.findById(fav.itemId);
          break;
        case "Pdf":
          populatedItem = await Pdf.findById(fav.itemId);
          break;
        default:
          populatedItem = null;
      }

      return {
        ...fav.toObject(),
        item: populatedItem,
      };
    })
  );

  const meta = await queryBuilder.getMeta();

  return {
    data: populatedData,
    meta,
  };
};

const createFavorite = async (payload: Partial<TFavorite>) => {
  if (!payload?.itemType || !payload?.itemId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Item type and ID are required");
  }

  let isExists = null;

  switch (payload.itemType) {
    case "Folder":
      isExists = await Folder.findById(payload.itemId);
      if (!isExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Folder not found");
      }
      break;

    case "Note":
      isExists = await Note.findById(payload.itemId);
      if (!isExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Note not found");
      }
      break;

    case "Image":
      isExists = await Image.findById(payload.itemId);
      if (!isExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Image not found");
      }
      break;

    case "Pdf":
      isExists = await Pdf.findById(payload.itemId);
      if (!isExists) {
        throw new AppError(httpStatus.NOT_FOUND, "PDF not found");
      }
      break;

    default:
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid item type");
  }

  const created = await Favorite.create(payload);

  return { data: created };
};

const getFavoriteById = async (id: string) => {
  // Find the favorite entry
  const favorite = await Favorite.findById(id);

  if (!favorite) {
    throw new AppError(httpStatus.BAD_REQUEST, "Favorite not found");
  }

  let populatedItem = null;

  switch (favorite.itemType) {
    case "Folder":
      populatedItem = await Folder.findById(favorite.itemId);
      break;
    case "Note":
      populatedItem = await Note.findById(favorite.itemId);
      break;
    case "Image":
      populatedItem = await Image.findById(favorite.itemId);
      break;
    case "Pdf":
      populatedItem = await Pdf.findById(favorite.itemId);
      break;
    default:
      populatedItem = null;
  }

  // Merge the data
  return {
    ...favorite.toObject(),
    item: populatedItem,
  };
};

const deleteFavorite = async (id: string) => {
  const favorite = await Favorite.findById(id);
  if (!favorite) {
    throw new AppError(httpStatus.NOT_FOUND, "Favorite not found");
  }
  const deletedFavorite = await Favorite.findByIdAndDelete(id);
  return deletedFavorite;
};

export const FavoriteService = {
  getAllFavorite,
  createFavorite,
  getFavoriteById,
  deleteFavorite,
};
