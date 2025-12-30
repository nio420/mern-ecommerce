import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../Utils/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ssl_logo from "../assets/ssl_logo.png";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    methodHandle,
    method,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const totalAmount = getCartAmount();
      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount + deliveryFee,
      };

      // Logic based on selected payment method
      switch (method) {
        // COD Logic
        case "cod": {
          const url = `${backendUrl}/api/order/place`;
          const res = await axios.post(url, orderData, { headers: { token } });
          if (res.data.success) {
            setCartItems({});
            toast.success("Order Placed Successfully!");
            navigate("/order");
          } else {
            toast.error(res.data.message);
          }
          break;
        }
        // stripe Logic
        case "stripe": {
          const url = `${backendUrl}/api/order/stripe`;
          const res = await axios.post(url, orderData, { headers: { token } });
          if (res.data.success) {
            const { session_url } = res.data;
            window.location.replace(session_url);
          } else {
            toast.error(res.data.message);
          }
          break;
        }
        // ssl commerz
        case "sslcommerz": {
          const url = `${backendUrl}/api/order/sslpay`;
          const totalAmount = getCartAmount();

          const sslData = {
            amount: totalAmount + deliveryFee,
            orderId: `order_${Date.now()}`,
            items: orderItems,
            customer: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: formData.street, // MANDATORY for SSLCommerz
              city: formData.city,
              state: formData.state,
              zipcode: formData.zipcode,
              country: formData.country,
            },
          };

          const res = await axios.post(url, sslData, { headers: { token } });

          if (res.data.success && res.data.session?.GatewayPageURL) {
            window.location.replace(res.data.session.GatewayPageURL);
          } else {
            console.error("SSL Session Error:", res.data);
            toast.error(res.data.message || "SSLCommerz session failed");
          }
          break;
        }

        default:
          toast.warn("Please select a payment method.");
          break;
      }
    } catch (error) {
      console.error("CRASH ERROR:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-12 lg:gap-32 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300 px-4 sm:px-0"
    >
      {/* left side */}
      <div className="flex flex-col w-full gap-4 sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            type="number"
            placeholder="Zip Code"
            className="border border-gray-300  rounded py-1.5 px-3.5 w-full focus:outline-primary"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-primary"
        />
      </div>

      {/* right side */}
      <div className="mt-8 flex flex-col gap-12 w-full sm:max-w-112.5 mr-7">
        {/* Cart Total Section */}
        <div className="w-full">
          <CartTotal />
        </div>

        {/* Payment Method Section */}
        <div className="-mt-6">
          {/*title render*/}
          <div className="mb-">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          {/* payment method selection */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 ">
            <div
              onClick={() => methodHandle("stripe")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-50 transition-all flex-1"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                className="h-5 mx-auto"
                alt="Stripe"
              />
            </div>

            <div
              onClick={() => methodHandle("sslcommerz")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-50 transition-all flex-1"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "sslcommerz" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={ssl_logo}
                className="h-5 w-20 mx-auto"
                alt="sslcommerz"
              />
            </div>

            <div
              onClick={() => methodHandle("cod")}
              className="flex items-center justify-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-50 transition-all flex-1"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-primary-dark text-xs font-medium uppercase whitespace-nowrap">
                Cash On Delivery
              </p>
            </div>
          </div>

          {/* button */}
          <div className="w-full text-center sm:text-end mt-10">
            <button
              type="submit"
              className="text-sm text-white bg-primary-dark px-16 py-3 rounded-md shadow-md transition-all duration-300 hover:bg-black active:scale-98 focus:outline-none focus:ring-2 focus:ring-primary-light cursor-pointer uppercase"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
