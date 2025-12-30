import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'

const StripeVerify = () => {
  const { setCartItems, token, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) return;
      // Safety check: Don't call the API if URL params are missing
      if (!orderId || !success) return; 

      const url = `${backendUrl}/api/order/verifyStripe`;
      const response = await axios.post(url, { success, orderId }, { headers: { token } }); 

      if (response.data.success) {
        setCartItems({});
        toast.success("Order Placed Successfully!");
        navigate("/order"); 
      } else {
        toast.error("Payment failed, please try again.");
        navigate("/cart");
      }
    } catch (error) {
      console.log("Stripe Verify Error:", error);
      toast.error(error.message);
      navigate("/cart"); 
    }
  };

  useEffect(() => {
    if (token && orderId) {
      verifyPayment();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, orderId]); 

  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center'>
        <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-800 rounded-full mb-4"></div>
        <p className="text-xl font-medium">Verifying Payment...</p>
    </div>
  );
};

export default StripeVerify;
