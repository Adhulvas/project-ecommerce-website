import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = e.Router();

router.post('/create-order',userAuth,createOrder)
router.get('/get-orders',userAuth,getOrders)


export { router as orderRouter };