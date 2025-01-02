import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = e.Router();

router.post('/create-order',userAuth,createOrder)
router.get('/get-orders',userAuth,getOrders)
router.put('/:orderId/status',updateOrderStatus)


export { router as orderRouter };