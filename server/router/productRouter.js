import e from "express";
import { addNewProduct, deleteProduct, getProductDetails, getProductsBySubcategory, updateProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import { sellerOrAdminAuth } from "../middlewares/sellerorAdminAuth.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = e.Router()

router.get('/subcategory/:subcategoryName',userAuth,getProductsBySubcategory);
router.get('/productDetails/:productId',userAuth,getProductDetails);
router.post('/add-product',sellerOrAdminAuth,upload.single('image'),addNewProduct);
router.put('/update-product/:productId',sellerOrAdminAuth,upload.single('image'),updateProduct);
router.delete('/delete-product/:productId',sellerOrAdminAuth,deleteProduct);
router.get('/search')


export {router as productRouter}