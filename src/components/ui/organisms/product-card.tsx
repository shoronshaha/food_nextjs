// src/components/ui/organisms/product-card.tsx
"use client";

import VariantSelectModal from "@/app/(public)/product/_component/VariantSelectModal";
import { useCart } from "@/hooks/useCart";
import { usePreorderCart } from "@/hooks/usePreorderCart";
import { useWishlist } from "@/hooks/useWishlist";
import type { TPreorderCartItem } from "@/lib/features/preOrderCartSlice/preOrderCartSlice";
import { Product } from "@/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { toast } from "sonner";
import QuickViewModal from "../molecules/QuickViewModal";

import {
  calculateProductPricing,
  generateProductLink,
  getProductStock,
  isProductPreOrder,
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
  const {
    addItem: addPreorderItem,
    item: preorderItem,
    clearCart: clearPreorderCart,
  } = usePreorderCart();
  const {
    items: wishlistItems,
    addItem: addWishlistItem,
    removeItem: removeWishlistItem,
    openWishlist,
  } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"cart" | "wishlist" | null>(
    null
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const variant = useMemo(
    () =>
      product.variantsId?.find((v) => v.variants_stock > 0) ??
      product.variantsId?.[0] ??
      null,
    [product.variantsId]
  );

  const pricingData = useMemo(
    () => calculateProductPricing(variant, product),
    [variant, product]
  );
  const productLink = useMemo(() => generateProductLink(product), [product]);
  const isOutOfStock = useMemo(
    () => getProductStock(variant, product) <= 0 || !product.isPublish,
    [variant, product]
  );
  const isPreOrder = useMemo(
    () => isProductPreOrder(variant, product),
    [variant, product]
  );

  const displayPrice = pricingData.finalPrice;
  const discountPercent = pricingData.discountPercent;

  useEffect(() => {
    if (variant) {
      const hasVariants = product.hasVariants && product.variantsId.length > 0;
      const wishlistedId = hasVariants
        ? variant._id
        : product.variantsId[0]._id;
      setIsWishlisted(wishlistItems.some((item) => item._id === wishlistedId));
    }
  }, [wishlistItems, variant, product]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addVariantToCart = (
    selectedVariant: any,
    quantity: number = 1,
    finalPrice?: number
  ) => {
    if (isPreOrder) {
      if (cartItems.length > 0) {
        toast.error(
          "আপাচার রেগুলার কার্টে প্রোডাক্ট আছে। প্রি-অর্ডার করতে হলে রেগুলার কার্ট ক্লিয়ার করুন।",
          {
            description: "চেকআউট পেজে গিয়ে রেগুলার কার্ট ক্লিয়ার করুন।",
            duration: 5000,
          }
        );
        return;
      }

      const preOrderItem: TPreorderCartItem = {
        _id: selectedVariant._id,
        name: product.name,
        price: finalPrice ?? displayPrice,
        image:
          selectedVariant.image?.alterImage?.secure_url ??
          product.images[0]?.alterImage?.secure_url ??
          "/assets/fallback.jpg",
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
                description:
                  "এখন আপনি রেগুলার প্রোডাক্ট কার্টে যোগ করতে পারবেন",
                duration: 5000,
              });
            },
          },
        });
        return;
      }

      const hasVariants = product.hasVariants && product.variantsId.length > 0;
      const cartId = hasVariants
        ? selectedVariant._id
        : product.variantsId[0]._id;
      const cartVariantId = hasVariants ? selectedVariant._id : undefined;

      const cartItem = {
        _id: cartId,
        variantId: cartVariantId,
        name: product.name,
        price: finalPrice ?? displayPrice,
        image:
          selectedVariant.image?.alterImage?.secure_url ||
          product.images?.[0]?.alterImage?.secure_url,
        quantity,
        maxStock: selectedVariant.variants_stock || product.total_stock,
        variantValues: selectedVariant.variants_values ?? [],
        variantGroups: product.variantsGroup ?? [],
        sellingPrice: selectedVariant.selling_price
          ? Number(selectedVariant.selling_price)
          : pricingData.sellingPrice,
        currency: product.currency || "BDT",
        isDiscountActive:
          selectedVariant.isDiscountActive ??
          pricingData.isDiscountActive ??
          false,
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

  const handleVariantSelect = (
    selectedVariant: any,
    quantity: number,
    finalPrice?: number
  ) => {
    if (modalAction === "cart") {
      addVariantToCart(selectedVariant, quantity, finalPrice);
    } else if (modalAction === "wishlist") {
      const hasVariants = product.hasVariants && product.variantsId.length > 0;
      const wishlistId = hasVariants
        ? selectedVariant._id
        : product.variantsId[0]._id;
      const wishlistVariantId = hasVariants ? selectedVariant._id : undefined;

      const isAlreadyWishlisted = wishlistItems.some(
        (item) => item._id === wishlistId
      );

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
          sellingPrice: selectedVariant.selling_price
            ? Number(selectedVariant.selling_price)
            : pricingData.sellingPrice,
          isDiscountActive:
            selectedVariant.isDiscountActive ??
            pricingData.isDiscountActive ??
            false,
          currency: product.currency || "BDT",
          image:
            selectedVariant.image?.alterImage?.secure_url ||
            product.images?.[0]?.alterImage?.secure_url,
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
        image:
          variant.image?.alterImage?.secure_url ||
          product.images?.[0]?.alterImage?.secure_url,
        variantValues: variant.variants_values ?? [],
        variantGroups: product.variantsGroup ?? [],
      };

      addWishlistItem(wishlistItem);
      toast.success("Added to wishlist!");
    }
    openWishlist();
  };

  const img =
    product.images?.[0]?.alterImage?.secure_url ||
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
        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-earth-900 border-2 border-organic-100 dark:border-organic-900/30 shadow-organic hover:shadow-organic-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group-hover:border-organic-300">
          {/* Organic Certification Badge */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-organic-600 to-organic-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              100% Organic
            </span>
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <span className="inline-block bg-gradient-to-r from-fresh-600 to-fresh-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Product Image */}
          <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-organic-50/50 to-fresh-50/30 dark:bg-gradient-to-br dark:from-earth-800 dark:to-earth-900 overflow-hidden">
            {isImageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-organic-50 dark:bg-earth-800">
                <svg
                  className="w-12 h-12 text-organic-300 dark:text-organic-700 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-organic-600 dark:text-organic-400 text-sm font-medium">
                  Product image loading...
                </span>
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
                  backfaceVisibility: "hidden",
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
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className={`absolute top-2 right-2 p-2.5 rounded-full border-2 backdrop-blur-sm transition-all duration-200 z-10 ${
                isWishlisted
                  ? "border-fresh-500 bg-fresh-50 dark:bg-fresh-900/50 text-fresh-600 hover:scale-110"
                  : "border-organic-200/50 bg-white/80 dark:bg-earth-800/80 text-organic-700 dark:text-organic-300 hover:bg-organic-50 hover:border-organic-300"
              } shadow-sm hover:shadow-md ${
                isPreOrder ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isPreOrder}
            >
              <FiHeart
                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>

            {/* Fresh & Local Badge */}
            {!isPreOrder && (
              <div className="absolute bottom-2 left-2 right-2 flex gap-1 flex-wrap">
                <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/90 dark:bg-earth-800/90 text-organic-700 dark:text-organic-400 border border-organic-200/50">
                  Fresh
                </span>
                <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/90 dark:bg-earth-800/90 text-organic-700 dark:text-organic-400 border border-organic-200/50">
                  Local
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-organic-50/30 dark:from-earth-900 dark:to-earth-800">
            <div>
              <h3 className="text-base font-bold text-earth-900 dark:text-earth-50 line-clamp-2 mb-2 font-poppins leading-tight">
                {product.name}
              </h3>
              {/* Short ingredient highlights for organic feel (display-only) */}
              {product.short_description && (
                <p className="text-sm text-earth-600 dark:text-earth-300 line-clamp-2 mb-3">
                  {product.short_description}
                </p>
              )}
              <div className="flex justify-between items-baseline mb-3">
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-organic-600 dark:text-organic-400 font-inter">
                    ৳{displayPrice}
                  </span>
                  {discountPercent > 0 && (
                    <span className="line-through text-earth-400 dark:text-earth-500 text-xs font-medium">
                      ৳{pricingData.sellingPrice}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-fresh-600 dark:text-fresh-400">
                      You save
                    </span>
                    <span className="text-sm font-extrabold text-fresh-600 dark:text-fresh-400">
                      ৳{(pricingData.sellingPrice - displayPrice).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex items-center justify-center gap-2 text-white font-bold rounded-xl text-sm py-3 px-4 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 relative overflow-hidden group/btn ${
                  isPreOrder
                    ? "bg-gradient-to-r from-fresh-600 to-fresh-500 hover:from-fresh-700 hover:to-fresh-600"
                    : "bg-gradient-to-r from-organic-600 to-organic-500 hover:from-organic-700 hover:to-organic-600"
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {isOutOfStock
                    ? "Out of Stock"
                    : isPreOrder
                    ? "Pre-Order"
                    : "Add to Cart"}
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsQuickViewOpen(true);
                }}
                className="flex items-center justify-center gap-2 text-organic-700 dark:text-organic-300 bg-organic-50 dark:bg-earth-800 hover:bg-organic-100 dark:hover:bg-earth-700 border-2 border-organic-200 dark:border-organic-800 hover:border-organic-300 text-sm py-2.5 px-4 font-semibold rounded-xl transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Quick View
              </button>
            </div>
          </div>

          {/* Subtle leaf decoration on hover */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="text-organic-600"
            >
              <path d="M10 50 Q 30 10, 50 30 T 90 50 Q 70 90, 50 70 T 10 50" />
            </svg>
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
