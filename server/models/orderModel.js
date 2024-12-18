import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
  }],
  totalPrice: Number,
  address: {
    addressTitle: String,
    country: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
  },
  createdAt: { type: Date, default: Date.now },
});


export const Order = mongoose.model("Order", orderSchema);