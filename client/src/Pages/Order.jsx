import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";

const Order = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrder = async () => {
    try {
      if (!token) {
        return null;
      }

      const url = `${backendUrl}/api/order/userorders`;
      const res = await axios.post(url, {}, { headers: { token } });

      let allOrders = [];

      if (res.data.success) {
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;

            allOrders.push(item);
          });
        });
      }
      setOrderData(allOrders.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="border-t border-gray-300 pt-16 px-3 sm:px-10">
      <div className="text-2xl ">
        <Title text1={"MY"} text2={"ORDER"} />
      </div>

      <div className="mt-8">
        {orderData.map((item, index) => (
          /* Changed to justify-between and added items-center for better desktop alignment */
          <div
            className="py-6 border-t border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            key={index}
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item.image[0]}
                className="w-16 sm:w-20 rounded"
                alt=""
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="font-semibold">${item.price}</p>
                  <p>Quantity: {item.quantity} </p>
                  <p>Size: {item.size} </p>
                </div>
                <p className="mt-2 text-gray-600">
                  Date:{" "} 
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-2 text-gray-600">
                  Payment:{" "} 
                  <span className="text-gray-400">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            {/* Responsive layout*/}
            <div className="md:w-1/2 flex justify-between items-center gap-4 pr-0">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base"> {item.status} </p>
              </div>
              <button onClick={loadOrder} className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-all active:scale-95 cursor-pointer">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Order;
