import { Cart } from "../models/cartModel.js"
import { Product } from "../models/productModel.js"


export const getCart= async(req,res)=>{
  try {
    const userId = req.user.id
    // console.log(userId)

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
    res.status(500).json({message:'Internal server error'})
  }
}


export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, quantity } = req.body;


    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }


    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if(existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.populate('items.productId')
    await cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product to cart', error });
  }
};