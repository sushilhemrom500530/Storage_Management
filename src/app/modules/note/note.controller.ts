/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NoteService } from "./note.service";

const getAllNotes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await NoteService.getAllNotes(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Note Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const createNote = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await NoteService.createNote(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Note Created Successfully",
      data: result,
    });
  }
);

const getNoteById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const folderId = req.params.id;
    const result = await NoteService.getNoteById(folderId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Note Retrieved Successfully",
      data: result,
    });
  }
);

const updateNode = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.id;
    const updatedData = req.body;
    const result = await NoteService.updatedNote(noteId, updatedData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Note Updated Successfully",
      data: result,
    });
  }
);

const deleteNote = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.id;
    const result = await NoteService.deleteNote(noteId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Note Deleted Successfully",
      data: result,
    });
  }
);

export const NoteControllers = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNode,
  deleteNote,
};
