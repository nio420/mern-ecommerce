import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-16 mb-3'>
        <img className='w-30' src={assets.logo} alt="" />
        <button onClick={()=> setToken('')} className='px-6 py-2 bg-gray-900 hover:bg-[#5f9ea0] text-white text-sm font-bold rounded-xl shadow-lg shadow-gray-200 hover:shadow-[#5f9ea0]/40 transition-all duration-500 transform active:scale-95 cursor-pointer'> Logout</button>
    </div>
  )
}

export default Navbar