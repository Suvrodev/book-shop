"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(400).json({
        success: false,
        message: "API not Found!!!",
        error: "",
    });
};
exports.default = notFound;
