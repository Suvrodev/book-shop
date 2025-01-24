import { Schema, model, connect } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
};
