"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    transactionId: { type: String },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book" },
    price: { type: Number },
    quantity: { type: Number },
    paidStatus: { type: mongoose_1.Schema.Types.Mixed, required: false },
    adminApproval: {
        type: String,
        enum: ["pending", "confirm"],
        default: "pending",
    },
}, { timestamps: true });
// export default mongoose.model<PaymentDocument>("Payment", PaymentSchema);
exports.paymentModel = (0, mongoose_1.model)("payments", PaymentSchema);
