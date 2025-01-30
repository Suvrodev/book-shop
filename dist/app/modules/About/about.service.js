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
exports.aboutServices = void 0;
const about_model_1 = require("./about.model");
///Create About into db
const addAboutIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("Payload: ", payload);
    const result = yield about_model_1.aboutModel.create(payload);
    return result;
});
//Get All About from DB
const getAllAbout = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield about_model_1.aboutModel.find();
    return result;
});
//Update About
const updatAboutIntoDB = (aboutId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("User Id in service: ", userId);
    //   console.log("payload in service", payload);
    const result = yield about_model_1.aboutModel.findByIdAndUpdate({ _id: aboutId }, payload, {
        new: true,
    });
    return result;
});
exports.aboutServices = {
    addAboutIntoDB,
    getAllAbout,
    updatAboutIntoDB,
};
