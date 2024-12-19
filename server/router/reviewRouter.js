import e from "express";
import { addReview, getProductReviews } from "../controllers/reviewController.js";
import { userAuth } from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";

const router = e.Router()

router.post('/add-review',userAuth,upload.fields([{ name:'images', maxCount:12 }]),addReview);
router.get('/get-product-reviews/:productId',userAuth,getProductReviews);


export {router as reviewRouter}