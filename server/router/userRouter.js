import e from "express";
import { checkUser, deleteUserAccount, updateUserProfile, userLogin, userLogout, userProfile, userSignup } from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = e.Router()

router.post('/signup',userSignup )
router.post('/login',userLogin )
router.put('/logout',userAuth,userLogout)
router.get('/profile',userAuth,userProfile)
router.put('/update-profile',userAuth,updateUserProfile)
router.delete('/delete-account',userAuth,deleteUserAccount)

router.get('/check-user',userAuth,checkUser)

export {router as userRouter}
