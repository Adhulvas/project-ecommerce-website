import e from "express";
import { userAuth } from "../middlewares/userAuth";

const router = e.Router()


router.get('/',userAuth,(req,res,next)) // Get user's wishlist
router.post('/',userAuth,(req,res))  // Add item to wishlist
router.delete('/:productId',userAuth,(req,res))  // Remove item from wishlist

