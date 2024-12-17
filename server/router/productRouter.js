import e from "express";
import { addNewProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductDetails, getProductsByCategory, getSellerProducts, getTrendingProducts, updateProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import { sellerOrAdminAuth } from "../middlewares/sellerOrAdminAuth.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = e.Router()

router.get('/categories/:categoryName/:subcategoryName',getProductsByCategory);
router.get('/trending', getTrendingProducts);
router.get('/featured', getFeaturedProducts);
router.get('/get-all-products',adminAuth, getAllProducts);
router.get('/get-seller-products',sellerAuth, getSellerProducts);
router.get('/productDetails/:productId',getProductDetails);
router.post('/add-product',sellerAuth,upload.array('image',12),addNewProduct);
router.put('/update-product/:productId',sellerOrAdminAuth,upload.single('image'),updateProduct);
router.delete('/delete-product/:productId',sellerOrAdminAuth,deleteProduct);
router.get('/search')


export {router as productRouter}