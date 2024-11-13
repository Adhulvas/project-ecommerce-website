import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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
    type: Number,
    required: true,
    min: 0
  },
  category:{
    type: String,
    required: true,
    trim: true
  },
  brand:{
    type: String,
    trim: true
  },
  ratings:{
    type: Number,
    default: 0
  },
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  image:{
    type:String,
    default:"https://newhorizonindia.edu/nhengineering/innovation/wp-content/uploads/2020/01/default-placeholder.png"
  }
},
{ timestamps:true }
)

export const Product = mongoose.model('Product', productSchema);
