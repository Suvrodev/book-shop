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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
//Parser
app.use(express_1.default.json());
//Cors integration
app.use((0, cors_1.default)({ origin: ["http://localhost:5173"], credentials: true }));
// app.use(cors({ origin: ["http://localhost:5173"] }));
//application route
// app.use("/api/products", BookRoutes);
// app.use("/api", OrderRoutes);
app.use("/api", routes_1.default);
const getAController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Book Shop Assignment-2");
});
app.get("/", getAController);
//Global Error Handler
app.use(globalErrorHandler_1.default);
//Not Found Route
app.use(notFound_1.default);
exports.default = app;
