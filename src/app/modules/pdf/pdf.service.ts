/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Request } from "express";
import { fileUploader } from "../../utils/fileUploader";
import { Pdf } from "./pdf.model";
import { TPdf } from "./pdf.interface";

const getAllPdf = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Pdf.find(), query);
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

// const createPdf = async (req: Request) => {
//   const file = req.file;
//   if (!file) {
//     throw new AppError(httpStatus.BAD_REQUEST, "No PDF file provided");
//   }

//   // Upload PDF to Cloudinary as raw
//   const uploaded = await fileUploader.uploadToCloudinary(file, {
//     resource_type: "raw",
//   });

//   if (!uploaded?.secure_url) {
//     throw new AppError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       "Failed to upload PDF"
//     );
//   }

//   // Prepare payload for MongoDB
//   const payload: Partial<TPdf> = {
//     filename: file.originalname,
//     url: uploaded.secure_url,
//     folder: req.body.folder || null,
//   };

//   const created = await Pdf.create(payload);
//   return { data: created };
// };

export const createPdf = async (req: Request) => {
  const file = req.file;

  if (!file) {
    throw new Error("No PDF file provided");
  }

  // Upload PDF to Cloudinary using your helper
  const uploaded = await fileUploader.uploadPdf(file);

  if (!uploaded) {
    throw new Error("PDF upload failed");
  }

  // Prepare MongoDB payload
  const payload: Partial<TPdf> = {
    filename: file.originalname,
    url: uploaded.secure_url,
    folder: req.body.folder || null,
  };

  // Save PDF info to MongoDB
  const created = await Pdf.create(payload);

  return { data: created };
};

const getPdfById = async (id: string) => {
  const pdf = await Pdf.findById(id).populate("folder");
  if (!pdf) {
    throw new AppError(httpStatus.BAD_REQUEST, "Pdf not found");
  }
  return pdf;
};

export const updatePdf = async (updatedId: string, req: Request) => {
  const pdf = await Pdf.findById(updatedId);
  if (!pdf) {
    throw new AppError(httpStatus.BAD_REQUEST, "PDF not found");
  }

  // Prepare payload with body fields
  const payload: Partial<TPdf> = { ...req.body };

  // Handle file upload if a new PDF is provided
  const file = req.file;
  if (file) {
    // Upload PDF to Cloudinary
    const uploaded = await fileUploader.uploadPdf(file);

    if (!uploaded) {
      throw new AppError(httpStatus.BAD_REQUEST, "PDF upload failed");
    }

    payload.filename = file.originalname;
    payload.url = uploaded.secure_url; // viewable in browser
  }

  // Update in MongoDB
  const updatedPdf = await Pdf.findByIdAndUpdate(updatedId, payload, {
    new: true,
    runValidators: true,
  });

  return { data: updatedPdf };
};

const deletePdf = async (id: string) => {
  const pdf = await Pdf.findById(id);
  if (!pdf) {
    throw new AppError(httpStatus.NOT_FOUND, "Pdf not found");
  }

  const deletedImage = await Pdf.findByIdAndDelete(id);
  return deletedImage;
};

export const PdfService = {
  getAllPdf,
  createPdf,
  getPdfById,
  updatePdf,
  deletePdf,
};
