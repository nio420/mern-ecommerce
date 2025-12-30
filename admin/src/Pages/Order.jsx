import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from backend
  const fetchAllOrders = async () => {
    try {
      if (!token) return null;

      const url = `${backendUrl}/api/order/list`;
      const res = await axios.post(url, {}, { headers: { token } });

      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const statusHandler = async (e, orderId) => {
    try {
      const url = `${backendUrl}/api/order/status`;
      const res = await axios.post(url, {orderId, status: e.target.value}, { headers: { token } });
      if(res.data.success){
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Page Title */}
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Orders</h3>

      {/* Orders Wrapper */}
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 md:p-6"
          >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Order Icon + Items */}
              <div className="flex gap-4 items-start">
                <img src={assets.parcel_icon} alt="" className="w-12 h-12" />

                {/* Ordered Items */}
                <div className="text-sm text-gray-700">
                  {order.items.map((item, index) => (
                    <p key={index} className="leading-relaxed">
                      {item.name} × {item.quantity}
                      <span className="ml-1 text-gray-500">({item.size})</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Price */}
              <p className="text-xl font-semibold text-gray-900">
                ${order.amount}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Info */}
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-semibold text-gray-800">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="font-medium">{+order.address.phone}</p>
              </div>

              {/* Order Details */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Items:</span>{" "}
                  {order.items.length}
                </p>
                <p>
                  <span className="font-medium">Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Status & Action */}
              <div className="flex flex-col gap-3">
                {/* Payment Status Badge */}
                <span
                  className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.payment
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                >
                  {order.payment ? "Payment Done" : "Payment Pending"}
                </span>

                {/* Order Status Dropdown */}
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Deliverd">Deliverd</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
