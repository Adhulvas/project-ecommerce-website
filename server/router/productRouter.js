import e from "express";
import { addNewProduct, getProductDetails, getProducts } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const router = e.Router()

router.get("/get-all-products",getProducts);
router.get("/productDetails/:productId",getProductDetails);
router.post("/add-product",sellerAuth,upload.single('image'),addNewProduct);
router.put("/update");
router.delete("/delete");
router.get('/search')


export {router as productRouter}