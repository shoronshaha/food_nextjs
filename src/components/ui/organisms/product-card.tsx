// src/components/ui/organisms/product-card.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { usePreorderCart } from "@/hooks/usePreorderCart";
import type { TPreorderCartItem } from "@/lib/features/preOrderCartSlice/preOrderCartSlice";
import VariantSelectModal from "@/app/(public)/product/_component/VariantSelectModal";
import QuickViewModal from "../molecules/QuickViewModal";

import {
  calculateProductPricing,
  getProductStock,
  isProductPreOrder,
  generateProductLink,
} from "@/utils/productUtils";
import Image from "../atoms/image";

interface ProductCardProps {
  product: Product;
  isAboveFold?: boolean;
}

export default function ProductCard({
  product,
  isAboveFold = false,
}: ProductCardProps) {
  const router = useRouter();
  const { addItem: addCartItem, openCart, items: cartItems } = useCart();
  const { addItem: addPreorderItem, item: preorderItem, clearCart: clearPreorderCart } = usePreorderCart();
  const {
    items: wishlistItems,
    addItem: addWishlistItem,
    removeItem: removeWishlistItem,
    openWishlist,
  } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"cart" | "wishlist" | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const variant = useMemo(() =>
    product.variantsId?.find((v) => v.variants_stock > 0) ??
    product.variantsId?.[0] ??
    null,
    [product.variantsId]
  );

  const pricingData = useMemo(() => calculateProductPricing(variant, product), [variant, product]);
  const productLink = useMemo(() => generateProductLink(product), [product]);
  const isOutOfStock = useMemo(() => getProductStock(variant, product) <= 0 || !product.isPublish, [variant, product]);
  const isPreOrder = useMemo(() => isProductPreOrder(variant, product), [variant, product]);

  const displayPrice = pricingData.finalPrice;
  const discountPercent = pricingData.discountPercent;

  useEffect(() => {
    if (variant) {
      const hasVariants = product.hasVariants && product.variantsId.length > 0;
      const wishlistedId = hasVariants ? variant._id : product.variantsId[0]._id;
      setIsWishlisted(wishlistItems.some((item) => item._id === wishlistedId));
    }
  }, [wishlistItems, variant, product]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addVariantToCart = (selectedVariant: any, quantity: number = 1, finalPrice?: number) => {
    if (isPreOrder) {
      if (cartItems.length > 0) {
        toast.error("আপাচার রেগুলার কার্টে প্রোডাক্ট আছে। প্রি-অর্ডার করতে হলে রেগুলার কার্ট ক্লিয়ার করুন।", {
          description: "চেকআউট পেজে গিয়ে রেগুলার কার্ট ক্লিয়ার করুন।",
          duration: 5000,
        });
        return;
      }

      const preOrderItem: TPreorderCartItem = {
        _id: selectedVariant._id,
        name: product.name,
        price: finalPrice ?? displayPrice,
        image: selectedVariant.image?.alterImage?.secure_url ?? product.images[0]?.alterImage?.secure_url ?? "/assets/fallback.jpg",
        quantity,
        maxStock: selectedVariant.variants_stock ?? product.total_stock,
        variantValues: selectedVariant.variants_values ?? [],
        variantGroups: product.variantsGroup ?? [],
        variantId: selectedVariant._id,
        isPreOrder: true,
        currency: product.currency || "BDT",
      };
      addPreorderItem(preOrderItem);
      toast.success("Pre-order item added to cart!");
    } else {
      if (preorderItem) {
        toast.error("আপনার চেকআউটে ইতিমধ্যে একটা প্রি-অর্ডার প্রোডাক্ট আছে!", {
          description: "চেকআউট ক্লিয়ার করে রেগুলার প্রোডাক্ট যোগ করতে চান?",
          duration: 10000,
          action: {
            label: "চেকআউট ক্লিয়ার করুন",
            onClick: () => {
              clearPreorderCart();
              toast.success("চেকআউট ক্লিয়ার হয়েছে!", {
                description: "এখন আপনি রেগুলার প্রোডাক্ট কার্টে যোগ করতে পারবেন",
                duration: 5000,
              });
            },
          },
        });
        return;
      }

      const hasVariants = product.hasVariants && product.variantsId.length > 0;
      const cartId = hasVariants ? selectedVariant._id : product.variantsId[0]._id;
      const cartVariantId = hasVariants ? selectedVariant._id : undefined;

      const cartItem = {
        _id: cartId,
        variantId: cartVariantId,
        name: product.name,
        price: finalPrice ?? displayPrice,
        image: selectedVariant.image?.alterImage?.secure_url || product.images?.[0]?.alterImage?.secure_url,
        quantity,
        maxStock: selectedVariant.variants_stock || product.total_stock,
        variantValues: selectedVariant.variants_values ?? [],
        variantGroups: product.variantsGroup ?? [],
        sellingPrice: selectedVariant.selling_price ? Number(selectedVariant.selling_price) : pricingData.sellingPrice,
        currency: product.currency || "BDT",
        isDiscountActive: selectedVariant.isDiscountActive ?? pricingData.isDiscountActive ?? false,
        ...(selectedVariant.variants_values?.length > 0 && {
          variantLabel: selectedVariant.variants_values.join(" / "),
        }),
      };
      addCartItem(cartItem);
      openCart();
      toast.success("কার্টে যোগ করা হয়েছে!");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || !variant) {
      toast.error("Out of stock");
      return;
    }

    if (product.hasVariants) {
      setModalAction("cart");
      setIsModalOpen(true);
      return;
    }

    addVariantToCart(variant);
  };

  const handleVariantSelect = (selectedVariant: any, quantity: number, finalPrice?: number) => {
    if (modalAction === "cart") {
      addVariantToCart(selectedVariant, quantity, finalPrice);
    } else if (modalAction === "wishlist") {
      const hasVariants = product.hasVariants && product.variantsId.length > 0;
      const wishlistId = hasVariants ? selectedVariant._id : product.variantsId[0]._id;
      const wishlistVariantId = hasVariants ? selectedVariant._id : undefined;

      const isAlreadyWishlisted = wishlistItems.some((item) => item._id === wishlistId);

      if (isAlreadyWishlisted) {
        removeWishlistItem(wishlistId);
        toast.success("Removed from wishlist!");
      } else {
        const wishlistItem = {
          _id: wishlistId,
          productId: product._id,
          variantId: wishlistVariantId,
          name: product.name,
          price: finalPrice ?? displayPrice,
          sellingPrice: selectedVariant.selling_price ? Number(selectedVariant.selling_price) : pricingData.sellingPrice,
          isDiscountActive: selectedVariant.isDiscountActive ?? pricingData.isDiscountActive ?? false,
          currency: product.currency || "BDT",
          image: selectedVariant.image?.alterImage?.secure_url || product.images?.[0]?.alterImage?.secure_url,
          variantValues: selectedVariant.variants_values ?? [],
          variantGroups: product.variantsGroup ?? [],
        };
        addWishlistItem(wishlistItem);
        toast.success("Added to wishlist!");
      }
      openWishlist();
    }

    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPreOrder) {
      toast.error("Pre-order items cannot be added to wishlist");
      return;
    }

    if (!variant) {
      toast.error("Unavailable");
      return;
    }

    if (product.hasVariants) {
      setModalAction("wishlist");
      setIsModalOpen(true);
      return;
    }

    const hasVariants = product.hasVariants && product.variantsId.length > 0;
    const wishlistedId = hasVariants ? variant._id : product.variantsId[0]._id;

    if (isWishlisted) {
      removeWishlistItem(wishlistedId);
      toast.success("Removed from wishlist!");
    } else {
      const wishlistId = hasVariants ? variant._id : product.variantsId[0]._id;
      const wishlistVariantId = hasVariants ? variant._id : undefined;

      const wishlistItem = {
        _id: wishlistId,
        productId: product._id,
        variantId: wishlistVariantId,
        name: product.name,
        price: displayPrice,
        sellingPrice: pricingData.sellingPrice,
        isDiscountActive: pricingData.isDiscountActive ?? false,
        currency: product.currency || "BDT",
        image: variant.image?.alterImage?.secure_url || product.images?.[0]?.alterImage?.secure_url,
        variantValues: variant.variants_values ?? [],
        variantGroups: product.variantsGroup ?? [],
      };

      addWishlistItem(wishlistItem);
      toast.success("Added to wishlist!");
    }
    openWishlist();
  };

  const img = product.images?.[0]?.alterImage?.secure_url ||
    product.images?.[0]?.image?.secure_url ||
    "/assets/fallback.jpg";

  return (
    <div
      className="group relative py-2 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={productLink}
        className="block relative h-full"
        aria-label={`View ${product.name} details`}
        prefetch={false}
      >
        <div className="relative rounded-2xl overflow-hidden bg-white/70 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              -{discountPercent}%
            </span>
          )}

          {/* Product Image */}
          <div className="relative w-full aspect-[3/4] bg-gray-50 dark:bg-gray-900/50 overflow-hidden rounded-t-xl">
            {isImageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Image not available</span>
              </div>
            ) : (
              <Image
                src={img}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={isAboveFold && !isMobile ? "eager" : "lazy"}
                priority={isAboveFold && !isMobile}
                className={`
                  object-cover 
                  transition-transform 
                  duration-700 
                  ease-out
                  will-change-transform
                  ${isHovered ? "scale-110" : "scale-100"}
                `}
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
                onError={() => setIsImageError(true)}
                objectFit="cover"
                variant="large"
              />
            )}

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`absolute top-2 right-2 p-2 rounded-full border backdrop-blur-sm ${isWishlisted
                ? "border-red-500 bg-red-50/90 dark:bg-red-900/50 text-red-500"
                : "border-gray-200/50 bg-white/50 dark:bg-black/30 text-gray-700 dark:text-gray-200"
                } hover:bg-white hover:scale-110 shadow-sm z-10 transition-all duration-200 ${isPreOrder ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isPreOrder}
            >
              <FiHeart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 font-urbanist">
                {product.name}
              </h3>
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-lg font-bold text-primary">
                  ৳{displayPrice}
                </span>
                {discountPercent > 0 && (
                  <span className="line-through text-gray-400 text-sm">
                    ৳{pricingData.sellingPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex items-center justify-center text-white font-bold rounded-xl text-sm py-2.5 px-4 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 ${isPreOrder
                  ? "bg-gradient-to-r from-orange-500 to-red-500"
                  : "bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90"
                  }`}
              >
                {isPreOrder ? "Pre-Order Now" : "Add to Cart"}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsQuickViewOpen(true);
                }}
                className="flex items-center justify-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-sm py-2 px-4 font-semibold rounded-xl transition-all duration-200"
              >
                Quick View
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Variant Modal */}
      {product.variantsId && (
        <VariantSelectModal
          isOpen={isModalOpen}
          variants={product.variantsId}
          onSelect={handleVariantSelect}
          onClose={() => {
            setIsModalOpen(false);
            setModalAction(null);
          }}
          product={product}
          isWishlistModal={modalAction === "wishlist"}
          variantsGroup={product.variantsGroup}
        />
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}