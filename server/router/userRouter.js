import e from "express";
import { addAddress, checkUser, deleteAddress, deleteUserAccount, updateAddress, updateUserProfile, userLogin, userLogout, userProfile, userSignup } from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = e.Router()

router.post('/signup',userSignup )
router.post('/login',userLogin )
router.put('/logout',userAuth,userLogout)
router.post('/add-address',userAuth,addAddress)
router.put('/update-address/:addressId',userAuth,updateAddress)
router.delete('/delete-address/:addressId',userAuth,deleteAddress)
router.get('/profile',userAuth,userProfile)
router.put('/update-profile',userAuth,updateUserProfile)
router.delete('/delete-account',userAuth,deleteUserAccount)

router.get('/check-user',userAuth,checkUser)

export {router as userRouter}
