import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  userOrders,
  updateStatus,
  verifyStripe,
  allOrders,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import { createSslPaymentSession, sslSuccess, sslFail, sslCancel, verifySslPayment} from '../controllers/sslController.js'

const orderRouter = express.Router();

//admin feature
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
// payment feature
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
//orderRouter.post("/razorpay", authUser, placeOrderRazorPay);
// user feature
orderRouter.post("/userorders", authUser, userOrders);
// verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);


//=============================================
orderRouter.post("/sslpay", authUser, createSslPaymentSession);
orderRouter.post("/ssl-success", sslSuccess);
orderRouter.post("/ssl-fail", sslFail);
orderRouter.post("/ssl-cancel", sslCancel);
orderRouter.post("/verifySsl", authUser, verifySslPayment);

export default orderRouter;


    
