//first step + secont env var store

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



// 1. Initialize the app (THIS IS THE MISSING PART)
const app = express();


// 2. Define the port
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();
 

// 3. Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// 4. API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("API Working");
});
// ===========================================================================
// app.get('/init', (req, res) => {
//   const { amount, orderId, customer } = req.body; 
//     const data = {
//         total_amount: amount,
//         currency: 'BDT',
//         tran_id: orderId, // use unique tran_id for each api call
//         success_url: 'http://localhost:3030/success',
//         fail_url: 'http://localhost:3030/fail',
//         cancel_url: 'http://localhost:3030/cancel',
//         ipn_url: 'http://localhost:3030/ipn',
//         shipping_method: 'NO',
//         product_name: 'Order Items.',
//         product_category: 'General',
//         product_profile: 'general',
//         cus_name: customer.name,
//         cus_email: customer.email,
//         cus_add1: 'Dhaka',
//         cus_add2: 'Dhaka',
//         cus_city: 'Dhaka',
//         cus_state: 'Dhaka',
//         cus_postcode: '1230',
//         cus_country: 'Bangladesh',
//         cus_phone: customer.phone,
//         cus_fax: '01711111111',
//         ship_name: 'Customer Name',
//         ship_add1: 'Dhaka',
//         ship_add2: 'Dhaka',
//         ship_city: 'Dhaka',
//         ship_state: 'Dhaka',
//         ship_postcode: 1000,
//         ship_country: 'Bangladesh',
//     };
//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
//     sslcz.init(data).then(apiResponse => {
//         // Redirect the user to payment gateway
//         let GatewayPageURL = apiResponse.GatewayPageURL
//         res.redirect(GatewayPageURL)
//         console.log('Redirecting to: ', GatewayPageURL)
//     });
// })




// 5. Start Server
app.listen(port, () => console.log("Server started on PORT : " + port));
