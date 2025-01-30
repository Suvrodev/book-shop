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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
//Login User
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("Come Data to Login: ", req.body);
        const result = yield auth_service_1.AuthServices.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: {
                token: result === null || result === void 0 ? void 0 : result.accessToken,
            },
        });
    }
    catch (error) {
        next(error);
        // throw new AppError(401, error);
    }
});
exports.AuthControllers = {
    loginUser,
};
