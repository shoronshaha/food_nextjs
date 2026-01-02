"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import type { Product } from "@/types/product";
import ProductCard from "./ui/organisms/product-card";
import {
  buildGtmItem,
  trackViewRelatedItemList,
} from "@/utils/gtm";

interface RelatedProductsProps {
  currentProductId: string;
  subCategoryId: string;
  preloadedRelatedProducts: Product[];
}

export default function RelatedProducts({
  currentProductId,
  subCategoryId,
  preloadedRelatedProducts,
}: RelatedProductsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Filter related products to exclude the current product and match subCategoryId
  const related = useMemo(() => {
    return preloadedRelatedProducts.filter(
      (p: Product) =>
        p._id !== currentProductId &&
        p.sub_category.some((sc) => sc._id === subCategoryId)
    );
  }, [preloadedRelatedProducts, currentProductId, subCategoryId]);

  // Track related products for analytics
  useEffect(() => {
    console.log("Related Products Data:", { related, currentProductId, subCategoryId });
    if (related.length === 0) return;

    const productsForTracking = related.slice(0, 4).map((p: Product, idx) => {
      const firstVariant = p.variantsId?.[0];
      return buildGtmItem(
        p,
        firstVariant,
        1,
        "Related Products",
        subCategoryId,
        idx + 1
      );
    });

    trackViewRelatedItemList(productsForTracking, subCategoryId);
  }, [related, subCategoryId]);

  // Show placeholder until section is visible
  if (!isVisible) {
    return (
      <section ref={sectionRef} className="py-10">
        <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-orange-500/50"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 dark:from-white dark:via-orange-400 dark:to-white font-urbanist tracking-wide">
                RECOMMENDED DISHES
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-orange-500/50"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl h-[350px] animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (related.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-10 relative">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-orange-500/5 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
      
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-orange-500"></div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 dark:from-white dark:via-orange-400 dark:to-white font-urbanist tracking-wider uppercase">
            Recommended Dishes
        </h2>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-orange-500"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-10 animate-in fade-in duration-500">
        {related.slice(0, 4).map((product: Product, idx: number) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}