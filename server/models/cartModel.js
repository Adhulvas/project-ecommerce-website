import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    default:1,
    min:1
}
})

const cartSchema = mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true
    },
    items:[cartItemsSchema],
    totalPrice:{
      type:Number,
      required:true,
      default:0
    }
  },
  {
    timestamps:true
  }
)

cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.items.reduce((total, item) => total + item.productId.price * item.quantity, 0);
};

export const Cart = mongoose.model('Cart',cartSchema)