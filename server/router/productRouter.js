import e from "express";
import { addNewProduct, deleteProduct, getProductDetails, getProducts, updateProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const router = e.Router()

router.get('/get-all-products',getProducts);
router.get('/productDetails/:productId',getProductDetails);
router.post('/add-product',sellerAuth,upload.single('image'),addNewProduct);
router.put('/update-product/:productId',sellerAuth,upload.single('image'),updateProduct);
router.delete('/delete-product/:productId',sellerAuth,deleteProduct);
router.get('/search')


export {router as productRouter}