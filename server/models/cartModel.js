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
  },
  size:{
    type:String,
    required:false
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

// cartSchema.methods.calculateTotalPrice = function () {
//   this.totalPrice = this.items.reduce((total, item) => {
//     const itemPrice = item.productId && item.productId.price ? item.productId.price : 0;
//     return total + itemPrice * item.quantity;
//   }, 0);
// };

cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.items.reduce((total, item) => {
    const priceString = item.productId?.price || "0"; // Default to "0" if price is missing
    const price = parseFloat(priceString.toString().replace(/,/g, '').trim()) || 0;
    const quantity = item.quantity || 0;

    return total + price * quantity;
  }, 0);
};



export const Cart = mongoose.model('Cart',cartSchema)