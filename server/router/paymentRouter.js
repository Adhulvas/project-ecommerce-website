import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { handlePayment } from "../controllers/paymentController.js";

const router = e.Router();

router.post('/create-payment-session',userAuth,handlePayment);


export { router as paymentRouter };