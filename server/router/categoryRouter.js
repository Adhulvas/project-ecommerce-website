import e from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addCategory, addSubcategory, deleteCategory, deleteSubcategory, getCategories, updateCategory, updateSubcategory } from "../controllers/categoryController.js";
import { sellerOrAdminAuth } from "../middlewares/sellerOrAdminAuth.js";

const router = e.Router();

router.get('/get-categories',getCategories)
router.post('/add-category',adminAuth,addCategory)
router.put('/update-category/:categoryId',adminAuth, updateCategory)
router.delete('/delete-category/:categoryId',adminAuth, deleteCategory)
router.post('/:categoryId/subcategories',sellerOrAdminAuth, addSubcategory)
router.put('/:categoryId/subcategories/:subcategoryId',sellerOrAdminAuth, updateSubcategory)
router.delete('/:categoryId/subcategories/:subcategoryId',sellerOrAdminAuth, deleteSubcategory); 


export { router as categoryRouter };