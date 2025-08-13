"use client";

import { CircleArrowLeft, CircleArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Testimonials as TestimonialsInterface } from "../types";
import Testimonial from "./testimonial";

export default function Testimonials({
  testimonials,
}: {
  testimonials: TestimonialsInterface[];
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.autoplay?.stop();
      swiperInstance.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.autoplay?.stop();
      swiperInstance.slideNext();
    }
  };

  return (
    <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div className="flex flex-row lg:flex-col justify-between lg:justify-start flex-1 pl-0 lg:pl-8 gap-8 lg:gap-16 w-full lg:w-1/5">
        <div className="flex flex-col gap-2">
          <Quote
            size={40}
            className="text-midnight-green fill-midnight-green"
          />
          <h2 className="text-2xl lg:text-3xl font-medium">
            <span className="lg:whitespace-nowrap">Avis de nos</span>{" "}
            partenaires
          </h2>
        </div>
        <div className="flex items-end lg:items-center gap-4">
          <CircleArrowLeft
            size={32}
            className="text-midnight-green cursor-pointer hover:text-midnight-green/80 transition-colors"
            onClick={handlePrevSlide}
          />
          <CircleArrowRight
            size={32}
            className="text-midnight-green cursor-pointer hover:text-midnight-green/80 transition-colors"
            onClick={handleNextSlide}
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="Conseils_Testimonials relative w-full lg:w-4/6 xl:w-4/5">
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1420: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="w-full h-auto"
        >
          {testimonials.map((t: TestimonialsInterface) => (
            <SwiperSlide key={t?.id} className="md:flex-1 h-auto">
              <Testimonial testimonial={t.testimonials} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
