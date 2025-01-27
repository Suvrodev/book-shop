import mongoose, { Schema, Document, model } from "mongoose";

export interface PaymentDocument extends Document {
  transactionId: string;
  cartId?: string;
  userId?: string;
  productId?: string;
  price: number;
  paidStatus?: string | boolean;
}

const PaymentSchema = new Schema<PaymentDocument>(
  {
    transactionId: { type: String },
    userId: { type: String },
    productId: { type: String },
    price: { type: Number },
    paidStatus: { type: Schema.Types.Mixed, required: false },
  },
  { timestamps: true }
);

// export default mongoose.model<PaymentDocument>("Payment", PaymentSchema);
export const paymentModel = model<PaymentDocument>("payments", PaymentSchema);
