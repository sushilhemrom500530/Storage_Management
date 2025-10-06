/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ImageService } from "./image.service";

const getAllImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await ImageService.getAllImages(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Images Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const createImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ImageService.createImage(req);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Image uploaded successfully",
      data: result.data,
    });
  }
);

const getImageById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const imageId = req.params.id;
    const result = await ImageService.getImageById(imageId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Image Retrieved Successfully",
      data: result,
    });
  }
);

const updateImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const imageId = req.params.id;
    const result = await ImageService.updateImage(imageId, req);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Image Updated Successfully",
      data: result,
    });
  }
);

const deleteImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const imageId = req.params.id;
    const result = await ImageService.deleteImage(imageId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Image Deleted Successfully",
      data: result,
    });
  }
);

export const ImageControllers = {
  getAllImages,
  createImage,
  getImageById,
  updateImage,
  deleteImage,
};
