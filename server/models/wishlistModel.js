import mongoose from 'mongoose';

const wishlistItemSchema = new mongoose.Schema({
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  size:{
    type:String,
    required:false
  }
})


const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  products: [wishlistItemSchema]
},
{timestamps: true }
);


export const Wishlist = mongoose.model('Wishlist', wishlistSchema);

