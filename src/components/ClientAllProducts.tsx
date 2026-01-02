"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import AllProducts from "./AllProducts";
import ProductCardSkeleton from "@/components/ui/skeleton/ProductCardSkeleton"

interface ClientAllProductsProps {
    initialProducts: any; // Replace 'any' with the actual type if known, e.g., Product[]
}

export default function ClientAllProducts({
    initialProducts,
}: ClientAllProductsProps) {
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    useEffect(() => {
        // Check if this is first visit
        const firstVisitKey = 'client_products_first_visit';
        const visited = localStorage.getItem(firstVisitKey);
        if (visited === 'true') {
            setIsFirstVisit(false);
        } else {
            // Mark as visited after first load
            setTimeout(() => {
                localStorage.setItem(firstVisitKey, 'true');
            }, 1000);
        }
    }, []);
    return (
        <Suspense
            fallback={
                <div className="px-1 pt-0 pb-4 md:px-4 md:pt-0 md:pb-6 bg-[#FFEBF0]">
                    <div className="relative mb-6 md:mb-8 text-center">
                        <div className="inline-flex gap-2 items-center mb-3 mt-16">
                            <p className="text-gray-500 text-3xl font-urbanist">
                                OUR <span className="text-orange-600 font-bold">MENU</span>
                            </p>
                            <p className="w-8 sm:w-12 h-0.5 bg-orange-600"></p>
                        </div>
                        <p className="mx-10 sm:mx-auto sm:w-1/2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
                            ✨ <span className="text-black dark:text-white font-medium">Taste the difference!</span> ✨<br />
                            <span className="text-black dark:text-white">
                                Explore our wide range of delicious dishes, crafted with love and the finest ingredients.
                            </span>
                            <br />
                            <span className="text-orange-500 font-bold">FoodApp</span>
                            <span className="text-black dark:text-white"> - Delivered to your door. ❤️</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-2 md:gap-4 w-full max-w-[1600px] mx-auto px-2 sm:px-4">
                        {Array(8)
                            .fill(0)
                            .map((_, index) => (
                                <motion.div
                                    key={`skeleton-${index}`}
                                    initial={isFirstVisit ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={isFirstVisit ? {
                                        duration: 0.3,
                                        delay: Math.min(index * 0.03, 0.5),
                                        ease: "easeOut",
                                    } : { duration: 0 }}
                                    className="w-full"
                                >
                                    <ProductCardSkeleton />
                                </motion.div>
                            ))}
                    </div>
                </div>
            }
        >
            <AllProducts initialProducts={initialProducts} isFirstVisit={isFirstVisit} />
        </Suspense>
    );
}