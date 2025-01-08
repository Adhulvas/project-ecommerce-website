import e from "express";
import { checkSeller, deleteSellerAccount, getSellerOrders, sellerLogin, sellerLogout, sellerProfile, sellerSignup, updateSellerProfile } from "../controllers/sellerController.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const router = e.Router()

router.post('/signup',sellerSignup)
router.post('/login',sellerLogin)
router.put('/logout',sellerAuth,sellerLogout)
router.get('/profile',sellerAuth,sellerProfile)
router.put('/update-profile',sellerAuth,updateSellerProfile)
router.get('/orders', sellerAuth, getSellerOrders);
router.delete('/delete-account',sellerAuth,deleteSellerAccount)


router.get('/check-seller',sellerAuth,checkSeller)

export {router as sellerRouter}