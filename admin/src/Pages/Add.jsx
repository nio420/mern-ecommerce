import React, {useState} from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {backendUrl} from "../App"
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // LOGIC TO TOGGLE SIZES
  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) 
      ? prev.filter(item => item !== size) 
      : [...prev, size]
    )
  }

// LOGIC OF FORM DATA
const onSubmitHandler = async (e)=> {
  e.preventDefault()
  try {
    const formData = new FormData()

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));
    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    // axios use to get form data to backend
    const url = `${backendUrl}/api/product/add`;
    const res = await axios.post(url, formData, {headers: {token}})
    
    if(res.data.success){
      toast.success(res.data.message)
      setName("")
      setDescription("")
      setPrice("")
      setCategory("")
      setSubCategory("")
      setSizes([])
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
    } else {
      toast.error(res.data.message)
    }

  } catch (err) {
    console.log(err);
    toast.error(err.message)
    
  }
}


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3 text-gray-600 mb-6">
      
      {/* Image Upload Section */}
      <div>
        <p className="mb-2 font-medium">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
          <img className="w-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5f9ea0] transition-all cursor-pointer" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e)=> setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
          <img className="w-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5f9ea0] transition-all cursor-pointer" src={!image2? assets.upload_area : URL.createObjectURL(image2)} alt="" />
          <input onChange={(e)=> setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
          <img className="w-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5f9ea0] transition-all cursor-pointer" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
          <input onChange={(e)=> setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
          <img className="w-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5f9ea0] transition-all cursor-pointer" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
          <input onChange={(e)=> setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      {/* Basic Info */}
      <div> 
      <div className="w-full max-w-125">
        <p className="mb-2 font-medium">Product Name</p>
        <input onChange={(e)=> setName(e.target.value)} value={name} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl outline-none focus:border-[#5f9ea0]" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full max-w-125">
        <p className="mb-2 font-medium">Product Description</p>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl outline-none focus:border-[#5f9ea0]" rows={3} placeholder="Write content here" required />
      </div>
      </div>

      {/* Categories Row */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 font-medium">Category</p>
          <select onChange={(e)=> setCategory(e.target.value)} value={category} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl cursor-pointer outline-none">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Subcategory</p>
          <select onChange={(e)=> setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl outline-none cursor-pointer">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Product Price</p>
          <input onChange={(e)=> setPrice(e.target.value)}  value={price} className="w-full sm:w-30 px-3 py-2 border-2 border-gray-200 rounded-xl outline-none focus:border-[#5f9ea0]" type="Number" placeholder="25" />
        </div>
      </div> 

      {/* Sizes Section */}
      <div>
        <p className="mb-2 font-medium">Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={()=> toggleSize(size)} className={`${sizes.includes(size) ? 'bg-[#5f9ea0] text-white' : 'bg-gray-200'} px-3 py-1 cursor-pointer rounded-lg  hover:text-gray-900 border border-gray-300 hover:bg-[#5f9ea0] transition-all font-semibold `}> 
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex gap-2 mt-2 items-center cursor-pointer">
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} className="w-4 h-4 accent-[#5f9ea0] cursor-pointer" type="checkbox" id="BestSeller" />
        <label className=" font-medium" htmlFor="BestSeller">Add to Bestseller</label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="px-7 max-w-125 py-3 mt-4 bg-gray-900 hover:bg-[#5f9ea0] text-white font-bold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer">
        ADD PRODUCT
      </button>

    </form>
  )
}

export default Add