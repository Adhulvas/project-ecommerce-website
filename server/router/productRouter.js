import e from "express";
import { addNewProduct, deleteProduct, getProductDetails, getProductsByCategory, getTrendingProducts, updateProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import { sellerOrAdminAuth } from "../middlewares/sellerOrAdminAuth.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const router = e.Router()

router.get('/categories/:categoryName/:subcategoryName',getProductsByCategory);
router.get('/trending', getTrendingProducts);
router.get('/productDetails/:productId',getProductDetails);
router.post('/add-product',sellerAuth,upload.array('image',12),addNewProduct);
router.put('/update-product/:productId',sellerOrAdminAuth,upload.single('image'),updateProduct);
router.delete('/delete-product/:productId',sellerOrAdminAuth,deleteProduct);
router.get('/search')


export {router as productRouter}