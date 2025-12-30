import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../Utils/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productId );
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    } 
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, products]);

  // Handles product addition to cart and resets the size selection UI
  const handleAddToCart = ()=> {
    if (size) {
      addToCart(productData._id, size);
      setSize(""); 
    } else {
      addToCart(productData._id, size); 
    }
  }

  return productData ? (
    <section className="border-t border-gray-400 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data Container */}
      <div className="flex gap-12 flex-col lg:flex-row">
        
        {/* Thumbnail List */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer hover:border-gray-300 border border-transparent transition-all"
                alt="thumbnail"
              />
            ))}
          </div>

          {/* Main Display Image */}
          <div className="w-full sm:w-[80%]">
            <img 
              src={image} 
              className="w-full h-auto max-h-150 object-cover rounded-sm" 
              alt="main product" 
            />
          </div>
        </div>

        {/* --- RIGHT SIDE: PRODUCT INFO --- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          
          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="font-medium text-3xl mt-5">${productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          {/* Product Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 cursor-pointer hover:border-orange-400 bg-gray-100 transition-all ${
                    item === size ? "border-orange-500 bg-orange-50" : "border-gray-200"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button onClick={()=> handleAddToCart()} className="font-semibold cursor-pointer text-sm md:text-base text-white bg-primary-dark px-8 py-3 rounded-sm shadow-md transition-all duration-500 hover:bg-black h active:scale-95 ">
            ADD TO CART
          </button>

          <hr className="w-full sm:w-4/5 mt-8 text-gray-500" />

          {/* Delivery Policy Info */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION REVIEWS --- */}
      <div className="mt-20">
        <div className="flex">
          <p className="border border-gray-300 px-5 py-3 text-sm font-bold">Description</p>
          <p className="border border-gray-300 px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500 leading-relaxed">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of goods or services over the internet. It serves
            as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence.
          </p>
          <p>
            E-commerce websites typically display products or services along with
            detailed descriptions, images, prices, and any available variations
            (e.g., sizes, colors). Each product usually has its own dedicated
            page with relevant information.
          </p>
        </div>
        
        {/* Related Products Display */}
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>    
      </div>
    </section>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;