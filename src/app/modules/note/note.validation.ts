import { z } from "zod";

export const createNoteZodSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  content: z
    .string({ invalid_type_error: "Content must be string" })
    .optional(),
  folder: z
    .string({ invalid_type_error: "Folder must be a valid ObjectId string" })
    .optional(),
});

export const updateNoteZodSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." })
    .optional(),
  content: z
    .string({ invalid_type_error: "Content must be string" })
    .optional(),
  folder: z
    .string({ invalid_type_error: "Folder must be a valid ObjectId string" })
    .optional(),
});
