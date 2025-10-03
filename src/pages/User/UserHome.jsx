// src/pages/User/UserHome.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronUp } from "lucide-react"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useUserHome from "../../hooks/useUserHome";

import Banner1 from "../../images/Banner1.png";
import Banner2 from "../../images/Banner2.png";
import Banner3 from "../../images/Banner3.png";
import Banner4 from "../../images/Banner4.png";

const UserHome = () => {
  const { products, orders, loading, error } = useUserHome();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-orange-600 text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-fixed bg-center bg-cover">
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white/20 backdrop-blur-sm rounded-lg shadow-md">
        
        {/* Hero Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10 rounded-lg overflow-hidden shadow-lg"
        >
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            speed={1000}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-56 md:h-80"
          >
            <SwiperSlide>
              <img src={Banner1} alt="Banner 1" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner2} alt="Banner 2" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner3} alt="Banner 3" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner4} alt="Banner 4" className="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
        </motion.div>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Featured Products
          </h2>
          {products.length === 0 ? (
            <div className="bg-orange-50 text-orange-600 p-8 rounded-lg text-center shadow">
              No products yet
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow overflow-hidden flex flex-col cursor-pointer"
                >
                  <Link to={`/user/products/${p._id}`} className="flex flex-col h-full">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-40 w-full object-cover"
                      />
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Product Name */}
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {p.name}
                      </h3>

                      {/* Product Description (truncated) */}
                      {p.description && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                          {p.description}
                        </p>
                      )}

                      {/* Price & Button */}
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-lg font-bold text-orange-500">
                          ₦{p.price}
                        </span>
                        <span className="px-3 py-1 bg-orange-500 text-white rounded text-xs">
                          View
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition duration-300"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default UserHome;
