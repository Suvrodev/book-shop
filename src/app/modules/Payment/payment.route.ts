import express, { NextFunction, Request, Response } from "express";
import {
  initiatePayment,
  paymentSuccess,
  paymentUnSuccess,
} from "./payment.controller";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/success/:tran_id", paymentSuccess);
router.post("/fail/:tran_id", paymentUnSuccess);

export const paymentRoutes = router;
