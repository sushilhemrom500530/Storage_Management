import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatsService } from "./stats.service";

const getStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stats fetched successfully",
    data: stats,
  });
});

const getFiltered = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getFiltered(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data fetched successfully",
    data: stats,
  });
});

const getRecentData = catchAsync(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 5;
  const recent = await StatsService.getRecentData(limit);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recent data fetched successfully",
    data: recent,
  });
});

export const StatsController = {
  getStats,
  getFiltered,
  getRecentData,
};
