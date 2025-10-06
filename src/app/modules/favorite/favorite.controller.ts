/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FavoriteService } from "./favorite.service";

const getAllFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await FavoriteService.getAllFavorite(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Favorite Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const createFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await FavoriteService.createFavorite(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Favorite Created Successfully",
      data: result.data,
    });
  }
);

const getFavoriteById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const favoriteId = req.params.id;
    const result = await FavoriteService.getFavoriteById(favoriteId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Favorite Retrieved Successfully",
      data: result,
    });
  }
);

const deleteFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const favoriteId = req.params.id;
    const result = await FavoriteService.deleteFavorite(favoriteId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Favorite Deleted Successfully",
      data: result,
    });
  }
);

export const FavoriteControllers = {
  getAllFavorite,
  createFavorite,
  getFavoriteById,
  deleteFavorite,
};
