import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  }
});

const categorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  subcategories: [subcategorySchema]
});

export const Category = mongoose.model('Category', categorySchema)
export const Subcategory = mongoose.model('Subcategory', subcategorySchema);