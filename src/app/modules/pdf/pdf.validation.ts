import { z } from "zod";

export const createImageZodSchema = z.object({
  filename: z
    .string({ invalid_type_error: "Filename must be a string" })
    .min(1, { message: "Filename is required" }),
  url: z
    .string({ invalid_type_error: "URL must be a string" })
    .url({ message: "Invalid URL" }),
  folder: z
    .string({ invalid_type_error: "Folder must be a string" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid folder ObjectId")
    .optional(),
});

export const updateImageZodSchema = z.object({
  filename: z
    .string({ invalid_type_error: "Filename must be a string" })
    .min(1, { message: "Filename is required" })
    .optional(),
  url: z
    .string({ invalid_type_error: "URL must be a string" })
    .url({ message: "Invalid URL" })
    .optional(),
  folder: z
    .string({ invalid_type_error: "Folder must be a string" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid folder ObjectId")
    .optional(),
});
