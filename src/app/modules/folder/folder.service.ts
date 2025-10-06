import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { TFolder } from "./folder.interface";
import { Folder } from "./folder.model";

const getAllFolders = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Folder.find(), query);
  const usersData = queryBuilder
    .filter()
    .search(["name"])
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const createFolder = async (payload: Partial<TFolder>) => {
  const create = await Folder.create(payload);

  return { data: create };
};

const getFolderById = async (id: string) => {
  const folder = await Folder.findById(id);
  if (!folder) {
    throw new AppError(httpStatus.BAD_REQUEST, "Folder not found");
  }

  return folder;
};

const updateFolder = async (updatedId: string, payload: Partial<TFolder>) => {
  const folder = await Folder.findById(updatedId);
  if (!folder) {
    throw new AppError(httpStatus.BAD_REQUEST, "Folder not found");
  }

  const updatedFolder = await Folder.findByIdAndUpdate(updatedId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedFolder;
};

const deleteFolder = async (id: string) => {
  const folder = await Folder.findById(id);
  if (!folder) {
    throw new AppError(httpStatus.NOT_FOUND, "Folder not found");
  }

  const deletedFolder = await Folder.findByIdAndDelete(id);

  return deletedFolder;
};

export const FolderService = {
  getAllFolders,
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
};
