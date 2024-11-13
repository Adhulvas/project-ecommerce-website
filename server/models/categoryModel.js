import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  description:{
    type: String,
    required: false,
    trim: true
  },
  parentCategory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }
},
{ timestamps:true }
);


export const Category = mongoose.model('Category', categorySchema);

