import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/scrollbar";

const Carousel = () => {
  return (
    <>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="mt-14"
      >
        <SwiperSlide className="">
          <div className="flex items-center w-[80%] mx-auto pb-10 justify-center">
            <div className="flex flex-col gap-6">
              <div className="font-bold text-5xl">
                50% Off For Your First Shopping
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                maiores explicabo provident, mollitia fugit autem? Ut, sed nam.
                Autem, distinctio?
              </div>
              <div>
                <button className="bg-red-400 text-white px-9 py-3 rounded-md">
                  Shop Now
                </button>
              </div>
            </div>
            <div>
              <img
                src="https://postperspective.com/wp-content/uploads/2022/10/GeForce-RTX4090-3QTR-Back-Left-1.jpg"
                alt=""
                srcSet=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="">
          <div className="flex items-center w-[80%] mx-auto pb-10 justify-center">
            <div className="flex flex-col gap-6">
              <div className="font-bold text-5xl">
                50% Off For Your First Shopping
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                maiores explicabo provident, mollitia fugit autem? Ut, sed nam.
                Autem, distinctio?
              </div>
              <div>
                <button className="bg-red-400 text-white px-9 py-3 rounded-md">
                  Shop Now
                </button>
              </div>
            </div>
            <div>
              <img
                src="https://postperspective.com/wp-content/uploads/2022/10/GeForce-RTX4090-3QTR-Back-Left-1.jpg"
                alt=""
                srcSet=""
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
