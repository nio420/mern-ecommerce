import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);

    // Wrap in setTimeout to avoid strict mode double render warning
    setTimeout(() => {
      setBestseller(bestProducts.slice(0, 5));
    }, 0);
  }, [products]);

  return (
    <section className="my-10">
      {/* Product title */}
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs md:text-base sm:text-sm text-primary">
          Our most-loved pieces, chosen by you. Explore the trending styles and
          top-rated essentials that everyone is talking about this season.
        </p>
      </div>

      {/* Best Seller Slider */}
      <div className="hidden sm:block">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {bestseller.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                AddtoCart={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile grid */}
      <div className="sm:hidden grid grid-cols-2 gap-4">
        {bestseller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            AddtoCart={false}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
