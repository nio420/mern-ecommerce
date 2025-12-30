import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const ProductItem = ({ id, image, price, name, sizes, AddtoCart = true }) => {
  const {addToCart} = useContext(ShopContext)
  const handleQuickAdd = (e) => {
    e.preventDefault(); 
    
    const defaultSize = sizes && sizes.length > 0 ? sizes[0] : "Free Size";
    addToCart(id, defaultSize);
  };

  return (
    <section className="p-4 rounded-lg bg-white/55 shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* product img */}
      <Link to={`/product/${id}`}>
        <div className="overflow-hidden rounded-lg">
          <img
            src={image[0]}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            alt={name}
          />
          {/* product details */}
          <p className="pt-3 pb-1 text-sm text-gray-700 truncate">{name}</p>
          <p className="font-semibold text-sm text-primary">${price}</p>
        </div>
      </Link>
      {/* btn */}
          {AddtoCart && ( 
          <button
          onClick={handleQuickAdd}
           className="mt-5 w-full bg-primary-dark text-white py-2 rounded-lg font-medium hover:bg-black transition-all duration-500 cursor-pointer">
           Add to cart
          </button>
          )}
    </section>
  );
};

export default ProductItem;
