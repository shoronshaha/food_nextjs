import React from "react";

interface ProductHeaderProps {
    name: string;
}

export function ProductHeader({ name }: ProductHeaderProps) {
    return (
        <div className="mt-6 font-urbanist">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-2">
                Dish Details
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 mt-2 break-words leading-tight">
                {name}
            </h1>
        </div>
    );
}