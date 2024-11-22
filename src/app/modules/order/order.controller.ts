import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    console.log("Order data from order controller: ", orderData);

    const result = await OrderService.createOrderIntoDB(orderData);

    res.status(200).json({
      message: "Order created successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      status: false,
    });
  }
};

const calculateRevenue = async (_req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderService.calculateRevenueFromDB();

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to calculate revenue",
      status: false,
    });
  }
};

export const OrderController = {
  createOrder,
  calculateRevenue,
};
