// components/shop-all-products/products-grid.tsx
"use client";
import ProductCard from "@/components/ui/organisms/product-card";
import ProductGridSkeleton from "@/components/ui/skeleton/ProductGridSkeleton";
import { Product } from "@/types/product";
import React from "react";

interface ShopProductsGridProps {
  productsContainerRef: React.RefObject<HTMLDivElement>;
  filteredAndSorted: Product[];
  clearAllFilters: () => void;
  isLoadingMore?: boolean;
}

// Tailwind breakpoints (ডিফল্ট)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1380,
};

export default function ShopProductsGrid({
  productsContainerRef,
  filteredAndSorted,
  clearAllFilters,
  isLoadingMore = false,
}: ShopProductsGridProps) {
  return (
    <div ref={productsContainerRef} className="md:p-4 md:mt-0 relative z-10">
      {filteredAndSorted.length > 0 ? (
        <div
          className={`
            grid gap-2
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          `}
        >
          {filteredAndSorted.map((product, i) => (
            <ProductCard
              key={`${product._id}-${i}`}
              product={product}
              isAboveFold={i < 8}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-600 dark:text-white font-urbanist rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-white/10 mx-4">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🍽️</span>
          </div>
          <p className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
            No dishes found matching your taste.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            It seems we don't have exactly what you're looking for right now.
            Try adjusting your filters or search.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg hover:opacity-95 hover:scale-105 transition-all duration-300"
          >
            View Full Menu
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoadingMore && (
        <div className="mt-8">
          <ProductGridSkeleton count={12} />
        </div>
      )}

      {/* Load More Button - Logic handled in parent but visually here if needed,
                  Wait, parent ShopAllProducts passes isLoadingMore to this component but renders the button itself?
                  Checking ShopAllProducts... yes, parent renders the button.
                  Wait, ShopAllProducts passes `isLoadingMore` prop to ShopProductsGrid.
                  But ShopAllProducts ALSO renders the button below ShopProductsGrid.

                  Let me check ShopAllProducts code again.
                  Lines 405-415 in ShopAllProducts.tsx render the button.

                  So I don't need to change the button text HERE in products-grid.tsx.
                  I need to change it in ShopAllProducts.tsx.

                  But I AM changing "No products matched..." text here.
              */}
    </div>
  );
}
