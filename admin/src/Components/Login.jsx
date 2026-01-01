import React, { useState } from "react";
import axios from "axios"
import {backendUrl} from '../App'
import { toast } from "react-toastify";


const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
      // get backend url and fetch it by axios
      const url = `${backendUrl}/api/user/admin`;
      const response = await axios.post(url, { email, password });
      
      if(response.data.success){
        sessionStorage.setItem('token', response.data.token);
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f4f8] p-4 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-95 border border-gray-50">
        {/* Logo/Icon Area */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-[#5f9ea0] rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-[#5f9ea0]/30 mb-4">
            <span className="text-white text-xl font-black -rotate-12 uppercase">
              A
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Admin Panel
          </h1>
          <p className="text-gray-400 text-xs mt-1 font-medium tracking-wide">
            Enter portal credentials
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Email Input Section */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-gray-700 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-400 rounded-xl outline-none focus:ring-4 focus:ring-[#5f9ea0]/10 focus:border-[#6acbce] focus:bg-white transition-all duration-300 text-sm text-gray-700 placeholder:text-gray-500"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Password Input Section */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-gray-700 mb-1.5 ml-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-400 rounded-xl outline-none focus:ring-4 focus:ring-[#5f9ea0]/10 focus:border-[#6acbce] focus:bg-white transition-all duration-300 text-sm text-gray-700 placeholder:text-gray-500"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {/* The Button Section */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gray-900 hover:bg-[#5f9ea0] text-white text-sm font-bold rounded-xl shadow-lg shadow-gray-200 hover:shadow-[#5f9ea0]/40 transition-all duration-500 transform active:scale-95 cursor-pointer"
            >
              Secure Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
