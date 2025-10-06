import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { TImage } from "./image.interface";
import { Image } from "./image.model";
import { Request } from "express";
import { fileUploader } from "../../utils/fileUploader";

const getAllImages = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Image.find(), query);
  const imagesData = queryBuilder
    .filter()
    .search(["filename"])
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    imagesData.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const createImage = async (req: Request) => {
  const file = req.body?.file || req.file;

  const payload: Partial<TImage> = {};

  if (file) {
    const uploaded = await fileUploader.uploadToCloudinary(file);

    payload.filename = file.originalname;
    payload.url = uploaded?.secure_url;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "No file provided");
  }

  const create = await Image.create(payload);
  return { data: create };
};

const getImageById = async (id: string) => {
  const image = await Image.findById(id).populate("folder");
  if (!image) {
    throw new AppError(httpStatus.BAD_REQUEST, "Image not found");
  }
  return image;
};

export const updateImage = async (updatedId: string, req: Request) => {
  const image = await Image.findById(updatedId);
  if (!image) {
    throw new AppError(httpStatus.BAD_REQUEST, "Image not found");
  }

  const payload: Partial<TImage> = { ...req.body };

  const file = req.file || req.body?.file;
  if (file) {
    const uploaded = await fileUploader.uploadToCloudinary(file);
    payload.filename = file.originalname;
    payload.url = uploaded?.secure_url;
  }

  const updatedImage = await Image.findByIdAndUpdate(updatedId, payload, {
    new: true,
    runValidators: true,
  });

  return { data: updatedImage };
};

const deleteImage = async (id: string) => {
  const image = await Image.findById(id);
  if (!image) {
    throw new AppError(httpStatus.NOT_FOUND, "Image not found");
  }

  const deletedImage = await Image.findByIdAndDelete(id);
  return deletedImage;
};

export const ImageService = {
  getAllImages,
  createImage,
  getImageById,
  updateImage,
  deleteImage,
};
