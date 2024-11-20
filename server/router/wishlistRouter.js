import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";

const router = e.Router()


router.get('/get-wishlist',userAuth,getWishlist)
router.post('/add-to-wishlist',userAuth,addToWishlist)
router.delete('/remove-from-wishlist',userAuth,removeFromWishlist)

export {router as wishlistRouter}
