import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface TAuthProvider {
  provider: "google" | "credentials"; // "Google", "Credential"
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface TUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isDeleted?: string;
  isActive?: IsActive;
  isAgreedTermsAndConditions?: boolean | false;
  isVerified?: boolean;
  role?: Role;
  auths: TAuthProvider[];
  verificationCode?: string;
  verificationCodeExpires?: Date;
  createdAt?: Date;
}
