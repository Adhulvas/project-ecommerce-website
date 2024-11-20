import e from "express";
import { addReview, deleteReview, getProductReviews } from "../controllers/reviewController.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = e.Router()

router.post('/add-review',userAuth,addReview);
router.get('/get-product-reviews/:productId',userAuth,getProductReviews);
router.delete('/delete-review/:reviewId',userAuth,deleteReview);


export {router as reviewRouter}