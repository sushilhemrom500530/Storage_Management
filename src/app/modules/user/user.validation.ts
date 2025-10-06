import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),

  password: z.string({ invalid_type_error: "Password must be string" }),
  // .min(8, { message: "Password must be at least 8 characters long." })
  // .regex(/^(?=.*[A-Z])/, {
  //   message: "Password must contain at least 1 uppercase letter.",
  // })
  // .regex(/^(?=.*[!@#$%^&*])/, {
  //   message: "Password must contain at least 1 special character.",
  // })
  // .regex(/^(?=.*\d)/, {
  //   message: "Password must contain at least 1 number.",
  // })
  role: z
    .enum(["ADMIN", "USER", "SUPER_ADMIN"] as [Role, ...Role[]])
    .optional(),

  isActive: z
    .enum(["ACTIVE", "INACTIVE"] as [IsActive, ...IsActive[]])
    .optional(),

  isVerified: z.boolean().default(true),

  isDeleted: z.string().optional(),

  isAgreedTermsAndConditions: z.boolean().default(false),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .optional(),
  password: z.any().refine((val) => val === undefined, {
    message: "Password cannot be updated from this route.",
  }),
  role: z
    // .enum(["ADMIN", "GUIDE", "USER", "SUPER_ADMIN"])
    .enum(Object.values(Role) as [string])
    .optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isVerified must be true or false" })
    .optional(),
  isAgreedTermsAndConditions: z.boolean().optional(),
});
