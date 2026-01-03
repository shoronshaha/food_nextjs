import React from "react";
import SkeletonComponent from "./SkeletonComponent";

const ProductCardSkeleton = () => {
  return (
    <div className="group relative py-2 h-full">
      <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-earth-900 border-2 border-organic-100 dark:border-organic-900/30 shadow-organic h-full flex flex-col">
        
        {/* Badge Skeletons */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          <SkeletonComponent type="text" width="w-24" height="h-5" className="rounded-full" />
        </div>
    
        {/* Product Image Skeleton */}
        <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-organic-100/50 to-fresh-100/30 dark:bg-gradient-to-br dark:from-earth-800 dark:to-earth-900 overflow-hidden">
          <SkeletonComponent type="text" width="w-full" height="h-full" />
        </div>

        {/* Bottom Content */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-organic-50/30 dark:from-earth-900 dark:to-earth-800">
          <div>
            {/* Product Name Skeleton */}
            <SkeletonComponent type="text" width="w-4/5" height="h-5" className="mb-2" />
            <SkeletonComponent type="text" width="w-3/5" height="h-4" className="mb-3" />
            
            {/* Price Skeleton */}
            <div className="flex items-center justify-between mb-3">
              <SkeletonComponent type="text" width="w-20" height="h-7" />
              <SkeletonComponent type="text" width="w-16" height="h-5" />
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col gap-2 mt-auto">
             <SkeletonComponent type="text" width="w-full" height="h-11" className="rounded-xl" />
             <SkeletonComponent type="text" width="w-full" height="h-10" className="rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
