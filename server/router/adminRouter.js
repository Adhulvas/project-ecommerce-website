import e from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { adminLogin, adminLogout, adminProfile, adminSignup, checkAdmin, deleteAdminAccount, updateAdminProfile } from "../controllers/adminController.js";

const router = e.Router()

router.post('/signup',adminSignup )
router.post('/login',adminLogin )
router.put('/logout',adminAuth,adminLogout)
router.get('/profile',adminAuth,adminProfile)
router.put('/update-profile',adminAuth,updateAdminProfile)
router.delete('/delete-account',adminAuth,deleteAdminAccount)

router.get('/check-admin',adminAuth,checkAdmin)

export {router as adminRouter}