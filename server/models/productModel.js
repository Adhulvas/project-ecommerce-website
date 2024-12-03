import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name:{
    type: String,
    required: true
  },
  rating:{
    type: String,
    required: true
  },
  comment:{
    type: String,
    required: false
  },
  createdAt:{ 
    type: Date,
    default: Date.now,
  }
});

const productSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      trim: true
    },
    description:{
      type: String,
      required: true
    },
    price:{
      type: String,
      required: true,
      min: 0
    },
    sizeRequired:{
      type: Boolean,
      default: false
    },
    availableSizes: {
      type: [String], 
      default: [], 
    },
    category:{
      type: String,
      required: true
    },
    subcategory:{
      type: String, 
      required: true
    },
    ratings:{
      type: String,
      default: 0
    },
    reviews: [reviewSchema],
    seller:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true
    },
    images:{
      type: [String],
      default: "https://newhorizonindia.edu/nhengineering/innovation/wp-content/uploads/2020/01/default-placeholder.png"
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
