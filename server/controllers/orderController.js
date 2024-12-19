import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";


export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { items, totalAmount } = req.body; 
    console.log(items)


    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }


    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId).select('description images price');
        return {
          productId: product._id,
          description: product.description,
          images: product.images,
          quantity: item.quantity,
          price: item.price,
        };
      })
    );
    
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: 'Pending',
    });
    
    await newOrder.save();
    

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};


export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id; 
    const orders = await Order.find({ userId }).populate('items.productId', 'description images price'); 

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
