import e from "express";
import { sellerAuth } from "../middlewares/sellerAuth.js";
import { checkSeller, deleteSellerAccount, sellerLogin, sellerLogout, sellerProfile, sellerSignup, updateSellerProfile } from "../controllers/sellerController.js";

const router = e.Router()

router.post('/signup',sellerSignup)
router.post('/login',sellerLogin)
router.put('/logout',sellerAuth,sellerLogout)
router.get('/profile',sellerAuth,sellerProfile)
router.put('/update-profile',sellerAuth,updateSellerProfile)
router.delete('/delete-account',sellerAuth,deleteSellerAccount)


router.get('/check-seller',sellerAuth,checkSeller)

export {router as sellerRouter}