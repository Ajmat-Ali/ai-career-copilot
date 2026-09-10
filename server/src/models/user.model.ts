import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  role: "user" | "admin";
  attemptsUsed: number;
  attemptsLimit: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: { type: Boolean, required: true, default: false },
    name: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    attemptsUsed: { type: Number, required: true, default: 0 },
    attemptsLimit: { type: Number, default: null },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
