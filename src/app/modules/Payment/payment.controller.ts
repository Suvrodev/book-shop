import { Request, Response } from "express";
import { paymentModel } from "./payment.model";
import config from "../../config";
import { Book } from "../book/book.model";
import {
  checkQuantityOfBook,
  makePayment,
  updateQuantityRemoveCartAndCheckInStock,
} from "./payment.service";
const SSLCommerzPayment = require("sslcommerz-lts");

const storeId = config.store_id;
const storePassword = config.store_password;

const store_id = storeId;
const store_passwd = storePassword;
const is_live = false;

// Initiate payment
export const initiatePayment = async (req: Request, res: Response) => {
  //   console.log("Payment body: ", req.body);
  console.log("Heat Payment-------------");
  const order = req.body;
  //   console.log("Order---: ", order);
  const { userId, productId, price, cartId, quantity } = req.body;
  console.log("user id: ", userId);
  console.log("product id: ", productId);
  console.log("cart id: ", cartId);
  console.log("price: ", price);
  console.log("Quantity: ", quantity);

  const checkBookQuantity = await checkQuantityOfBook(productId, quantity);
  console.log("Check Book Quantity: ", checkBookQuantity);
  if (!checkBookQuantity) {
    res.status(400).send({ message: "Quantity is not Enough" });
    return;
  }
  const transactionId = `TRAN_${Date.now()}`;

  const data = {
    total_amount: price,
    currency: "BDT",
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/payment/success/${transactionId}?productId=${productId}&quantity=${quantity}&cartId=${cartId}`,
    fail_url: `http://localhost:5000/api/payment/fail/${transactionId}`,
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  //   console.log("Data: ", data);
  const sslcz = await new SSLCommerzPayment(store_id, store_passwd, is_live);

  sslcz
    .init(data)
    .then(async (apiResponse: any) => {
      try {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });

        // Final order data
        const finalOrder = {
          userId,
          productId,
          cartId,
          price,
          paidStatus: false,
          transactionId,
        };

        const result = makePayment(finalOrder, productId, quantity);

        console.log("Redirecting to: ", GatewayPageURL);
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    })
    .catch((error: any) => {
      console.error("Error initializing SSLCommerz:", error);
      res.status(500).send({ error: "Failed to initialize payment gateway." });
    });
};

// Handle payment successfullllllllllll🎆🎆🎆🎆
export const paymentSuccess = async (req: Request, res: Response) => {
  const transactionId = req?.params?.tran_id;
  console.log("Transaction id: ", transactionId);
  const productId = req?.query?.productId;
  const quantity = req?.query?.quantity;
  const cartId = req?.query?.cartId;
  console.log("Product id: ", productId);
  console.log("Product Quantity: ", quantity);
  console.log("Cart id: ", cartId);

  const allUpdateResult = await updateQuantityRemoveCartAndCheckInStock(
    productId as string,
    cartId as string,
    Number(quantity) as number
  );

  const result = await paymentModel.updateOne(
    { transactionId: transactionId },
    { paidStatus: true }
  );
  //   console.log("After Update Result is: ", result);
  if (result?.modifiedCount > 0) {
    res.redirect(`http://localhost:5173/success-pay/${transactionId}`);
  }
};
// Handle payment Unsuccess
export const paymentUnSuccess = async (req: Request, res: Response) => {
  const transactionId = req?.params?.tran_id;

  console.log("Transaction id: ", transactionId);
  //   const responseData = req.body;
  const result = await paymentModel.deleteOne({ transactionId: transactionId });
  console.log("After Delete Result is: ", result);
  if (result?.deletedCount) {
    res.redirect(`http://localhost:5173/unsuccess-pay/${transactionId}`);
  }
};
