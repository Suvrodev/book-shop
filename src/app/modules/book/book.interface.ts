import { Schema, model, connect } from "mongoose";

export type TBook = {
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};
