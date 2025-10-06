import { model, Schema } from "mongoose";
import { TAuthProvider, TUser, IsActive, Role } from "./user.interface";

// Embedded Auth Provider Schema
const authProviderSchema = new Schema<TAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);

// User Schema
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    isDeleted: { type: Boolean, default: false },
    isAgreedTermsAndConditions: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: true },
    auths: [authProviderSchema],
  },
  { timestamps: true, versionKey: false }
);

export const User = model<TUser>("User", userSchema);
