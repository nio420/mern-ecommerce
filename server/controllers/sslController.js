import SSLCommerzPayment from "sslcommerz-lts";
import orderModel from '../models/orderModel.js'
import userModel from "../models/userModel.js";


const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = process.env.SSL_IS_LIVE === "true";


export const createSslPaymentSession = async (req, res) => {
  try {
    // 1. Get userId and items from req.body (sent from PlaceOrder.jsx)
    const { amount, orderId, customer, items, userId } = req.body; 

    // 2. SAVE THE ORDER TO DATABASE FIRST
    const orderData = {
      userId,
      items,
      amount,
      address: customer,
      payment: false,
      paymentMethod: "SSLCommerz",
      date: Date.now(),
      tran_id: orderId
    };
    console.log("Attempting to save order:", orderData);
    const newOrder = new orderModel(orderData);
    await newOrder.save(); 

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: orderId,
      success_url: `${process.env.BACKEND_URL}/api/order/ssl-success`,
      fail_url: `${process.env.BACKEND_URL}/api/order/ssl-fail`,
      cancel_url: `${process.env.BACKEND_URL}/api/order/ssl-cancel`,
      shipping_method: "No",
      product_name: "Cart Items",
      product_category: "General",
      product_profile: "general",
      cus_name: customer.name,
      cus_email: customer.email,
      cus_add1: customer.address || "Dhaka",
      cus_city: customer.city || "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: customer.phone,
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const apiResponse = await sslcz.init(data);
    if (apiResponse?.GatewayPageURL) {
      res.json({ success: true, session: apiResponse });
    } else {
      console.log("SSL Error:", apiResponse);
      res.json({
        success: false,
        message: apiResponse.failedreason || "Session Failed",
      });
    }
  } catch (error) {
    console.error("BACKEND CRASH ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};


export const sslSuccess = async (req, res) => {
  const { tran_id } = req.body;
  // After SSLCommerz POSTs here, we redirect the user's browser back to React
  res.redirect(
    `${process.env.FRONTEND_URL}/payment-success?success=true&tran_id=${tran_id}`
  );
};

export const sslFail = async (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-fail?success=false`);
};

export const sslCancel = async (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/verify?success=false`);
};


export const verifySslPayment = async (req, res) => {
  try {
    const { tran_id, success } = req.body;
    const userId = req.body.userId; 

    if (success === "true") {
      const updatedOrder = await orderModel.findOneAndUpdate(
        { tran_id },
        { payment: true }
      );

      if (updatedOrder) {
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        return res.json({ success: true, message: "Order Placed successfully!" });
      }
    } 

  } catch (error) {
     res.json({ success: false, message: error.message });
  }
};;
