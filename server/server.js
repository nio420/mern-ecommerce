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


// 5. Start Server
app.listen(port, () => console.log("Server started on PORT : " + port));
