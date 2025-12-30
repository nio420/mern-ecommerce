import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SslVerify = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // SSLCommerz sends these in the URL after redirect
  const success = searchParams.get("success");
  const tran_id = searchParams.get("tran_id");

  const verifyPayment = async () => {
    try {
      if (!token) return;

      // Call backend to verify the SSL payment
      const response = await axios.post(
        `${backendUrl}/api/order/verifySsl`,
        { tran_id, success },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success(response.data.message || "Order placed successfully!");
        navigate("/order"); 
      } else {
        toast.error(response.data.message);
        navigate("/cart"); 
      }
      
    } catch (error) {
      console.error("SSL Verification Error:", error);
      console.log("FULL ERROR OBJECT:", error);

      if (error.response) {
         // This means the backend exists but sent an error (like 401 or 500)
         toast.error(`Server Error: ${error.response.data.message || "Unknown Server Error"}`);
      } else if (error.request) {
         // This means the frontend couldn't even reach your backend
         toast.error("Network Error: Backend not reachable. Check your server.");
      } else {
         toast.error(error.message);
      }
      navigate('/cart');
    }
  };

  useEffect(() => {
    if (token && tran_id) {
      verifyPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tran_id]);

  return (
    <div className="py-20 text-center">
      <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full mb-4"></div>
      <p className="text-gray-600">Verifying your payment, please wait...</p>
    </div>
  );
};

export default SslVerify;
