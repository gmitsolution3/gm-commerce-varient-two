"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductFormData } from "@/utils/product";
import ProductCard from "./ProductCard";

const ProductCarousel = ({
  products,
  topSelling,
}: {
  products: ProductFormData[];
  topSelling?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Responsive visible cards update
  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 640) setVisibleCards(2);
    else if (width < 1024) setVisibleCards(3);
    else setVisibleCards(4);
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () =>
      window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0
        ? Math.max(products.length - visibleCards, 0)
        : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + visibleCards >= products.length ? 0 : prev + 1,
    );
  };

  // If no products, show nothing or placeholder
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto">
        {topSelling ? (
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-2 uppercase">
              Top Selling Products
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Check out our latest top selling products and
              bestsellers.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-2 uppercase">
              Featured Products
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Check out our latest products and bestsellers.
            </p>
          </div>
        )}

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-2 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / visibleCards
                }%)`,
              }}
            >
              {products.map((product, i) => (
                <ProductCard
                  key={i}
                  product={product}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10 backdrop-blur"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10 backdrop-blur"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots Indicator (Optional - for mobile) */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({
              length: Math.ceil(products.length / visibleCards),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * visibleCards)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / visibleCards) === i
                    ? "bg-primary w-8"
                    : "bg-[#e9dbcd]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
