import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../Utils/assets";
import CartTotal from "../Components/CartTotal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartData, products, updateQuantity, currency } =
    useContext(ShopContext);
  const navigate = useNavigate();

  // handle click
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <section className="border-t border-gray-200 pt-14 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
        <button
          onClick={handleClick}
          className="mt-1 text-sm text-gray-500 font-medium hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>&larr;</span> Go Back
        </button>
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          if (!productData) {
            return null;
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-400 text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Column 1: Image and Product Details together */}
              <div className="flex items-start gap-6">
                <img
                  src={productData.image?.[0]}
                  className="w-16 sm:w-20 rounded"
                  alt={productData.name}
                />
                <div className="overflow-hidden">
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-sm sm:text-base font-semibold">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2: Quantity Input */}
              <div className="flex justify-center">
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border max-w-11 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
              </div>

              {/* Column 3: Delete Icon */}
              <div className="flex justify-end">
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 sm:w-5 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* cartTotal components */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-112.5 ">
          <CartTotal />
          {/* button  */}
          <div className="w-full text-end  ">
            <Link to="/placeorder">
              <button className=" text-sm md:text-sm text-white bg-primary-dark px-8 py-3  md:px-8 md:py-3 rounded-md shadow-md transition-all duration-300 hover:bg-black active:scale-99 focus:outline-none focus:ring-2 focus:ring-primary-light cursor-pointer mt-6">
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
