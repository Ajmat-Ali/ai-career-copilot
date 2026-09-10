import { Schema, Types, Document, model } from "mongoose";

export interface IAppConfig {
  defaultAttemptsLimit: number;
  updatedAt: Date;
}

const appConfigSchema = new Schema<IAppConfig>(
  {
    defaultAttemptsLimit: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

export const AppConfig = model<IAppConfig>("AppConfig", appConfigSchema);
