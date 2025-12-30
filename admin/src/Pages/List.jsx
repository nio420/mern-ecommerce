import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`)
      if (res.data.success) {
        setList(res.data.products)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProducts = async (id)=> {

    try {
    const url = `${backendUrl}/api/product/remove`;
    const res = await axios.post(url, {id}, {headers: {token}})
      if(res.data.success){
        toast.success(res.data.message)
        await fetchList()
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchList()
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Inventory Overview</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Table Header Configuration */}
        <div className="hidden md:grid grid-cols-[0.7fr_2.5fr_1fr_1fr_0.5fr] items-center py-4 px-6 bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider font-bold text-gray-500">
          <span>Product</span>
          <span>Details</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Dynamic Product Mapping */}
        <div className="flex flex-col">
          {list.length > 0 ? (
            list.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.7fr_2.5fr_1fr_1fr_0.5fr] items-center gap-4 py-4 px-6 border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors group"
              >
                <img 
                  className="w-16 h-16 object-cover rounded-xl shadow-sm bg-gray-100" 
                  src={item.image[0]} 
                  alt={item.name} 
                />
                
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 text-base">{item.name}</span>
                  <span className="text-xs text-gray-400 md:hidden">{item.category} • ${item.price}</span>
                </div>

                <span className="hidden md:block text-gray-600 font-medium bg-gray-100 w-fit px-3 py-1 rounded-full text-xs">
                  {item.category}
                </span>

                <span className="hidden md:block font-bold text-gray-900 text-lg">
                  ${item.price}
                </span>

                <div className="flex justify-center">
                  <button 
                   onClick={()=> removeProducts(item._id)}
                    className="px-3 py-2 font-semibold hover:text-red-500 hover:bg-red-200 rounded-lg transition-all duration-200 cursor-pointer text-black"
                  > X
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-gray-700">No products found in inventory.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List