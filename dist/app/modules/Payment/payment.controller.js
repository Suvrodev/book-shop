"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = exports.paymentUnSuccess = exports.paymentSuccess = exports.initiatePayment = void 0;
const payment_model_1 = require("./payment.model");
const config_1 = __importDefault(require("../../config"));
const payment_service_1 = require("./payment.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const SSLCommerzPayment = require("sslcommerz-lts");
const storeId = config_1.default.store_id;
const storePassword = config_1.default.store_password;
const store_id = storeId;
const store_passwd = storePassword;
const is_live = false;
// Initiate payment
const initiatePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //   console.log("Payment body: ", req.body);
        console.log("Heat Payment Controller-------------");
        const order = req.body;
        console.log("Order Data---: ", order);
        const { userId, productId, price, cartId, quantity } = req.body;
        console.log("user id: ", userId);
        console.log("product id: ", productId);
        console.log("cart id: ", cartId);
        console.log("price: ", price);
        console.log("Quantity: ", quantity);
        if (userId !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            throw new AppError_1.default(401, "You are not authorized");
        }
        console.log("Before check quantity------------------------------------");
        const checkBookQuantity = yield (0, payment_service_1.checkQuantityOfBook)(productId, quantity);
        console.log("After check quantity-------------------------------------");
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
            success_url: `${config_1.default.payment_url}/api/payment/success/${transactionId}?productId=${productId}&quantity=${quantity}&userId=${userId}`,
            fail_url: `${config_1.default.payment_url}/api/payment/fail/${transactionId}`,
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
        const sslcz = yield new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz
            .init(data)
            .then((apiResponse) => __awaiter(void 0, void 0, void 0, function* () {
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
                    adminApproval: "pending",
                    transactionId,
                    quantity,
                };
                const result = (0, payment_service_1.makePayment)(finalOrder, productId, quantity);
                console.log("Redirecting to: ", GatewayPageURL);
            }
            catch (error) {
                console.error("Something went wrong:", error);
            }
        }))
            .catch((error) => {
            console.error("Error initializing SSLCommerz:", error);
            res
                .status(500)
                .send({ error: "Failed to initialize payment gateway." });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.initiatePayment = initiatePayment;
// Handle payment successfullllllllllll🎆🎆🎆🎆
const paymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const transactionId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.tran_id;
    console.log("Transaction id: ", transactionId);
    const productId = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.productId;
    const quantity = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.quantity;
    const cartId = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.cartId;
    const userId = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.userId;
    console.log("Payment Success Controllerr--------------------------------------------✔️✔️");
    console.log("Product id: ", productId);
    console.log("Product Quantity: ", quantity);
    console.log("Cart id: ", cartId);
    console.log("USer id: ", userId);
    //   const allUpdateResult = await updateQuantityRemoveCartAndCheckInStock(
    //     productId as string,
    //     cartId as string,
    //     Number(quantity) as number
    //   );
    // const removeCartRes = cartServices.deleteCartFromDB(
    //   cartId as string,
    //   userId as string
    // );
    const result = yield payment_model_1.paymentModel.updateOne({ transactionId: transactionId }, { paidStatus: true });
    //   console.log("After Update Result is: ", result);
    if ((result === null || result === void 0 ? void 0 : result.modifiedCount) > 0) {
        res.redirect(`https://boundless-read.netlify.app/success-pay/${transactionId}`);
    }
});
exports.paymentSuccess = paymentSuccess;
/**
 * Handle Payment Unsuccess---------------------------------------------------------------------------------------
 */
const paymentUnSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transactionId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.tran_id;
    console.log("Transaction id: ", transactionId);
    //   const responseData = req.body;
    const result = yield payment_model_1.paymentModel.deleteOne({ transactionId: transactionId });
    console.log("After Delete Result is: ", result);
    if (result === null || result === void 0 ? void 0 : result.deletedCount) {
        res.redirect(`https://boundless-read.netlify.app/unsuccess-pay/${transactionId}`);
    }
});
exports.paymentUnSuccess = paymentUnSuccess;
///Payment CRUD
///Get All Payment by Admin
const getAllPaymentByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield payment_service_1.PaymentService.getAllPaymentByAdminFromDB();
        //Send Response
        res.status(200).json({
            message: "Payment retrive Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
///Get All Payment by USer
const getAllPaymentByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield payment_service_1.PaymentService.getSpecificPaymentFromDB(userId);
        if (userId !== ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id)) {
            throw new AppError_1.default(401, "You are not authorized");
        }
        //Send Response
        res.status(200).json({
            message: "Payment retrive Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
///Delete Payment
const deletePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const paymentId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.paymentId;
        const result = yield payment_service_1.PaymentService.deletePaymentFromDB(paymentId, (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
        //Send Response
        res.status(200).json({
            message: "Payment Deleted Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
///Delete Payment
const deletePaymentByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const paymentId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.paymentId;
        const result = yield payment_service_1.PaymentService.deletePaymentByAdminFromDB(paymentId, (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
        //Send Response
        res.status(200).json({
            message: "Payment Deleted Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
///Make Confirm Payment
const confirmPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const paymentId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.paymentId;
        const paymentBody = req === null || req === void 0 ? void 0 : req.body;
        // console.log("Patment body: ", paymentBody);
        const result = yield payment_service_1.PaymentService.confirmPaymentFromDB(paymentId, paymentBody);
        //Send Response
        res.status(200).json({
            message: "Payment confirm Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.PaymentController = {
    getAllPaymentByAdmin,
    getAllPaymentByUser,
    deletePayment,
    confirmPayment,
    deletePaymentByAdmin,
};
