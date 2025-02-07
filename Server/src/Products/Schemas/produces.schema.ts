import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
});
