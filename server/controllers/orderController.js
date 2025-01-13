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



export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;


  const validStatuses = ["Pending", "Shipped", "Delivered","Returned", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status; 
    await order.save(); 

    res.status(200).json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "An error occurred while updating the order status." });
  }
};
