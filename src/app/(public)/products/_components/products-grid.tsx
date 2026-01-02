// components/shop-all-products/products-grid.tsx
"use client";
import React from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/organisms/product-card";
import ProductGridSkeleton from "@/components/ui/skeleton/ProductGridSkeleton";

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
                <div className="py-16 text-center text-gray-600 dark:text-white font-urbanist">
                    <p className="text-xl font-bold mb-2">No dishes found matching your taste.</p>
                    <p className="text-sm">Try adjusting your filters or search.</p>
                    <button
                        onClick={clearAllFilters}
                        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
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