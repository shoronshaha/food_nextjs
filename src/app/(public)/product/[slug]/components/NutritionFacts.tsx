import type { Product } from "@/types/product";

interface NutritionFactsProps {
  product: Product;
}

export default function NutritionFacts({ product }: NutritionFactsProps) {
  const sizeGuard = (product as any).sizeGuard;

  if (
    sizeGuard &&
    Array.isArray(sizeGuard.table) &&
    sizeGuard.table.length > 0
  ) {
    const headers: string[] = sizeGuard.headers || [];
    return (
      <div className="rounded-lg border border-organic-100 p-3 bg-white dark:bg-earth-900">
        <h4 className="text-sm font-semibold text-earth-900 dark:text-earth-100 mb-2">
          Nutrition Facts
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-earth-700 dark:text-earth-300">
            {headers.length > 0 && (
              <thead>
                <tr>
                  {headers.map((h: string, idx: number) => (
                    <th key={idx} className="py-2 text-left font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {sizeGuard.table.map((row: string[], rIdx: number) => (
                <tr
                  key={rIdx}
                  className={rIdx % 2 === 0 ? "bg-organic-50/40" : ""}
                >
                  {row.map((cell: string, cIdx: number) => (
                    <td key={cIdx} className="py-2 pr-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Fallback: show helpful nutrition tips and encourage users to check packaging
  return (
    <div className="rounded-lg border border-organic-100 p-3 bg-white dark:bg-earth-900">
      <h4 className="text-sm font-semibold text-earth-900 dark:text-earth-100 mb-2">
        Nutrition Facts
      </h4>
      <p className="text-sm text-earth-700 dark:text-earth-300 mb-2">
        Nutrition facts vary between batches and servings. Check the product
        packaging for exact values.
      </p>
      <ul className="text-sm text-earth-700 dark:text-earth-300 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <li className="inline-flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-organic-600 mt-1" /> Rich in
          natural vitamins & minerals
        </li>
        <li className="inline-flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-organic-600 mt-1" /> No
          synthetic preservatives
        </li>
        <li className="inline-flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-organic-600 mt-1" /> Higher
          antioxidant potential
        </li>
        <li className="inline-flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-organic-600 mt-1" /> Great
          source of natural fiber
        </li>
      </ul>
    </div>
  );
}
