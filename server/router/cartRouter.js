import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { addToCart, getCart, removeCartProduct } from "../controllers/cartController.js";

const router = e.Router();

router.get('/get-cartItems',userAuth,getCart);
router.post('/add-to-cart',userAuth,addToCart);
router.delete('/remove-product',userAuth,removeCartProduct);


export { router as cartRouter };