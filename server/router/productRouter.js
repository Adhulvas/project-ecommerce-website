import e from "express";
import { addNewProduct, deleteProduct, getProductDetails, getProductsByCategory, updateProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import { sellerOrAdminAuth } from "../middlewares/sellerOrAdminAuth.js";

const router = e.Router()

router.get('/categories/:categoryName/:subcategoryName',getProductsByCategory);
router.get('/productDetails/:productId',getProductDetails);
router.post('/add-product',sellerOrAdminAuth,upload.array('image',10),addNewProduct);
router.put('/update-product/:productId',sellerOrAdminAuth,upload.single('image'),updateProduct);
router.delete('/delete-product/:productId',sellerOrAdminAuth,deleteProduct);
router.get('/search')


export {router as productRouter}