interface ProductHeaderProps {
  name: string;
}

export function ProductHeader({ name }: ProductHeaderProps) {
  return (
    <div className="mt-6 font-poppins">
      {/* Organic Product Badge with Leaf Icon */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-organic-600 dark:text-organic-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-organic-100 to-fresh-100 dark:from-organic-900/30 dark:to-fresh-900/30 text-organic-700 dark:text-organic-300 border border-organic-300 dark:border-organic-700">
          🌿 Organic Product Details
        </span>
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-earth-900 dark:text-earth-light mt-2 break-words leading-tight">
        {name}
      </h1>

      {/* Brand / Origin row */}
      <div className="mt-3 flex items-center gap-4 text-sm text-earth-600 dark:text-earth-300">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-organic-50 border border-organic-100 text-organic-700">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3c0 2.21 2.686 4 6 4s6-1.79 6-4S13.314-1 9 0 5 0 5 3z" />
          </svg>
          <span>From Trusted Farms</span>
        </div>
        <div className="text-xs">
          <span className="font-semibold">Brand:</span>{" "}
          <span className="text-earth-700 dark:text-earth-200">
            {/* brand will be injected by parent */}
          </span>
        </div>
      </div>
    </div>
  );
}
