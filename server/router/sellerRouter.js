import e from "express";
import { checkSeller, deleteSellerAccount, sellerLogin, sellerLogout, sellerProfile, sellerSignup, updateSellerProfile } from "../controllers/sellerController.js";
import { sellerOrAdminAuth } from "../middlewares/sellerorAdminAuth.js";

const router = e.Router()

router.post('/signup',sellerSignup)
router.post('/login',sellerLogin)
router.put('/logout',sellerOrAdminAuth,sellerLogout)
router.get('/profile',sellerOrAdminAuth,sellerProfile)
router.put('/update-profile',sellerOrAdminAuth,updateSellerProfile)
router.delete('/delete-account',sellerOrAdminAuth,deleteSellerAccount)


router.get('/check-seller',sellerOrAdminAuth,checkSeller)

export {router as sellerRouter}