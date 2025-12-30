import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    name: "David Miller",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Amazing quality and fast delivery. I'm really impressed with the service!",
  },
  {
    name: "Kimberly Johnson",
    role: "Happy Customer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "The app makes shopping so easy. Great experience every time!",
  },
  {
    name: "Ryan Lee",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4,
    text: "Affordable prices and premium products. Highly recommended!",
  },
  {
    name: "Sondra Smith",
    role: "Happy Shopper",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 3,
    text: "I love this app! The products are high quality and the delivery is super fast.",
  },
  {
    name: "Michael Brown",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    text: "The shopping experience was smooth and enjoyable. I highly recommend Shop-Verse to everyone!",
  },
  {
    name: "Sophia Wilson",
    role: "Happy Shopper",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 5,
    text: "Amazing collection and premium quality! I am extremely satisfied with my purchase.",
  },
  {
    name: "Emily Clark",
    role: "Satisfied Shopper",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "I’m amazed at the quality and quick delivery! Definitely shopping here again.",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-light/85 mb-12">
          What Our <span className="text-primary-dark">Customers Say</span>
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000, // Auto-slide every 2 seconds
            disableOnInteraction: false, // Continue autoplay after user swipes
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <span className="text-sm text-gray-500 block mb-3">
                  {item.role}
                </span>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? "text-primary fill-primary"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  “{item.text}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;