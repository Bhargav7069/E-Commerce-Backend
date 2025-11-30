import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  priceAtTimeOfAdd: number; 
}

export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
}

const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      priceAtTimeOfAdd: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<ICart>('Cart', CartSchema);