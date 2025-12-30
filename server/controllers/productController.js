// nine product controll
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// funntion for add products
const addProducts = async (req, res) => {
  try {
    // Destructure text data from request body
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Extract up to 4 images from the req.files object
    const image1 = req.files.image1 && req.files?.image1[0];
    const image2 = req.files.image2 && req.files?.image2[0];
    const image3 = req.files.image3 && req.files?.image3[0];
    const image4 = req.files.image4 && req.files?.image4[0];

    // Filter out any empty/undefined image slots
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload images to Cloudinary and get secure URLs
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Prepare product object for database
    const productsData = {
      name,
      description,
      price: Number(price),
      image: imageUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };

    // Create new document and save to MongoDB
    const products = new productModel(productsData);
    await products.save();
    res.json({ success: true, message: "Products Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// funntion for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// funntion for remove products
const removeProducts = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Products Remove Successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// funntion for single products info
const singleProductsInfo = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({success: true, product})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProducts, removeProducts, singleProductsInfo, listProducts };
