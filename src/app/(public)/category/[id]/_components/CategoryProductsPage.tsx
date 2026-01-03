// app/(public)/category/[id]/_components/CategoryProductsPage.tsx
"use client";

import { Pagination } from "@/components/ui/molecules/pagination";
import ProductCard from "@/components/ui/organisms/product-card";
import { Product } from "@/types/product";
import { useState } from "react";
import { FiGrid, FiPackage } from "react-icons/fi";

interface Props {
  initialProducts?: Product[];
  category?: string;
  error?: string;
}

export default function CategoryProductsPage({
  initialProducts = [],
  category = "",
  error: serverError,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Show 12 products per page

  const filtered = initialProducts; // Use server-side filtered data directly

  // Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of products grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-secondary dark:bg-foreground md:mt-20">
      <div className="relative overflow-hidden -top-2">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, var(--color-organic-primary) 0%, rgba(34,197,94,0.9) 30%, rgba(250,250,249,0.03) 100%)`,
          }}
        />

        <div className="relative md:py-8 py-4 mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-2 md:mb-4 bg-white/10 backdrop-blur-sm rounded-full text-white/95 text-sm font-medium">
            <FiGrid className="w-4 h-4 text-white" />
            Category Collection
          </div>
          <h1 className="text-xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 md:mb-4 animate-fade-in capitalize">
            {category || "Category"}
          </h1>
          <p className="text-sm md:text-lg text-white/90 md:mb-4 mb-1 max-w-2xl mx-auto">
            Fresh, organic picks curated from local farms and trusted partners
          </p>
          <div className="flex items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <FiPackage className="w-5 h-5 text-white" />
              <span className="md:text-lg text-sm font-semibold">
                {filtered.length} Product{filtered.length !== 1 && "s"}
              </span>
            </div>
            <div className="w-2 h-2 bg-white/30 rounded-full" />
            <span className="text-sm">Certified & Ethically Sourced</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:py-4 md:px-2 py-1">
        {serverError ? (
          <div className="text-center py-20" role="status" aria-live="polite">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
              <FiPackage
                className="w-10 h-10 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Error Loading Products
            </h3>
            <p className="text-red-500 text-sm mt-2" role="alert">
              {serverError}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" role="status" aria-live="polite">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
              <FiPackage
                className="w-10 h-10 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-1">
              We couldn&apos;t find any products in this category.
            </p>
            <p className="text-sm text-gray-500">
              Searched through {filtered.length} products.
            </p>
          </div>
        ) : (
          <div>
            <div className="grid max-[345px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-2 md:gap-4 w-full max-w-[1600px] mx-auto px-2 sm:px-4">
              {currentProducts.map((product, idx) => (
                <div
                  key={product._id}
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    animationFillMode: "both",
                  }}
                  aria-label={`Product: ${product.name}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 max-w-7xl mx-auto px-2 sm:px-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}
