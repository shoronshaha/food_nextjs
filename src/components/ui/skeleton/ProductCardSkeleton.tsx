import React from "react";
import SkeletonComponent from "./SkeletonComponent";

const ProductCardSkeleton = () => {
  return (
    <div className="group relative py-2 h-full">
      <div className="relative rounded-2xl overflow-hidden bg-white/70 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-xl h-full flex flex-col">
    
        {/* Product Image */}
        <div className="relative w-full aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-t-xl">
          <SkeletonComponent type="text" width="w-full" height="h-full" />
        </div>

        {/* Bottom Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <SkeletonComponent type="text" width="w-3/4" height="h-5" className="mb-2" />
            <div className="flex items-center justify-between mb-3">
              <SkeletonComponent type="text" width="w-24" height="h-8" />
              <SkeletonComponent type="text" width="w-16" height="h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
             <SkeletonComponent type="text" width="w-full" height="h-10" />
             <SkeletonComponent type="text" width="w-full" height="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
