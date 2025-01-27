import { Request, Response } from "express";
import { paymentModel } from "./payment.model";
import config from "../../config";
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
  const { userId, productId, price, cartId } = req.body;
  console.log("user id: ", userId);
  console.log("product id: ", productId);
  console.log("cart id: ", cartId);
  console.log("price: ", price);

  const transactionId = `TRAN_${Date.now()}`;

  const data = {
    total_amount: price,
    currency: "BDT",
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/payment/success/${transactionId}`,
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

  console.log("Data: ", data);
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse: any) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });

    ///////

    const finalOrder = {
      order,
      paidStatus: false,
      transactionId,
    };

    const result: any = paymentModel.create(finalOrder);

    //////

    console.log("Redirecting to: ", GatewayPageURL);
  });
};

// Handle payment success
export const paymentSuccess = async (req: Request, res: Response) => {
  const transactionId = req?.params?.tran_id;
  console.log("Transaction id: ", transactionId);
  //   const responseData = req.body;
  const result = await paymentModel.updateOne(
    { transactionId: transactionId },
    { paidStatus: true }
  );
  console.log("After Update Result is: ", result);
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
