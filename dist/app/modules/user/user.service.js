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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
///Create User into db
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User Payload: ", payload);
    const email = payload === null || payload === void 0 ? void 0 : payload.email;
    const res = yield user_model_1.userModel.findOne({ email: email });
    console.log(" res: ", res);
    if (res) {
        throw new AppError_1.default(409, "This Email Allready Exists");
    }
    const result = yield user_model_1.userModel.create(payload);
    return result;
});
//Get All User from DB
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    return result;
});
//deletel User from DB
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.userModel.findOneAndDelete({ _id: id });
        return result;
    }
    catch (error) {
        throw new Error("USer Not Found");
    }
});
//Update Password
const updatePasswordIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    console.log("User Id: ", userId);
    console.log("Old Password ", oldPassword);
    console.log("New  Password ", newPassword);
    //Checking  if the user is exist
    const isUserExists = yield user_model_1.userModel.findOne({ _id: userId });
    if (!isUserExists) {
        throw new AppError_1.default(404, "User not Found");
    }
    //Check Password is right or wrong
    const isPasswordMatched = yield bcrypt_1.default.compare(oldPassword, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    console.log("is Password Matched: ", isPasswordMatched);
    if (!isPasswordMatched) {
        throw new AppError_1.default(401, "Old password is not right");
    }
    const hashNewPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.userModel.findByIdAndUpdate(userId, { password: hashNewPassword }, { new: true });
    return result;
});
//Update User
const updatUserIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User Id in service: ", userId);
    console.log("payload in service", payload);
    const result = yield user_model_1.userModel.findByIdAndUpdate({ _id: userId }, payload, {
        new: true,
    });
    return result;
});
exports.userServices = {
    registerUserIntoDB,
    getAllUser,
    updatePasswordIntoDB,
    deleteUser,
    updatUserIntoDB,
};
