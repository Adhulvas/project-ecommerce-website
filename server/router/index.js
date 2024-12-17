import e from "express"
import { adminRouter } from "./adminRouter.js"
import { sellerRouter } from "./sellerRouter.js"
import { userRouter } from "./userRouter.js"
import { productRouter } from "./productRouter.js"
import { cartRouter } from "./cartRouter.js"
import { wishlistRouter } from "./wishlistRouter.js"
import { reviewRouter } from "./reviewRouter.js"
import { categoryRouter } from "./categoryRouter.js"
import { paymentRouter } from "./paymentRouter.js"

const router = e.Router()

router.use('/user', userRouter)
router.use('/admin',adminRouter)
router.use('/seller',sellerRouter)
router.use('/product',productRouter)
router.use('/cart',cartRouter)
router.use('/wishlist',wishlistRouter)
router.use('/review',reviewRouter)
router.use('/category',categoryRouter)
router.use('/payment',paymentRouter)

export {router as apiRouter}