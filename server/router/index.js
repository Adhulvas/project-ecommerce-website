import e from "express"
import { adminRouter } from "./adminRouter.js"
import { sellerRouter } from "./sellerRouter.js"
import { userRouter } from "./userRouter.js"
import { productRouter } from "./productRouter.js"
import { cartRouter } from "./cartRouter.js"

const router = e.Router()

router.use('/user', userRouter)
router.use('/admin',adminRouter)
router.use('/seller',sellerRouter)
router.use('/product',productRouter)
router.use('/cart',cartRouter)
router.use

export {router as apiRouter}