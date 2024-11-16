import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { addToCart, getCart } from "../controllers/cartController.js";

const router = e.Router();

router.get("/get-cartItems",userAuth,getCart);
router.post("/add-to-cart",userAuth,addToCart);
router.delete("/remove-product/:productId");
router.put('/update/:productId');
router.delete('/clear');


export { router as cartRouter };