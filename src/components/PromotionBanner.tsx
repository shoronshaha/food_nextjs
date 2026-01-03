"use client";

import Link from "next/link";
import Image from "./ui/atoms/image";

export default function PromotionBanner() {
  return (
    <div className="bg-base dark:bg-earth-900 px-4 md:px-8 py-8 md:py-12 mt-0 mb-0">
      <div className="bg-organic-50 dark:bg-earth-800 rounded-3xl w-full relative overflow-hidden shadow-organic border border-organic-100 dark:border-earth-700">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[480px] md:min-h-[520px]">
          {/* Left Side: Text Content */}
          <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left px-6 md:px-12 lg:px-20 py-10 z-10">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-organic-700 uppercase bg-organic-100 rounded-full w-fit mx-auto md:mx-0">
              Farm Fresh
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-poppins text-earth-900 dark:text-earth-light mb-6">
              Farm-Fresh Organic
              <br />
              <span className="text-organic-700 italic">
                Direct to Your Door
              </span>
            </h1>

            <p className="text-earth-600 dark:text-earth-light text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Shop seasonal, sustainably-grown produce and organic ready meals
              from trusted local farms. Pure, natural, and nutritious.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/products"
                className="inline-flex justify-center items-center bg-organic-600 hover:bg-organic-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-organic transform hover:-translate-y-0.5"
              >
                Shop Now
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex justify-center items-center bg-white dark:bg-gray-700 hover:bg-gray-50 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-earth-600 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-organic-600"></div>{" "}
                Seasonal & Organic
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-organic-600"></div>{" "}
                Sustainably Sourced
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="md:col-span-5 relative h-64 md:h-full min-h-[300px] md:min-h-[500px] w-full">
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="relative w-full h-full max-w-[560px] max-h-[560px]">
                {/* Decorative soft leaf blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-organic-200/40 rounded-full blur-3xl opacity-60 animate-light-up-down"></div>

                <Image
                  src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=2000&auto=format&fit=crop"
                  alt="Fresh produce"
                  fill
                  className="object-cover md:object-contain drop-shadow-2xl animate-leaf-float z-10 rounded-2xl md:rounded-none"
                  priority
                  variant="large"
                />
                {/* Small trust badges */}
                <div className="absolute bottom-8 left-6 bg-white/90 dark:bg-earth-800/80 p-3 rounded-2xl shadow-lg z-20 hidden md:flex items-center gap-3">
                  <img
                    src="/assets/icons/usda.png"
                    alt="USDA Organic"
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <div className="text-sm font-semibold text-earth-900 dark:text-earth-light">
                      Certified Organic
                    </div>
                    <div className="text-xs text-earth-600">USDA / Non-GMO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
