import { Cart } from "../models/cartModel.js"
import { Product } from "../models/productModel.js"


export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select:'description images price offer'
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.calculateTotalPrice();

    const parsePrice = (priceString) => {
      if (!priceString) return 0; 
      return parseFloat(priceString.toString().replace(/,/g, '').trim()) || 0;
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(price);
    };

    const cartItems = cart.items
      .map((item) => {
        const product = item.productId;
        if (!product) {
          console.error(`Product not found for item: ${JSON.stringify(item)}`);
          return null;
        }

        const price = parsePrice(product.price);
        const discount = product.offer ? parseFloat(product.offer.replace(/%/g, '').trim()) : 0;
        const discountAmount = Math.abs(discount) > 0 ? (Math.abs(discount) / 100) * price : 0;
        const discountedPrice = price - discountAmount; 
        const subtotal = discountedPrice * item.quantity;

        return {
          productId: product._id,
          productDescription: product.description,
          image: product.images[0], 
          price: formatPrice(discountedPrice),
          size: item.size,
          quantity: item.quantity,
          discountAmount: formatPrice(discountAmount),
          subtotal: formatPrice(subtotal),
        };
      })
      .filter(Boolean); 

    const totalPrice = cartItems.reduce((total, item) => {
      if (item) {
        return total + parsePrice(item.price) * item.quantity;
      }
      return total;
    }, 0);

    res.status(200).json({
      userId: cart.userId,
      items: cartItems,
      totalPrice: formatPrice(totalPrice),
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sizeRequired) {
      if (!size) {
        return res.status(400).json({ message: "Size is required for this product" });
      }
      if (!product.availableSizes.includes(size)) {
        return res.status(400).json({ message: "Invalid size selected" });
      }
    }

    const parsePrice = (priceString) => {
      if (!priceString) return 0;
      return parseFloat(priceString.toString().replace(/,/g, '').trim()) || 0;
    };

    let cart = await Cart.findOne({ userId }).populate("items.productId", "price");

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items = cart.items.filter((item) => item.productId);

    const existingItem = cart.items.find(
      (item) =>
        item.productId._id.toString() === productId &&
        (!product.sizeRequired || item.size === size)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, size: product.sizeRequired ? size : null, quantity });
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
      const price = parsePrice(item.productId.price);
      return total + price * item.quantity;
    }, 0);

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId,size,quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId", "price");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId._id.toString() === productId &&
        (!item.size || item.size === size)
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    existingItem.quantity = quantity;

    cart.totalPrice = cart.items.reduce((total, item) => {
      const price = parseFloat(item.productId.price) || 0;
      return total + price * item.quantity;
    }, 0);

    await cart.save();

    res.status(200).json({ message: "Quantity updated successfully", cart });
  } catch (error) {
    console.error("Error in updateCartQuantity:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = []; 
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const removeCartProduct = async(req,res)=>{
  try {
    const userId = req.user.id
    const {productId} = req.params

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