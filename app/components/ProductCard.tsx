import React, { useState } from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { handleWhatsApp } from "./../(public)/shop/components/handleWhatsApp";
import { createPortal } from "react-dom";
import ProductVariant from "./../(public)/shop/components/ProductVariants";

const ProductCard = ({ product }: { product: any }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const from = "cardButton";

  const productPrice =
    product.discount.type === "percentage"
      ? Math.floor(
          Number(product.basePrice) -
            (Number(product.basePrice) *
              Number(product.discount.value)) /
              100,
        )
      : Math.max(
          Number(product.basePrice) - Number(product.discount.value),
          0,
        );

  const { title, slug, thumbnail } = product;

  const productDetails = {
    productPrice,
    title,
    slug,
    thumbnail,
  };

  const calculatePrice = () => {
    const base = parseInt(product.basePrice);
    if (product.discount.type === "flat") {
      return base - parseInt(product.discount.value);
    } else if (product.discount.type === "percentage") {
      return base - (base * parseInt(product.discount.value)) / 100;
    }
    return base;
  };

  const getDiscountLabel = () => {
    if (product.discount.type === "flat") {
      return `৳${product.discount.value} OFF`;
    } else if (product.discount.type === "percentage") {
      return `${product.discount.value}% OFF`;
    }
    return "";
  };

  const discountedPrice = calculatePrice();
  const hasDiscount = parseInt(product.discount.value) > 0;

  const handleAddToCart = () => {
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  const handleBuyNow = () => {
    setIsCartModalOpen(true);
    setIsBuyNow(true);
  };

  return (
    <div className="group bg-white w-80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 relative border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              {getDiscountLabel()}
            </span>
          )}
          {product.stockQuantity <= 10 && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              Only {product.stockQuantity} left
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-700 hover:bg-red-50"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
            />
          </button>
          <button
            onClick={handleBuyNow}
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100 `}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-gray-900 font-semibold text-lg font-semibold mt-2 mb-1 line-clamp-2 leading-snug min-h-[3rem]">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 my-5">
          {product.description.slice(0, 100)}...
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ৳{discountedPrice}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ৳{product.basePrice}
              </span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                Save ৳{parseInt(product.basePrice) - discountedPrice}
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={`space-y-2 transition-all duration-500 translate-y-4 opacity-0 h-0 overflow-hidden group-hover:translate-y-0 group-hover:opacity-100 group-hover:h-auto group-hover:duration-500`}
        >
          <button
            onClick={handleBuyNow}
            className="w-full bg-primary text-white py-3 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Order Now
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="border border-primary text-primary py-2.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1"
            >
              <span>
                <ShoppingCart className="w-4 h-4" />
              </span>
              Add to Cart
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="bg-green-500 text-white py-2.5 text-xs font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-1"
            >
              <FaWhatsapp />
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Stock Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
        <div
          className="h-full bg-primary transition-all duration-700"
          style={{
            width: `${Math.min((product.stockQuantity / 50) * 100, 100)}%`,
          }}
        />
      </div>

      {isCartModalOpen &&
        createPortal(
          // <AddToCartModal product={product} onClose={closeModal} />

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-2">
                Product added to cart
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {product.title}
              </p>
              <div>
                <ProductVariant
                  variants={product.variants}
                  from={from}
                  productDetails={productDetails}
                  onCloseModal={closeModal}
                  isBuyNow={isBuyNow}
                  product={product}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ProductCard;
