import { Schema, model, connect } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";
import { NextFunction } from "express";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, "Email Must be required"],
      unique: [true, "This email already Exists"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password Must be required"],
      maxlength: [10, "Password can not be more than 10 character"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not valid. Role can only be either user or admin",
      },
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: {
      transform: function (_doc, ret) {
        // Remove sensitive or unnecessary fields
        delete ret.password;
        delete ret.role;
        delete ret.isBlocked;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);

//Pre Document middleware for Bycript Password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const userModel = model<TUser>("users", userSchema);
