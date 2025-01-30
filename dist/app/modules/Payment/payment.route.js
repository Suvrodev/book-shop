"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/initiate", (0, auth_1.default)("user"), payment_controller_1.initiatePayment);
router.post("/success/:tran_id", payment_controller_1.paymentSuccess);
router.post("/fail/:tran_id", payment_controller_1.paymentUnSuccess);
//getAllPayment by Admin
router.get("/admin/payment", (0, auth_1.default)("admin"), payment_controller_1.PaymentController.getAllPaymentByAdmin);
//getAllPayment by User
router.get("/payment/:userId", (0, auth_1.default)("user"), payment_controller_1.PaymentController.getAllPaymentByUser);
//delete Paymnt
router.delete("/payment/:paymentId", (0, auth_1.default)("user"), payment_controller_1.PaymentController.deletePayment);
//delete Paymnt by admin
router.delete("/admin/:paymentId", (0, auth_1.default)("admin"), payment_controller_1.PaymentController.deletePaymentByAdmin);
//Make Confirm by admin
router.patch("/admin/update/:paymentId", (0, auth_1.default)("admin"), payment_controller_1.PaymentController.confirmPayment);
exports.paymentRoutes = router;
