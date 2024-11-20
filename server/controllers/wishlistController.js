import { Product } from "../models/productModel.js"
import { Wishlist } from "../models/wishlistModel.js"


export const getWishlist = async(req,res)=>{
  try {
    const userId = req.user.id

    const wishlist = await Wishlist.findOne({userId}).populate('products.productId')
  
    if(!wishlist){
      return res.status(404).json({ message:'wishlist not found'})
    }
  
    res.status(200).json({ message:'wishlist fetched successfully',wishlist})
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error });
  }
}



export const addToWishlist = async(req,res)=>{
  try {
    const userId = req.user.id
    const {productId,size} = req.body
    console.log(size,'===========size')

    const product = await Product.findById(productId)
    
    if(!product){
      return res.status(404).json({ message:'product not found'})
    }

    if(product.sizeRequired && !size){
      return res.status(400).json({ message: 'Please select a size' })
    }


    let wishlist = await Wishlist.findOne({ userId })

    if(!wishlist){
      wishlist = new Wishlist({ userId, products:[]})
    }

    const existingItem = wishlist.products.find(
      (item) => item.productId.toString()===productId && (!product.sizeRequired || item.size === size))

    if(existingItem){
      return res.status(400).json({ message:'product already exists in the wishlist'})
    }

    wishlist.products.push({productId, size: product.sizeRequired ? size : null })
    await wishlist.save()

    res.status(200).json({ message:'product added to wishlist',wishlist})

  } catch (error) {
    console.log(error)
    res.status(500).json({ message:'Failed to add product to wishlist'})
  }
}



export const removeFromWishlist = async(req,res)=>{
  try {
    const userId = req.user.id
    const {productId,size} = req.body

    let wishlist = await Wishlist.findOne({userId})

    if(!wishlist){
      return res.status(404).json({ message:'Wishlist not found'})
    }

    const productIndex = wishlist.products.findIndex(
      (item)=>item.productId.toString()===productId && (!item.sizeRequired || item.size === size))

    if(productIndex===-1){
      return res.status(404).json({ message: 'Product not found in wishlist' })
    }

    wishlist.products.splice(productIndex,1)
    await wishlist.save()
  
    res.status(200).json({ message:'product removed from the wishlist'})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message:'Failed to remove product'})
  }
}