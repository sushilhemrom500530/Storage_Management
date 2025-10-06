/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PdfService } from "./pdf.service";

const getAllIPdf = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await PdfService.getAllPdf(query as Record<string, string>);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Pdf Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const createPdf = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PdfService.createPdf(req);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Pdf uploaded successfully",
      data: result.data,
    });
  }
);

const getPdfById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pdfId = req.params.id;
    const result = await PdfService.getPdfById(pdfId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Pdf Retrieved Successfully",
      data: result,
    });
  }
);

const updatePdf = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pdfId = req.params.id;
    const result = await PdfService.updatePdf(pdfId, req);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Pdf Updated Successfully",
      data: result,
    });
  }
);

const deletePdf = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pdfId = req.params.id;
    const result = await PdfService.deletePdf(pdfId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Pdf Deleted Successfully",
      data: result,
    });
  }
);

export const PdfControllers = {
  getAllIPdf,
  createPdf,
  getPdfById,
  updatePdf,
  deletePdf,
};
