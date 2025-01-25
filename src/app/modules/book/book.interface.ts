import { Schema, model, connect, Types } from "mongoose";

export type TBook = {
  title: string;
  author: string;
  brand: string;
  model: string;
  price: number;
  imageUrl: string;
  category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
  description: string;
  quantity: number;
  inStock: boolean;
  refUser: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
