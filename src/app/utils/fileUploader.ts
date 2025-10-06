/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import fs from "fs";
import { TCloudinaryResponse, TFile } from "../interfaces/file";
import { envVars } from "../config/env";

// Configuration
cloudinary.config({
  cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
});

// disk storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// single file upload
const uploadToCloudinary = async (
  file: TFile
): Promise<TCloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: TCloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// multiple file upload
const uploadMultipleToCloudinary = async (
  files: TFile[]
): Promise<TCloudinaryResponse[]> => {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<TCloudinaryResponse>((resolve, reject) => {
          cloudinary.uploader.upload(
            file.path,
            (error: any, result: TCloudinaryResponse) => {
              fs.unlinkSync(file.path); // Clean up
              if (error) reject(error);
              else resolve(result);
            }
          );
        })
    )
  );
};
export const fileUploader = {
  upload,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
};
