import { Schema, model, Document, Types } from "mongoose";

export type ResumeStatus =
  | "pending"
  | "analyzing"
  | "generating"
  | "completed"
  | "failed";

interface IJobDescription {
  company?: string;
  role?: string;
  description: string;
}

interface IAnalysis {
  score: number;
  gaps: string[];
  feedback: string;
}

export interface IResume extends Document {
  userId: Types.ObjectId;
  originalResumeUrl: string;
  extractedResumeText: string;
  jobDescription: IJobDescription;
  status: ResumeStatus;
  analysis?: IAnalysis;
  optimizedContent?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    originalResumeUrl: { type: String, required: true },
    extractedResumeText: { type: String, required: true },
    jobDescription: {
      company: { type: String },
      role: { type: String },
      description: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "analyzing", "generating", "completed", "failed"],
      required: true,
      default: "pending",
    },
    analysis: {
      score: { type: Number },
      gaps: { type: [String] },
      feedback: { type: String },
    },
    optimizedContent: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const Resume = model<IResume>("Resume", resumeSchema);
