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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("Payloadddd: ", payload);
    //Checking  if the user is exist
    const isUserExists = yield user_model_1.userModel.findOne({ email: payload.email });
    if (!isUserExists) {
        throw new AppError_1.default(404, "User not Found");
    }
    //Check User blocked or not
    const userIsBlocked = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isBlocked;
    if (userIsBlocked) {
        throw new AppError_1.default(403, "User is Blocked");
    }
    //Check Password is right or wrong
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(401, "Password is Incorrect");
    }
    // console.log("is User exists----: ", isUserExists);
    //Create Token and send to the client
    const jwtPayload = {
        _id: isUserExists._id,
        name: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.name,
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
        isBlocked: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isBlocked,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_token, {
        expiresIn: "30d",
    });
    //   console.log("JwtPayload: ", jwtPayload);
    //Access Granted: Send AccessToken, Refresh Token
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
};
