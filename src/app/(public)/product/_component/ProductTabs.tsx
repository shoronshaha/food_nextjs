import type { Product } from "@/types/product";
import React from "react";
import { FiFileText, FiMessageSquare } from "react-icons/fi";

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  shortDescription?: string;
  longDescription?: string;
  stock: number;
  variantsCount: number;
  product?: Product;
}

export default function ProductTabs({
  activeTab,
  setActiveTab,
  shortDescription,
  longDescription,
  stock,
  variantsCount,
}: ProductTabsProps) {
  return (
    <div className="grid gap-4">
      {/* Nutrition & Benefits Section */}
      <div className="rounded-2xl bg-white dark:bg-earth-900 border-2 border-organic-200 dark:border-organic-900/30 shadow-organic overflow-hidden transition-all duration-300 hover:shadow-organic-lg hover:border-organic-300">
        <button
          onClick={() =>
            setActiveTab((prev) =>
              prev === "Short-Description" ? "" : "Short-Description"
            )
          }
          className="w-full flex items-center justify-between px-6 py-4 text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-organic-100 to-fresh-100 dark:from-organic-900/30 dark:to-fresh-900/30 text-organic-600 dark:text-organic-400 group-hover:scale-110 transition-transform">
              <FiMessageSquare size={22} />
            </div>
            <span className="font-bold text-lg text-earth-900 dark:text-earth-50 font-poppins">
              Nutrition & Benefits
            </span>
          </div>
          <div
            className={`p-2 rounded-full transition-all duration-300 ${
              activeTab === "Short-Description"
                ? "rotate-180 bg-organic-500 text-white"
                : "rotate-0 bg-organic-100 dark:bg-earth-800 text-organic-700 dark:text-organic-300"
            }`}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 320 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
            </svg>
          </div>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out border-t border-organic-200/50 dark:border-earth-700/50 ${
            activeTab === "Short-Description"
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {shortDescription && (
            <div className="px-6 py-4 text-base leading-relaxed text-earth-700 dark:text-earth-200 bg-gradient-to-b from-organic-50/30 to-white dark:from-earth-800 dark:to-earth-900">
              <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
            </div>
          )}
        </div>
      </div>

      {/* Ingredients & Details Section */}
      <div className="rounded-2xl bg-white dark:bg-earth-900 border-2 border-organic-200 dark:border-organic-900/30 shadow-organic overflow-hidden transition-all duration-300 hover:shadow-organic-lg hover:border-organic-300">
        <button
          onClick={() =>
            setActiveTab((prev) =>
              prev === "Long-Description" ? "" : "Long-Description"
            )
          }
          className="w-full flex items-center justify-between px-6 py-4 text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-fresh-100 to-organic-100 dark:from-fresh-900/30 dark:to-organic-900/30 text-fresh-600 dark:text-fresh-400 group-hover:scale-110 transition-transform">
              <FiFileText size={22} />
            </div>
            <span className="font-bold text-lg text-earth-900 dark:text-earth-50 font-poppins">
              Ingredients & Details
            </span>
          </div>
          <div
            className={`p-2 rounded-full transition-all duration-300 ${
              activeTab === "Long-Description"
                ? "rotate-180 bg-fresh-500 text-white"
                : "rotate-0 bg-fresh-100 dark:bg-earth-800 text-fresh-700 dark:text-fresh-300"
            }`}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 320 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
            </svg>
          </div>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out border-t border-organic-200/50 dark:border-earth-700/50 ${
            activeTab === "Long-Description"
              ? "max-h-[800px] opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {longDescription && (
            <div className="px-6 py-4 text-base leading-relaxed text-earth-700 dark:text-earth-200 bg-gradient-to-b from-fresh-50/30 to-white dark:from-earth-800 dark:to-earth-900">
              <div dangerouslySetInnerHTML={{ __html: longDescription }} />
            </div>
          )}
        </div>
      </div>

      {/* Social Share Section */}
      <div className="flex items-center gap-4 mt-2 px-2">
        <span className="text-sm font-semibold text-organic-700 dark:text-organic-400 uppercase tracking-wider flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share This Product:
        </span>
        <div className="flex gap-3 text-2xl text-organic-600 dark:text-organic-400">
          {/* Facebook */}
          <a
            rel="noopener noreferrer"
            href="https://facebook.com"
            target="_blank"
            className="hover:text-organic-700 dark:hover:text-organic-300 transition-colors"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Reviews placeholder */}
      <div className="rounded-2xl bg-white dark:bg-earth-900 border-2 border-organic-100 p-4 shadow-organic">
        <h4 className="text-lg font-semibold text-earth-900 dark:text-earth-100 mb-3">
          Customer Reviews
        </h4>
        <div className="space-y-3 text-sm text-earth-700 dark:text-earth-300">
          <p>
            No reviews yet — be the first to share your experience with this
            organic product.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-organic-600 text-white hover:bg-organic-700">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
