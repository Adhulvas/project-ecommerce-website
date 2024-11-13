import e from "express";
import { userAuth } from "../middlewares/userAuth";

const router = e.Router();

router.get("/get-cartItems",userAuth,);
router.post("/add-to-cart",userAuth,);
router.delete("/remove-product/:productId");
router.put('/update/:productId');
router.delete('/clear');


export { router as cartRouter };