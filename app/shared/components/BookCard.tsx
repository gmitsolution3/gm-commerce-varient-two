"use client";

import { getCart } from "@/utils/cartStorage";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const BookCard = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCart().length);
    };

    updateCart();

    window.addEventListener("cart_updated", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);

  return (
    <Link href={`/checkoutCart`} className="group">
      <div className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 cursor-pointer">
        {/* Icon Container */}
        <div className="relative">
          <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-300" />

          {/* Badge Count */}
          {cartCount > 0 && (
            <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full px-1 shadow-md animate-in zoom-in-50 duration-200">
              {cartCount > 99 ? "99+" : cartCount}
            </div>
          )}
        </div>

        {/* Cart Text - Hidden on mobile, shown on larger screens */}
        <span className="hidden sm:inline-block text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
          Cart
        </span>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none"></div>
      </div>
    </Link>
  );
};
