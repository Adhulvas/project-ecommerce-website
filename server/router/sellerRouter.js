import e from "express";
import { checkSeller, deleteSellerAccount, getSellerOrders, sellerLogin, sellerLogout, sellerProfile, sellerSignup, updateSellerProfile } from "../controllers/sellerController.js";
import { sellerOrAdminAuth } from "../middlewares/sellerOrAdminAuth.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const router = e.Router()

router.post('/signup',sellerSignup)
router.post('/login',sellerLogin)
router.put('/logout',sellerOrAdminAuth,sellerLogout)
router.get('/profile',sellerOrAdminAuth,sellerProfile)
router.put('/update-profile',sellerOrAdminAuth,updateSellerProfile)
router.get('/orders', sellerAuth, getSellerOrders);
router.delete('/delete-account',sellerOrAdminAuth,deleteSellerAccount)


router.get('/check-seller',sellerOrAdminAuth,checkSeller)

export {router as sellerRouter}