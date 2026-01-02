"use client";

import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { useSidebar } from "@/hooks/useSidebar";
import { navbarRef } from "@/lib/refs";
import { SidebarToggler } from "../molecules/sidebarToggler";
import ThemeToggler from "../molecules/themeToggler";
import { CartSheet } from "../organisms/cart-sheet";
import { WishlistSheet } from "./WishlistSheet";
import { MenuSidebar } from "../molecules/menusidebar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { AnimatePresence } from "framer-motion";
import { Business } from "@/types/business";
import Image from "../atoms/image";

const SearchDropdown = lazy(() => import("./SearchDropdown"));

export interface NavbarProps {
  className?: string;
  business: Business;
}

interface SearchResultItem {
  type: "product" | "category";
  id: string;
  name: string;
  url: string;
  image?: string;
}

const DEFAULT_IMAGE = "/assets/falback.jpg";

export const Navbar = ({ className, business }: NavbarProps) => {
  const { toggle, isDesktop } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { products, fetchProducts, loading: productsLoading, hasFetched } = useProducts();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isFetchingForSearch, setIsFetchingForSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const isProductsPage = pathname?.startsWith("/products");
  const isProductDetailPage = pathname?.startsWith("/product");
  const isCheckoutPage = pathname?.startsWith("/checkout");
  const categories = business?.categories || [];

  // Slug generator
  const generateSlug = (name: string): string => {
    const BANGLA_TO_LATIN: Record<string, string> = {
      "অ": "o", "আ": "a", "ই": "i", "ঈ": "i", "উ": "u", "ঊ": "u", "ঋ": "ri",
      "এ": "e", "ঐ": "oi", "ও": "o", "ঔ": "ou", "ক": "k", "খ": "kh", "গ": "g",
      "ঘ": "gh", "ঙ": "ng", "চ": "ch", "ছ": "chh", "জ": "j", "ঝ": "jh", "ঞ": "ny",
      "ট": "t", "ঠ": "th", "ড": "d", "ঢ": "dh", "ণ": "n", "ত": "t", "থ": "th",
      "দ": "d", "ধ": "dh", "ন": "n", "প": "p", "ফ": "ph", "ব": "b", "ভ": "bh",
      "ম": "m", "য": "j", "র": "r", "ল": "l", "শ": "sh", "ষ": "sh", "স": "s",
      "হ": "h", "ড়": "r", "ঢ়": "rh", "য়": "y", "ৎ": "t", "ং": "ng", "ঃ": "h", "ঁ": "",
    };
    return name
      .toLowerCase()
      .replace(/[অ-হ]/g, (char) => BANGLA_TO_LATIN[char] || char)
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on outside click
  useEffect(() => {
    if (!showSearchBar) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchBar(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showSearchBar]);

  // Clear isFetchingForSearch when products are loaded
  useEffect(() => {
    if (hasFetched) setIsFetchingForSearch(false);
  }, [hasFetched]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Search suggestions
  const suggestions: SearchResultItem[] = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term || !hasFetched) return [];

    const categoryMatches = categories
      .filter((cat: any) => cat.name?.toLowerCase().includes(term))
      .map((cat: any) => ({
        type: "category" as const,
        id: cat._id,
        name: cat.name || "Unnamed Category",
        url: `/products?category=${cat._id}&name=${encodeURIComponent(cat.name?.toLowerCase() || "")}`,
        image: cat.image?.optimizeUrl || DEFAULT_IMAGE,
      }));

    const productMatches = products
      .filter((product: any) =>
        [product.name, product.short_description, product.long_description]
          .some((field) => field?.toLowerCase().includes(term))
      )
      .map((product: any) => ({
        type: "product" as const,
        id: product._id,
        name: product.name || "Unnamed Product",
        url: `/product/${generateSlug(product.name || "")}?id=${product._id}`,
        image: product.images?.[0]?.image?.secure_url
          ? product.images[0].alterImage?.secure_url || product.images[0].image.secure_url
          : DEFAULT_IMAGE,
      }));

    return [...categoryMatches, ...productMatches].slice(0, 8);
  }, [debouncedSearchTerm, categories, products, hasFetched]);

  // Handle search submission
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !searchTerm.trim()) return;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", searchTerm.trim());
    router.push(`/products?${newSearchParams.toString()}`);
    setShowSearchBar(false);
    setSearchTerm("");
  };

  // Handle search button click
  const handleSearchClick = () => {
    setShowSearchBar(true);
    if (!hasFetched && !productsLoading) {
      setIsFetchingForSearch(true);
      fetchProducts();
    }
  };

  // Placeholder text for search input
  const placeholderText = isFetchingForSearch
    ? "Loading products..."
    : !hasFetched
      ? "Click to load and search products..."
      : "Search products...";

  return (
    <>
      {/* Main Navbar */}
      <div
        ref={navbarRef}
        className={`w-full z-[100] sticky top-0 transition-all duration-300 font-urbanist
          ${isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-2 border-b border-orange-100"
            : "bg-base py-4"
          } ${className || ""}`}
      >
        {/* Mobile Bottom Navigation Bar - UPDATED COLORS */}
        {!isProductsPage && !isCheckoutPage && !isProductDetailPage && (
          <div className="md:hidden fixed bottom-5 left-4 right-4 z-50 bg-white/90 backdrop-blur-lg border border-orange-100/50 rounded-2xl flex justify-around items-center h-16 shadow-2xl shadow-orange-500/10">
            <div className="flex flex-col items-center text-xs text-gray-600">
              <SidebarToggler />
              <span className="font-medium mt-1">Menu</span>
            </div>
            
            <Link href="/" className="flex flex-col items-center text-xs text-primary font-bold">
               <div className="bg-orange-50 p-2 rounded-full mb-1">
                 <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 5V19C15.9 19 19 15.9 19 12C19 8.1 15.9 5 12 5Z"></path></svg>
               </div>
               <span>Home</span>
            </Link>

            <button
              type="button"
              onClick={() => router.push("/products")}
              className="flex flex-col items-center text-xs text-gray-600 hover:text-primary transition-colors"
            >
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xl mb-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 21.886l-9.192-9.193a2.98 2.98 0 0 1 0-4.215l8.808-8.807a2.98 2.98 0 0 1 4.215 0l9.192 9.192a2.978 2.978 0 0 1 0 4.215l-8.808 8.807a2.98 2.98 0 0 1-4.215 0z"></path></svg>
              <span>Our Menu</span>
            </button>
            <div className="flex flex-col items-center text-xs text-gray-600">
               <ThemeToggler />
               <span className="mt-1">Theme</span>
            </div>
          </div>
        )}

        {/* Desktop Full Header */}
        <div className="hidden md:flex items-center justify-between container mx-auto px-6">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-full border-2 border-primary/20 p-1 group-hover:border-primary transition-colors">
                  <Image
                    src={business?.alterImage?.secure_url || DEFAULT_IMAGE}
                    alt="Logo"
                    sizes="120px"
                    className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full"
                    variant="small"
                  />
              </div>
              <span className="text-2xl font-bold text-gray-800 tracking-tight group-hover:text-primary transition-colors">
                 {business?.businessName || "G'Lore"}
              </span>
            </Link>
          </div>

          {/* Center: Navigation Pills */}
          <div className="flex items-center bg-white/50 backdrop-blur-sm border border-orange-100 rounded-full px-2 py-1 shadow-sm">
             <Link href="/" className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${pathname === '/' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-orange-50'}`}>
                Home
             </Link>
             <Link href="/products" className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${pathname?.startsWith('/products') ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-orange-50'}`}>
                Full Menu
             </Link>
             <button onClick={toggle} className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-primary hover:bg-orange-50 flex items-center gap-2">
                <SidebarToggler />
                <span>Categories</span>
             </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Search Pill */}
            <div className="relative" ref={searchRef}>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${showSearchBar ? 'bg-white shadow-lg ring-2 ring-primary/20 w-64' : 'bg-white/50 hover:bg-white border border-transparent hover:border-orange-100 w-auto'}`}>
                  <button
                    type="button"
                    onClick={handleSearchClick}
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
                    <AiOutlineSearch className="text-xl" />
                  </button>
                  {showSearchBar && (
                    <input 
                      autoFocus
                      className="bg-transparent text-sm w-full focus:outline-none text-gray-700 placeholder-gray-400"
                      placeholder="Search for sushi, pizza..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  )}
                  {!showSearchBar && <span onClick={handleSearchClick} className="text-sm font-medium text-gray-500 cursor-pointer hidden lg:block">Search...</span>}
              </div>
              
              <AnimatePresence>
                {showSearchBar && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <Suspense fallback={<div className="p-4 text-center text-xs text-gray-400">Loading...</div>}>
                      <SearchDropdown
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        placeholderText={placeholderText}
                        isFetchingForSearch={isFetchingForSearch}
                        hasFetched={hasFetched}
                        suggestions={suggestions}
                        generateSlug={generateSlug}
                        onClose={() => {
                          setShowSearchBar(false);
                          setSearchTerm("");
                        }}
                        onKeyDown={handleSearchKeyDown}
                      />
                    </Suspense>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
               <WishlistSheet />
               <CartSheet />
               <div className="w-px h-6 bg-gray-200 mx-1"></div>
               <ThemeToggler />
            </div>
          </div>
        </div>

        <MenuSidebar />
      </div>
    </>
  );
};

export default Navbar;
