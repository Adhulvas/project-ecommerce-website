import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { addToCart, clearCart, getCart, removeCartProduct, updateCartQuantity } from "../controllers/cartController.js";

const router = e.Router();

router.get('/get-cartItems',userAuth,getCart);
router.post('/add-to-cart',userAuth,addToCart);
router.patch('/update-quantity',userAuth,updateCartQuantity);
router.delete('/clear-cart',userAuth,clearCart);
router.delete('/remove-product/:productId',userAuth,removeCartProduct);


export { router as cartRouter };