import type { Product } from "@/types/product";

interface HealthBenefitsProps {
  product: Product;
}

const TAG_BENEFITS: Record<string, string> = {
  "high-fiber": "Supports healthy digestion and sustained energy.",
  "vitamin-c": "Rich in Vitamin C to boost immunity.",
  "omega-3": "Good source of Omega-3 for heart health.",
  iron: "Helps maintain healthy blood iron levels.",
  "low-sugar": "Lower sugar content for balanced blood sugar.",
  probiotic: "Supports gut health and natural flora.",
};

export default function HealthBenefits({ product }: HealthBenefitsProps) {
  const tags = product.tags || [];

  const inferred: string[] = [];
  tags.forEach((t) => {
    const key = t.toLowerCase().replace(/\s+/g, "-");
    if (TAG_BENEFITS[key]) inferred.push(TAG_BENEFITS[key]);
  });

  // Always add a few generic organic benefits
  const generic = [
    "No synthetic pesticides or fertilizers used.",
    "Sustainably farmed with care for soil and pollinators.",
  ];

  const benefits =
    inferred.length > 0
      ? inferred.concat(generic)
      : generic.concat(["Naturally nutritious and high-quality produce."]);

  return (
    <div className="rounded-2xl bg-white dark:bg-earth-900 border-2 border-organic-100 p-4 shadow-organic animate-fade-in-up">
      <h4 className="text-lg font-semibold text-earth-900 dark:text-earth-100 mb-2">
        Health Benefits
      </h4>
      <ul className="list-none space-y-2 text-sm text-earth-700 dark:text-earth-300">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-organic-600 mt-1 flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
