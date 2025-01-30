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
exports.aboutControllers = void 0;
const about_service_1 = require("./about.service");
///Add About
const addAbout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aboutData = req.body;
        const result = yield about_service_1.aboutServices.addAboutIntoDB(aboutData);
        res.status(201).json({
            success: true,
            message: "About Added successfully",
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//Get All User
const getAllAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield about_service_1.aboutServices.getAllAbout();
        res.status(201).json({
            success: true,
            message: "About Retrived successfully",
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrive About",
            statusCode: 400,
            error: error,
            stack: "error stack",
        });
    }
});
//Update About
const updateAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const about = req.body;
        // console.log("Come id: ", id);
        // console.log("Come bhai: ", about);
        const result = yield about_service_1.aboutServices.updatAboutIntoDB(id, about);
        //Send Response
        res.status(200).json({
            message: "About updated successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        //Send Response for error
        res.status(500).json({
            message: "Something went wrong",
            status: false,
            data: error,
        });
    }
});
exports.aboutControllers = {
    addAbout,
    getAllAbout,
    updateAbout,
};
