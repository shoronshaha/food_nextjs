import React from "react";

interface ProductHeaderProps {
    name: string;
}

export function ProductHeader({ name }: ProductHeaderProps) {
    return (
        <div className="mt-6">
            <span className="text-orange-500 font-urbanist font-semibold text-sm tracking-widest uppercase">Dish Details</span>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 break-all font-urbanist">
                {name}
            </h1>
        </div>
    );
}