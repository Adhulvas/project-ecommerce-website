import { cloudinaryInstance } from "../config/cloudinary.js"
import { Product } from "../models/productModel.js"

export const getProducts = async(req,res)=>{
  try {
    const productItems = await Product.find()

    res.json({ message:'products fetched successfully', data:productItems} )
    
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}


export const getProductDetails = async(req,res)=>{
  try {
    const {productId} = req.params
    const productData = await Product.findById(productId).populate('seller')

    res.json({message:'product details fetched', data:productData})
    
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}


export const addNewProduct = async(req,res)=>{
  try {
    const { name, description, price, category, brand, image, seller } = req.body;

    const sellerId = req.seller.id

    if(!name || !description || !price || !category || !brand){
      return res.status(400).json({message:'All fields required'})
    } 

    const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path)).url

    const newProduct = new Product({ name,description,price,category,brand,image:imageUrl,seller:sellerId});
    await newProduct.save()

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error })
  }
}