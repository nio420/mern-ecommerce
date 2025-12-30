import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Order from "./Pages/Order";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { useEffect, useState } from "react";
import Login from "./Components/Login";

// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-gray-400" />
          <div className="flex w-full">
            <Sidebar />

            <ToastContainer
              position="top-right"
              autoClose={2000} 
              hideProgressBar={false} 
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ width: "auto", minWidth: "200px" }} 
            />
            <div className="w-[70%] mx-auto ml-[max(5px,25px)] my-8 text-gray-600 text-base ">
              <Routes>
                <Route path="/" />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
