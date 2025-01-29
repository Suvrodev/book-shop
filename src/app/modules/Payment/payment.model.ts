import mongoose, { Schema, Document, model } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    transactionId: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    productId: { type: Schema.Types.ObjectId, ref: "Book" },

    price: { type: Number },
    quantity: { type: Number },
    paidStatus: { type: Schema.Types.Mixed, required: false },
    adminApproval: {
      type: String,
      enum: ["pending", "confirm"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// export default mongoose.model<PaymentDocument>("Payment", PaymentSchema);
export const paymentModel = model<IPayment>("payments", PaymentSchema);
