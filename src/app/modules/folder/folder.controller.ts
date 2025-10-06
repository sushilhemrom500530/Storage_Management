/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FolderService } from "./folder.service";

const getAllFolder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await FolderService.getAllFolders(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Folder Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const createFolder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await FolderService.createFolder(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Folder Created Successfully",
      data: result.data,
    });
  }
);

const getFolderById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const folderId = req.params.id;
    const result = await FolderService.getFolderById(folderId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Folder Retrieved Successfully",
      data: result,
    });
  }
);

const updateFolder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const folderId = req.params.id;
    const updatedData = req.body;
    const result = await FolderService.updateFolder(folderId, updatedData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Folder Updated Successfully",
      data: result,
    });
  }
);

const deleteFolder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const folderId = req.params.id;
    const result = await FolderService.deleteFolder(folderId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Folder Deleted Successfully",
      data: result,
    });
  }
);

export const FolderControllers = {
  getAllFolder,
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
};
