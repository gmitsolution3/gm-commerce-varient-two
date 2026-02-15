"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const MenuNavbar = ({ categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("home");
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setActiveCategory(id);
    setOpen(false);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "home";
    setActiveCategory(lastSegment);
  }, []);

  return (
    <div className="border-b border-gray-200 py-2">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <span className="font-medium text-gray-800">Menu</span>
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-700"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300 lg:overflow-visible",
            open ? "max-h-96 pb-3" : "max-h-0 lg:max-h-full"
          )}
        >
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-1 lg:gap-8">
            {/* Home */}
            <Link href={`/`}>
              <button
                onClick={() => handleClick("home")}
                className={clsx(
                  "w-full lg:w-auto text-left lg:text-center px-2 py-3 text-sm font-medium transition-colors relative",
                  activeCategory === "home"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Home
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-200",
                    activeCategory === "home"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </button>
            </Link>

            {/* All Products */}
            <Link href={`/shop/all`}>
              <button
                onClick={() => handleClick("all")}
                className={clsx(
                  "w-full lg:w-auto text-left lg:text-center px-2 py-3 text-sm font-medium transition-colors relative group",
                  activeCategory === "all"
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                All Products
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-200",
                    activeCategory === "all"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </button>
            </Link>

            {/* Categories */}
            {!categories || !categories.length ? (
              <div className="text-center text-gray-500 py-3 text-sm">
                No categories found
              </div>
            ) : (
              categories.map((category: any) => (
                <Link href={`/shop/${category._id}`} key={category._id}>
                  <button
                    onClick={() => handleClick(category._id)}
                    className={clsx(
                      "w-full lg:w-auto text-left lg:text-center px-2 py-3 text-sm font-medium transition-colors relative group",
                      activeCategory === category._id
                        ? "text-primary"
                        : "text-gray-600 hover:text-primary"
                    )}
                  >
                    {category.name}
                    <span
                      className={clsx(
                        "absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-200",
                        activeCategory === category._id
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};