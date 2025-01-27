import { Schema, model, connect } from "mongoose";

import config from "../../config";
import { NextFunction } from "express";
import { TAbout } from "./about.interface";

const aboutSchema = new Schema<TAbout>(
  {
    data: { type: String },
  },
  {
    timestamps: true,
  }
);

export const aboutModel = model<TAbout>("about", aboutSchema);
