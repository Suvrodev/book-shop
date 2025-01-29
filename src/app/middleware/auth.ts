import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const extractedToken = req.headers.authorization;
      console.log("Extracted token: ", extractedToken);
      const token = (extractedToken as string).split(" ")[1];
      console.log("Token===: ", token);

      //if the token is sent from the client
      if (!token) {
        throw new AppError(401, "You are not Authorized");
      }

      //Check if the token is valid
      jwt.verify(
        token,
        config.jwt_access_token as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(401, "Invalid Token");
          }
          console.log("**************");
          console.log("Decode: ", decoded);
          const role = (decoded as JwtPayload).role;
          if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
            console.log("Required Roles: ", requiredRoles);
            throw new AppError(
              401,
              `You are not Authorized as ${requiredRoles}`
            );
          }

          req.user = decoded as JwtPayload;
          next();
        }
      );
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
