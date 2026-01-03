// src/components/NewProducts.tsx
"use client";

import ProductCardSkeleton from "@/components/ui/skeleton/ProductCardSkeleton";
import { Product } from "@/types/product";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ui/organisms/product-card";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

interface NewProductsSlideProps {
  initialProducts: Product[];
  className?: string;
  autoplay?: boolean | { delay: number };
  isLoading?: boolean;
}

/* SVG Icons */
const ChevronLeft = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

/* Main Component */
export default function NewProductsSlide({
  initialProducts,
  className = "",
  autoplay = { delay: 3000 },
  isLoading = false,
}: NewProductsSlideProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [displayLoading, setDisplayLoading] = useState(true);

  // Handle loading state
  useEffect(() => {
    if (!isLoading && initialProducts.length >= 0) {
      setDisplayLoading(false);
    }
  }, [isLoading, initialProducts]);

  // Filter new products
  const newProducts = initialProducts.filter((product) =>
    product.variantsId?.some((v) => v.condition?.toLowerCase() === "new")
  );

  // Connect custom nav buttons
  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current) {
      // @ts-ignore
      swiper.params.navigation!.prevEl = prevRef.current;
      // @ts-ignore
      swiper.params.navigation!.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  if (!displayLoading && newProducts.length === 0) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Kitchen is prepping...</h3>
            <p className="text-gray-600 mb-6">New dishes coming soon!</p>
            <Link href="/products" className="btn btn-primary">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12 ${className}`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 via-transparent to-green-50/20 dark:from-green-900/10 dark:via-transparent dark:to-green-900/5 pointer-events-none" />

      <div className="relative max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-primary">★</span>
              <span className="text-primary text-lg">★</span>
              <span className="text-primary">★</span>
            </div>
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 font-urbanist">
              Fresh from the Kitchen
            </h1>
            <p className="hidden md:block text-base text-gray-700 dark:text-gray-300 mt-2 max-w-2xl">
              Taste the newest additions to our menu, crafted with passion.
            </p>
            <div className="mt-4 h-1.5 bg-gradient-to-r from-primary to-transparent w-32 sm:w-48 md:w-64 lg:w-80 rounded-full" />
          </div>
          <Link
            href="/products/new"
            className="px-6 py-2.5 md:px-8 md:py-3 border-2 md:mt-0 mt-6 border-primary text-primary dark:text-primary/80 font-bold rounded-full hover:bg-secondary/10 dark:hover:bg-secondary-900/20 transition-all uppercase tracking-wider text-sm"
          >
            See Full Menu
          </Link>
        </div>

        {/* Swiper Carousel */}
        <div className="relative group">
          {displayLoading ? (
            <div className="relative overflow-hidden">
              {/* Skeleton mimicking Swiper layout with exact breakpoints */}
              <div className="flex gap-2 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-5 2xl:gap-6 pb-6">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="flex-shrink-0 w-[calc(100vw/1.2-8px)] sm:w-[calc(100vw/1.5-10px)] md:w-[calc(100vw/2-12px)] lg:w-[calc(100vw/2.5-14px)] xl:w-[calc(100vw/3-16px)] 2xl:w-[calc(100vw/4-18px)] min-w-0"
                    >
                      <ProductCardSkeleton />
                    </div>
                  ))}
              </div>
              {/* Placeholder for nav buttons space */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 -ml-2 sm:-ml-2 md:-ml-4 opacity-0" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 -mr-2 sm:-mr-2 md:-mr-4 opacity-0" />
            </div>
          ) : (
            <>
              <Swiper
                modules={[Navigation, FreeMode, Autoplay]}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides={false}
                freeMode={{ enabled: true, momentumRatio: 0.3 }}
                autoplay={
                  autoplay
                    ? {
                        delay:
                          typeof autoplay === "object" ? autoplay.delay : 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }
                    : false
                }
                loop={newProducts.length > 5}
                onSwiper={setSwiper}
                breakpoints={{
                  // Mobile
                  0: { slidesPerView: 1.2, spaceBetween: 8 },
                  320: { slidesPerView: 1.5, spaceBetween: 10 },
                  480: { slidesPerView: 2, spaceBetween: 12 },
                  640: { slidesPerView: 2.5, spaceBetween: 14 },
                  // Tablet
                  768: { slidesPerView: 3, spaceBetween: 16 },
                  // Desktop
                  1024: { slidesPerView: 4, spaceBetween: 18 },
                  1280: { slidesPerView: 5, spaceBetween: 20 },
                  1536: { slidesPerView: 5, spaceBetween: 24 },
                }}
                className="pb-6"
              >
                {newProducts.map((product, index) => (
                  <SwiperSlide key={`${product._id}-${index}`}>
                    <div className="h-full transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]">
                      <div className="relative">
                        {/* Glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/60/20 to-green-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        <ProductCard
                          product={product}
                          isAboveFold={index < 6}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Nav Buttons */}
              <button
                ref={prevRef}
                className="absolute left-0 sm:-left-2 md:-left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>

              <button
                ref={nextRef}
                className="absolute right-0 sm:-right-2 md:-right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                aria-label="Next"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
