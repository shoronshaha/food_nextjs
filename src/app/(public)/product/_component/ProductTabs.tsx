import React from "react";
import {
  FiMessageSquare,
  FiFileText,
  FiShield,
  FiTruck,
  FiInfo,
  FiHome
} from "react-icons/fi";

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  shortDescription?: string;
  longDescription?: string;
  stock: number;
  variantsCount: number;
}

export default function ProductTabs({
  activeTab,
  setActiveTab,
  shortDescription,
  longDescription,
  stock,
  variantsCount
}: ProductTabsProps) {
  return (
      <div className="grid gap-4">
        {/* Short Description Section */}
        <div className="rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          <button
            onClick={() =>
              setActiveTab((prev) =>
                prev === "Short-Description" ? "" : "Short-Description"
              )
            }
            className="w-full flex items-center justify-between px-6 py-4 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                <FiMessageSquare size={20} />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Flavor Profile
              </span>
            </div>
            <div className={`p-2 rounded-full bg-white/50 dark:bg-gray-800/50 transition-all duration-300 ${activeTab === "Short-Description" ? "rotate-180 bg-orange-500 text-white" : "rotate-0 text-gray-500"}`}>
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
            className={`transition-all duration-300 ease-in-out border-t border-gray-100/50 dark:border-gray-800/50 ${activeTab === "Short-Description" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              }`}
          >
            {shortDescription && (
              <div className="px-6 py-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
              </div>
            )}
          </div>
        </div>

        {/* Long Description Section */}
        <div className="rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          <button
            onClick={() =>
              setActiveTab((prev) => (prev === "Long-Description" ? "" : "Long-Description"))
            }
            className="w-full flex items-center justify-between px-6 py-4 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <FiFileText size={20} />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Ingredients & Details
              </span>
            </div>
            <div className={`p-2 rounded-full bg-white/50 dark:bg-gray-800/50 transition-all duration-300 ${activeTab === "Long-Description" ? "rotate-180 bg-blue-500 text-white" : "rotate-0 text-gray-500"}`}>
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
            className={`transition-all duration-300 ease-in-out border-t border-gray-100/50 dark:border-gray-800/50 ${activeTab === "Long-Description" ? "max-h-[800px] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"
              }`}
          >
            {longDescription && (
              <div className="px-6 py-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: longDescription }} />
              </div>
            )}
          </div>
        </div>

        {/* Social Share Section */}
        <div className="flex items-center gap-4 mt-2 px-2">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Share:</span>
            <div className="flex gap-3 text-2xl text-gray-400 dark:text-gray-500">
               {/* Facebook */}
               <a rel="noopener noreferrer" href="https://facebook.com" target="_blank">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
               </a>
            </div>
        </div>
      </div>
  );
}
