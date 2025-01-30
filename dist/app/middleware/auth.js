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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const extractedToken = req.headers.authorization;
            console.log("Extracted token: ", extractedToken);
            const token = extractedToken.split(" ")[1];
            console.log("Token===: ", token);
            //if the token is sent from the client
            if (!token) {
                throw new AppError_1.default(401, "You are not Authorized");
            }
            //Check if the token is valid
            jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_token, function (err, decoded) {
                if (err) {
                    throw new AppError_1.default(401, "Invalid Token");
                }
                console.log("**************");
                console.log("Decode: ", decoded);
                const role = decoded.role;
                if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
                    console.log("Required Roles: ", requiredRoles);
                    throw new AppError_1.default(401, `You are not Authorized as ${requiredRoles}`);
                }
                req.user = decoded;
                next();
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
