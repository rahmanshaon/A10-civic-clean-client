import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Banner.css";

const Banner = () => {
  const slideData = [
    {
      title: "Report Garbage Buildup",
      highlightedText: "Instantly",
      highlightColor: "text-blue-400",
      text: "See an overflowing bin or illegal dumping? Report it in seconds and help us take action.",
      btnText: "Report Now",
      btnColor: "bg-blue-500 hover:bg-blue-600",
      bg: "https://i.ibb.co.com/DfPdvX1q/civic-clean1.jpg",
    },
    {
      title: "Join Community Cleanup",
      highlightedText: "Events",
      highlightColor: "text-green-400",
      text: "Be a part of the solution. Find and join local cleanup events to make a direct impact.",
      btnText: "Join a Drive",
      btnColor: "bg-green-500 hover:bg-green-600",
      bg: "https://i.ibb.co.com/jPKJ66dc/civic-clean2.jpg",
    },
    {
      title: "Promote Sustainable",
      highlightedText: "Living",
      highlightColor: "text-cyan-400",
      text: "Contribute to a greener planet. Track our community's progress towards sustainability.",
      btnText: "Learn More",
      btnColor: "bg-cyan-500 hover:bg-cyan-600",
      bg: "https://i.ibb.co.com/fYDLjNJD/civic-clean3.jpg",
    },
  ];

  return (
    <div className="mb-5">
      <Swiper
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper shadow-2xl"
      >

        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero min-h-[70vh] text-white"
              style={{
                backgroundImage: `url(${slide.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="hero-overlay bg-black/70"></div>
              <div className="hero-content text-center">
                <div className="max-w-lg md:max-w-3xl">
                  {/* Title with highlighted part */}
                  <h1 className="mb-5 text-4xl font-bold lg:text-6xl">
                    {slide.title}{" "}
                    <span className={slide.highlightColor}>
                      {slide.highlightedText}
                    </span>
                  </h1>

                  {/* Description text */}
                  <p className="mb-5 text-base md:text-lg">{slide.text}</p>

                  {/* Button with dynamic color */}
                  <button
                    className={`btn btn-primary ${slide.btnColor} border-none text-white`}
                  >
                    {slide.btnText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
