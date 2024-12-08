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

cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.items.reduce((total, item) => {
    const priceString = item.productId?.price || "0"; // Default to "0" if price is missing
    const price = parseFloat(priceString.toString().replace(/,/g, '').trim()) || 0;
    const quantity = item.quantity || 0;

    return total + price * quantity;
  }, 0);
};


// cartSchema.methods.calculateTotalPrice = function () {
//   // Calculate total price
//   this.totalPrice = this.items.reduce((total, item) => {
//     const priceString = item.productId?.price || "0"; // Default to "0" if price is missing
//     const price = parseFloat(priceString.toString().replace(/,/g, '').trim()) || 0;
//     const quantity = item.quantity || 0;

//     return total + price * quantity;
//   }, 0);

//   // Calculate total discount
//   const totalDiscount = this.items.reduce((total, item) => {
//     const offer = item.productId?.offer || "0%"; // Default to "0%" if offer is missing
//     const discountPercent = parseFloat(offer.replace(/%/g, '').trim()); // Convert to number
//     const price = parseFloat(item.productId?.price || "0") || 0;
//     const quantity = item.quantity || 0;

//     // Calculate discount amount
//     const discountAmount = (discountPercent < 0 ? -discountPercent : 0) * price * quantity / 100;
//     return total + discountAmount;
//   }, 0);

//   // Final price after discount
//   this.finalPrice = this.totalPrice - totalDiscount;
// };



export const Cart = mongoose.model('Cart',cartSchema)