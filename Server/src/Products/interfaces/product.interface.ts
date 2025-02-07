import { Document } from 'mongoose';

export interface Product extends Document {
  readonly productName: string;
  readonly price: number;
  readonly imageURL: string;
}
