import e from "express";
import { userAuth } from "../middlewares/userAuth.js";

const router = e.Router();

// router.post('/create-order',userAuth,createOrder)
// router.get('/get-orders',userAuth,fetchOrders)


export { router as orderRouter };