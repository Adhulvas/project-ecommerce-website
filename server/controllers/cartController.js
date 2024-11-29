import { response } from "express"
import { Cart } from "../models/cartModel.js"
import { Product } from "../models/productModel.js"
import { User } from "../models/userModel.js"


export const getCart= async(req,res)=>{
  try {
    const userId = req.user.id
    

    const cart = await Cart.findOne({userId}).populate('items.productId')

    if(!cart){
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.calculateTotalPrice()

    res.status(200).json({
      userId:cart.userId,
      items:cart.items.map(item=>({
        productId: item.productId._id,
        productName: item.productId.name, 
        price: item.productId.price,
        quantity: item.quantity,
        subtotal: item.productId.price * item.quantity
      })),
      totalPrice:cart.totalPrice
    })
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({message:'Internal server error',error:error.message})
  }
}


export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, size, quantity } = req.body;


    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.sizeRequired && !size) {
      return res.status(400).json({ message: 'Please select a size' });
    }


    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString()===productId && (!product.sizeRequired || item.size === size))

    if(existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, size:product.sizeRequired? size:null, quantity });
    }

    await cart.populate('items.productId')
    await cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
};


export const removeCartProduct = async(req,res)=>{
  try {
    const userId = req.user.id
    const {productId} = req.body

    let cart = await Cart.findOne({userId})

    if(!cart){
      return res.status(404).json({ message: 'Cart not found'})
    }
    
    const itemIndex = await cart.items.findIndex(item=> item.productId.toString() === productId)

    if(itemIndex === -1){
      return res.status(404).json({ message:"Item not found in the cart"})
    }

    cart.items.splice(itemIndex,1)

    await cart.populate('items.productId');
    await cart.calculateTotalPrice();

    await cart.save()

    res.status(200).json({message:'item removed from the cart',cart})
  }
  catch (error) {
    console.log(error);
    
    res.status(500).json({message:'Failed to remove item from cart'})
  }
}