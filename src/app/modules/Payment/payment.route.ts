import express, { NextFunction, Request, Response } from "express";
import {
  initiatePayment,
  PaymentController,
  paymentSuccess,
  paymentUnSuccess,
} from "./payment.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/initiate", auth("user"), initiatePayment);
router.post("/success/:tran_id", paymentSuccess);
router.post("/fail/:tran_id", paymentUnSuccess);

//getAllPayment by Admin
router.get(
  "/admin/payment",
  auth("admin"),
  PaymentController.getAllPaymentByAdmin
);

//getAllPayment by User
router.get(
  "/payment/:userId",
  auth("user"),
  PaymentController.getAllPaymentByUser
);
//delete Paymnt
router.delete(
  "/payment/:paymentId",
  auth("user"),
  PaymentController.deletePayment
);

//delete Paymnt by admin
router.delete(
  "/admin/:paymentId",
  auth("admin"),
  PaymentController.deletePaymentByAdmin
);

//Make Confirm by admin
router.patch(
  "/admin/update/:paymentId",
  auth("admin"),
  PaymentController.confirmPayment
);

export const paymentRoutes = router;
