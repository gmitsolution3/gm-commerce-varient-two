"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
  Parallax,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/parallax";

interface SliderContainer {
  id: string;
  title?: string;
  description?: string;
  images: string[];
  link?: string;
  badge?: string;
  price?: string;
}

export interface ProductSliderSectionProps {
  mainSlider: SliderContainer;
  sideSliders: SliderContainer[];
}

const MainHeroSlider = ({ slider }: { slider: SliderContainer }) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsAutoPlaying(!isAutoPlaying);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Main Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectCreative,
          Parallax,
        ]}
        spaceBetween={0}
        slidesPerView={1}
        parallax={true}
        speed={1200}
        navigation={{
          prevEl: ".main-hero-prev",
          nextEl: ".main-hero-next",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={slider.images.length > 1}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        className="w-full h-[70vh] md:h-[60vh] lg:h-[70vh]"
      >
        {slider.images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Image with Parallax */}
              <div
                className="absolute inset-0"
                data-swiper-parallax="-23%"
              >
                <Image
                  src={image}
                  alt={`${slider.title || "Slide"} ${index + 1}`}
                  fill
                  className="object-cover scale-110"
                  priority={index === 0}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation - Luxury Style */}
      <button
        className="main-hero-prev absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 
          bg-black/30 hover:bg-white/20 backdrop-blur-xl
          text-white border border-white/20
          rounded-full shadow-2xl
          transition-all duration-500 hover:scale-110
          disabled:opacity-30 disabled:cursor-not-allowed
          group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 mx-auto transition-transform group-hover:-translate-x-1" />
      </button>

      <button
        className="main-hero-next absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 
            w-12 h-12
            bg-black/30 hover:bg-white/20 backdrop-blur-xl
            text-white border border-white/20
            rounded-full shadow-2xl
            transition-all duration-500 hover:scale-110
            disabled:opacity-30 disabled:cursor-not-allowed
            group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 mx-auto transition-transform group-hover:translate-x-1" />
      </button>

      {/* Slide Counter & Controls - Bottom Left */}
      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 z-30 flex items-center gap-6">
        {/* Slide Counter */}
        <div
          className="flex items-center gap-3 px-5 py-3 !p-2 bg-black/40 backdrop-blur-xl 
                       border border-white/20 rounded-full"
        >
          <span className="text-lg font-semibold text-white">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/50">/</span>
          <span className="text-sm text-white/70">
            {String(slider.images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Custom Pagination - Bottom Center */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30">
        <div className="custom-pagination flex items-center gap-3" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-30 flex flex-col items-center gap-2">
        <span
          className="text-white/60 text-xs uppercase tracking-widest rotate-90 origin-center mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent animate-scroll-line" />
      </div>
    </div>
  );
};

export default function HeroSlider({
  mainSlider,
}: ProductSliderSectionProps) {
  return (
    <>
      {/* Main Hero Slider - Full Width */}
      <section className="w-full">
        <MainHeroSlider slider={mainSlider} />
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap");

        .custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .swiper-pagination-bullet-active.custom-bullet {
          width: 40px;
          border-radius: 6px;
          background: linear-gradient(90deg, #f97316, #ec4899);
        }

        @keyframes gradient-shift {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        @keyframes scroll-line {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(40px);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-scroll-line {
          animation: scroll-line 2s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .bg-gradient-radial {
          background: radial-gradient(
            circle at 30% 50%,
            transparent 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.4) 100%
          );
        }

        /* Clash Display Font Fallback */
        @font-face {
          font-family: "Clash Display";
          src: local("Impact"), local("Arial Black");
          font-weight: 900;
        }
      `}</style>
    </>
  );
}
