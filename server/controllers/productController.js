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

    if(!productData){
      return res.status(404).json({ message:'product not found'})
    }

    res.json({message:'product details fetched', data:productData})
    
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}


export const addNewProduct = async(req,res)=>{
  try {
    const { name, description, price, category, brand, image, seller, sizeRequired } = req.body;
    console.log(req.body)

    const sellerId = req.seller.id

    if(!name || !description || !price || !category || !brand){
      return res.status(400).json({message:'All fields required'})
    } 

    const existingProduct = await Product.findOne({ name, description, category, brand });
    if (existingProduct) {
      return res.status(409).json({ message: 'Product already exists' });
    }

    const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path)).url

    const newProduct = new Product({ name,description,price,category,brand,image:imageUrl,seller:sellerId,sizeRequired});
    await newProduct.save()

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to add product', error })
  }
}



export const deleteProduct = async(req,res)=> {
  try {
    const {productId} = req.params

    const sellerId = req.seller.id

    const product = await Product.findById(productId).populate('seller','name')

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller._id.toString() !== sellerId) {
      return res.status(403).json({ message: 'You are not authorized to delete this product' })
    }

    await product.deleteOne()

    res.status(200).json({ message: 'Product deleted successfully', seller:product.seller.name })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', error });
  }
}



export const updateProduct = async(req,res)=> {
  try {
    const { productId } = req.params
    const { name, description, price, category, brand, sizeRequired } = req.body
    console.log('body==========', req.body);
    const sellerId = req.seller.id

    const product = await Product.findById(productId).populate('seller', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller._id.toString() !== sellerId) {
      return res.status(403).json({ message: 'You are not authorized to update this product' });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (brand) updateFields.brand = brand;
    if (sizeRequired !== undefined) updateFields.sizeRequired = sizeRequired;

    if (req.file) {
      const uploadResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      updateFields.image = uploadResponse.url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true }
    ).populate('seller', 'name');
    console.log("Updated Product:", updatedProduct);

    res.status(200).json({ message: 'Product updated successfully',product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

