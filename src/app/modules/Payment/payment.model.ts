import mongoose, { Schema, Document, model } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    transactionId: { type: String },
    userId: { type: String },
    productId: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    paidStatus: { type: Schema.Types.Mixed, required: false },
  },
  { timestamps: true }
);

// export default mongoose.model<PaymentDocument>("Payment", PaymentSchema);
export const paymentModel = model<IPayment>("payments", PaymentSchema);
