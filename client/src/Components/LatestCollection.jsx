import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  

  return (
    <section className="my-10">
      <div className=" text-3xl text-center py-8">
        <Title text1="New" text2=" Arrivals" />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-primary"> Our latest arrivals have landed. Explore the perfect blend of timeless craftsmanship and contemporary design. From elevated basics to standout statement pieces, find your next forever-favorite today.</p>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.slice(0, 10).map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
