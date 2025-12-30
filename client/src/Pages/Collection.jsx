import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../Utils/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";

const Collection = () => {
  const { showFilter, toogleFilter, filterProducts, toogleCatagory, toogleSubCatagory, sortHandler } = useContext(ShopContext);

  return (
    <section className="flex flex-col sm:flex-row sm:gap-6 gap-2 pt-10 border-t border-gray-300">
      {/*left side filter option */}
      <div className="w-full sm:w-36 md:w-52 md:ml-3">
        <p
          onClick={toogleFilter}
          className="my-2 text-xl flex items-center gap-2 cursor-pointer"
        >
          Filter Products
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        {/* catagory filters */}
        <div
          className={`border border-gray-400 pl-4 py-3 my-3 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="font-medium mb-2">CATAGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-primary-light">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 cursor-pointer" value={"Men"} onChange={toogleCatagory} /> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 cursor-pointer" value={"Women"} onChange={toogleCatagory} /> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 cursor-pointer" value={"Kids"} onChange={toogleCatagory} /> Kids
            </p>
          </div>
        </div>

        {/* subcatagory filters */}
        <div
          className={`border border-gray-400 pl-4 py-3 mt-2 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="font-medium mb-2">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-primary-light">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 cursor-pointer" value={"Topwear"} onChange={toogleSubCatagory} /> Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 cursor-pointer" value={"Bottomwear"} onChange={toogleSubCatagory} /> Bottomwear
            </p>
            <p className="flex gap-2"> 
              <input type="checkbox" className="w-3 cursor-pointer" value={"Winterwear"} onChange={toogleSubCatagory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side  */}
      <div className="flex-1 w-full overflow-x-hidden"> {/* Added overflow control here */}
        <div className="flex justify-between items-center mb-4 px-1"> {/* Fixed mobile alignment here */}
          <div className="text-base sm:text-2xl">
            <Title text1={"Explore All "} text2={"Products"} />
          </div>
          
          {/* product sort */}
          <select 
            onChange={sortHandler} 
            className="px-2 border-2 border-primary-light text-[10px] sm:text-xs py-1 rounded-md text-primary shadow-md focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition hover:border-primary cursor-pointer bg-white"
          >
            <option value="relevent"> Sort by: Relavent</option>
            <option value="high-low"> Sort by: High to Low</option>
            <option value="low-high"> Sort by: Low to High</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 gap-y-4 sm:gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;