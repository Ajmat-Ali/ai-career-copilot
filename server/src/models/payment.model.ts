import { Schema, model, Document, Types } from "mongoose";

export type PaymentStatus = "created" | "paid" | "failed";

export interface IPayment extends Document {
  userId: Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpayEventId?: string;
  amount: number;
  currency: string;
  attemptsGranted: number;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true },
    razorpayEventId: { type: String, unique: true, sparse: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "INR" },
    attemptsGranted: { type: Number, required: true },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      required: true,
      default: "created",
    },
  },
  { timestamps: true },
);

export const Payment = model<IPayment>("Payment", paymentSchema);
