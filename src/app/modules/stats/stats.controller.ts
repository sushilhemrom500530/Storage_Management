// controllers/stats.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatsService } from "./stats.service";

const getStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getStats();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Stats fetched successfully",
    data: stats,
  });
});

export const StatsController = {
  getStats,
};
