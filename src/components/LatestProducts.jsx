// LatestProducts.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  // fetch JSON data
  useEffect(() => {
    fetch("/Products.json") // your JSON file path or API
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

    return (
  <div className="max-full mx-auto w-11/12 mb-3">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-mon font-bold mb-4 sm:mb-5 text-center text-[#ff8f9c]">
      Latest Products
    </h2>

    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={10}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      breakpoints={{
        480: { slidesPerView: 2, spaceBetween: 15 },
        640: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 6, spaceBetween: 25 },
      }}
      className="rounded-xl"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="font-mon transition-transform duration-300 hover:scale-105 border border-[#E5E7EB] rounded-xl sm:rounded-2xl bg-white p-2 sm:p-3 md:p-4">
            <img
              src={product.product_picture}
              alt={product.title}
              className="h-28 w-full sm:h-40 md:h-48 object-cover rounded-lg mx-auto"
            />
            <div className="flex flex-col p-1 sm:p-2">
              <h3 className="text-xs sm:text-sm md:text-base text-[#21214c] font-semibold truncate">
                {product.title}
              </h3>
              <div className="flex text-[#f6a355] text-xs sm:text-sm md:text-base">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaRegStarHalfStroke />
              </div>
              <p className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm md:text-base mb-1 sm:mb-2">
                <span className="line-through text-gray-400">{product.withoutdis}</span>
                <strong>{product.price}</strong> BDT
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
}
