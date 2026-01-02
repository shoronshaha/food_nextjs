// src/components/DynamicCategorySections.js (Server Component)
import { Product } from "@/types/product";
import Link from "next/link";
import ProductCard from "./ui/organisms/product-card";

export default function DynamicCategorySections({ initialProducts }: { initialProducts?: Product[] }) {
    // Handle empty or invalid initialProducts
    if (!initialProducts || initialProducts.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center space-y-6 max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-600/20 to-primary/20 rounded-full blur-xl"></div>
                        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/10 via-purple-600/10 to-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                            <svg className="w-12 h-12 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2m-14 0h2m0 0V9a2 2 0 012-2h2m2 2v4"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                            কোনো প্রোডাক্ট পাওয়া যায়নি
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            দয়া করে পরে আবার চেষ্টা করুন
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Categorize products (directly, no useMemo)
    const categorizedProducts: { category: string; products: Product[]; totalCount: number }[] = [];
    const map = new Map<string, { category: string; products: Product[]; totalCount: number }>();

    initialProducts.forEach((product) => {
        if (!product.sub_category?.length) return;

        const lastCategory = product.sub_category[product.sub_category.length - 1];
        const categoryName = lastCategory?.name?.trim();

        if (!categoryName) return;

        if (!map.has(categoryName)) {
            map.set(categoryName, {
                category: categoryName,
                products: [],
                totalCount: 0,
            });
        }

        const categoryData = map.get(categoryName)!;
        categoryData.products.push(product);
        categoryData.totalCount = categoryData.products.length;
    });

    categorizedProducts.push(...Array.from(map.values()).filter((group) => group.products.length > 0));

    if (categorizedProducts.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4 font-urbanist">
                <div className="text-center space-y-6 max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-500/20 to-orange-400/20 rounded-full blur-xl"></div>
                        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 via-white to-orange-50 backdrop-blur-sm rounded-full border border-orange-200">
                            <span className="text-4xl">🍽️</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            No Menu Items Found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Please check back later for our delicious updates.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="py-12 space-y-16 font-urbanist">
            <div className="md:space-y-16 space-y-6">
                {categorizedProducts.map(({ category, products: catProducts, totalCount }, sectionIndex) => {
                    const maxProducts = 4; // Fixed for server rendering; adjust with CSS for responsiveness
                    const finalProducts = catProducts.slice(0, maxProducts);

                    return (
                        <section
                            key={category}
                            className="group/section bg-orange-50/50 dark:bg-gray-900/50 relative overflow-hidden py-4 rounded-3xl"
                        >
                            <div className="absolute inset-0 bg-orange-50/50 dark:bg-gray-900/50 rounded-3xl"></div>
                            
                            <div className="relative space-y-8 lg:container mx-auto px-2 md:px-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent rounded-3xl blur-3xl scale-110"></div>
                                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:p-8 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-orange-100 dark:border-gray-700 shadow-lg transition-all duration-500 hover:shadow-xl">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-4">
                                                <div className="w-1.5 h-10 bg-gradient-to-t from-orange-500 to-red-500 rounded-full"></div>
                                                <div>
                                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-800 dark:text-white capitalize leading-tight tracking-wide">
                                                        {category}
                                                    </h2>
                                                    <div className="mt-2 h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-orange-100/50 dark:bg-orange-900/20 rounded-full border border-orange-200 dark:border-orange-800">
                                                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                                                    <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
                                                        {totalCount} Dishes
                                                    </span>
                                                </div>
                                                {totalCount > maxProducts && (
                                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600">
                                                        +{totalCount - maxProducts} More
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <Link
                                                href={`/category/${encodeURIComponent(category)}`}
                                                className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-orange-500/30 hover:scale-105 transform transition-all duration-300 ease-out overflow-hidden"
                                            >
                                                <span className="relative z-10 whitespace-nowrap uppercase tracking-wider">View Full Menu</span>
                                                <svg
                                                        className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2.5}
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        />
                                                    </svg>
                                            </Link>
                                        </div>
                                        <div className="md:hidden w-full">
                                            <Link
                                                href={`/category/${encodeURIComponent(category)}`}
                                                className="w-full text-center group inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                <span>See All</span>
                                                <svg
                                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative group/grid">
                                    <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                                        {finalProducts.map((product: Product, index: number) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </section>
    );
}