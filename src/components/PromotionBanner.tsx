"use client";


import Link from "next/link";
import Image from "./ui/atoms/image";

export default function PromotionBanner() {
  return (
    <div className="bg-white dark:bg-black px-4 md:px-8 py-8 md:py-12 mt-0 mb-0">
      <div className="bg-orange-50 dark:bg-gray-800 rounded-3xl w-full relative overflow-hidden shadow-lg border border-orange-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[500px]">
          
          {/* Left Side: Text Content */}
          <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left px-6 md:px-12 lg:px-20 py-10 z-10">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-orange-600 uppercase bg-orange-100 rounded-full w-fit mx-auto md:mx-0">
              Hungry?
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight font-urbanist text-gray-900 dark:text-white mb-6">
              Delicious Food <br />
              <span className="text-primary italic">Delivered!</span>
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Order your favorite meals from top local restaurants. Fresh ingredients, hot delivery, and satisfaction guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/products"
                className="inline-flex justify-center items-center bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
              >
                Order Now 
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex justify-center items-center bg-white dark:bg-gray-700 hover:bg-gray-50 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-gray-500 text-sm font-medium">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div> 30 Min Delivery
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div> Free Shipping
               </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="md:col-span-5 relative h-64 md:h-full min-h-[300px] md:min-h-[500px] w-full">
             <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
                  {/* Decorative blobs */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-200/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                  
                  <Image
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
                    alt="Delicious Food"
                    fill
                    className="object-cover md:object-contain drop-shadow-2xl animate-float-1 z-10 rounded-2xl md:rounded-none"
                    priority
                    variant="large"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl z-20 animate-bounce delay-700 hidden md:block">
                     <span className="text-2xl">🔥</span>
                     <span className="font-bold text-sm ml-1">Hot!</span>
                  </div>
                   <div className="absolute bottom-10 left-0 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl z-20 animate-bounce delay-1000 hidden md:block">
                     <span className="text-2xl">⭐</span>
                     <span className="font-bold text-sm ml-1">4.9</span>
                  </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>




  );
}
