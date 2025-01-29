import express, { NextFunction, Request, Response } from "express";
import {
  initiatePayment,
  PaymentController,
  paymentSuccess,
  paymentUnSuccess,
} from "./payment.controller";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/success/:tran_id", paymentSuccess);
router.post("/fail/:tran_id", paymentUnSuccess);

//getAllPayment by Admin
router.get("/admin/payment", PaymentController.getAllPaymentByAdmin);
//getAllPayment by User

router.get("/payment/:userId", PaymentController.getAllPaymentByUser);
//delete Paymnt
router.delete("/payment/:paymentId", PaymentController.deletePayment);

//Make Confirm by admin
router.patch("/admin/update/:paymentId", PaymentController.confirmPayment);

export const paymentRoutes = router;
