"use client";

import { ProductFormData } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardButtons } from "./cardButtons";
import ProductSingleCard from './../../../components/ProductCard';

interface GroupedProducts {
  [categoryName: string]: ProductFormData[];
}

const ProductCard = ({
  products,
}: {
  products: ProductFormData[];
}) => {
  const groupedProducts: GroupedProducts = products.reduce(
    (acc, pro) => {
      const catName = pro.category;
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(pro);
      return acc;
    },
    {} as GroupedProducts,
  );

  return (
    <div className="w-full space-y-16 py-8 px-3">
      {Object.entries(groupedProducts).map(
        ([categoryName, categoryProducts]) => (
          <CategoryCarousel
            key={categoryName}
            categoryName={categoryName}
            products={categoryProducts}
          />
        ),
      )}
    </div>
  );
};

// Carousel for each category
const CategoryCarousel = ({
  categoryName,
  products,
}: {
  categoryName: string;
  products: ProductFormData[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

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

  if (products.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center md:text-left font-semibold uppercase">
        {categoryName}
      </h2>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-2 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
            }}
          >
            {products.map((pro, i) => (
              <ProductSingleCard key={i} product={pro} />
            ))}
          </div>
        </div>

        {/* Arrows - Desktop/Tablet */}
        <button
          onClick={handlePrev}
          className="absolute left-0 md:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg items-center justify-center z-10 hidden md:flex"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10 md:flex"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots - Mobile */}
        <div className="flex justify-center mt-6 gap-2 md:hidden">
          {Array.from({
            length: Math.ceil(products.length / visibleCards),
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * visibleCards)}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / visibleCards) === i
                  ? "bg-primary w-8"
                  : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
      {/* <div className="w-full flex justify-center">
        <div className="max-w-50 border border-primary text-primary text-center mt-2 rounded-lg text-lg cursor-pointer hover:bg-primary font-bold hover:text-white transition py-4 px-4 ">
          See All Products
        </div>
      </div> */}
    </section>
  );
};

export default ProductCard;
