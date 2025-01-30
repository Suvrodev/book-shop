"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutModel = void 0;
const mongoose_1 = require("mongoose");
const aboutSchema = new mongoose_1.Schema({
    data: { type: String },
}, {
    timestamps: true,
});
exports.aboutModel = (0, mongoose_1.model)("about", aboutSchema);
