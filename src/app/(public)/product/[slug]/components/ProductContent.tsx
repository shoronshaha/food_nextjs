import type { Product, Variant } from "@/types/product";
import { MediaItem } from "../../_component/MediaGallery";
import ProductPricing from "../../_component/ProductPricing";
import ProductTabs from "../../_component/ProductTabs";
import QuantityControls from "../../_component/QuantityControls";
import { ProductHeader } from "./ProductHeader";

interface ProductContentProps {
  product: Product;
  selectedVariant: Variant | null;
  quantity: number;
  stock: number;
  finalPrice: number;
  sellingPrice: number;
  discountPercent: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  isPreOrder: boolean;
  isDiscountActive: boolean;
  activeTab: string;
  allMedia: MediaItem[];
  onQuantityChange: (val: number) => void;
  onAddToCart: () => boolean;
  onVariantMissing: () => void;
  onWishlistVariantMissing: () => void;
  setActiveTab: (tab: string | ((prevState: string) => string)) => void;
}

export function ProductContent({
  product,
  selectedVariant,
  quantity,
  stock,
  finalPrice,
  sellingPrice,
  discountPercent,
  discountStartDate,
  discountEndDate,
  isPreOrder,
  isDiscountActive,
  activeTab,
  allMedia,
  onQuantityChange,
  onAddToCart,
  onVariantMissing,
  onWishlistVariantMissing,
  setActiveTab,
}: ProductContentProps) {
  return (
    <div
      className={`w-full lg:max-w-[700px] lg:w-full px-2 md:px-4 lg:col-span-5 ${
        allMedia.length === 2
          ? ""
          : "md:sticky md:top-24 md:self-start md:h-fit"
      }`}
    >
      <ProductHeader name={product.name} />

      <ProductPricing
        finalPrice={finalPrice}
        sellingPrice={sellingPrice}
        stock={stock}
        discountPercent={discountPercent}
        isDiscountActive={isDiscountActive}
        discountStartDate={discountStartDate?.toISOString()}
        discountEndDate={discountEndDate?.toISOString()}
        product={product}
      />

      <div className="md:pb-2">
        <QuantityControls
          quantity={quantity}
          stock={stock}
          onQuantityChange={onQuantityChange}
          product={product}
          variant={selectedVariant}
          isDiscountActive={isDiscountActive}
          finalPrice={finalPrice}
          sellingPrice={sellingPrice}
          onAddToCart={onAddToCart}
          onVariantMissing={onVariantMissing}
          onWishlistVariantMissing={onWishlistVariantMissing}
          buttonText={isPreOrder ? "Pre-Order Now" : "Order Now"}
          buttonTitle={isPreOrder ? "Pre-order dish" : "Add to Order"}
        />
      </div>

      {/* Why Choose Organic - visual section */}
      <div className="mt-6 rounded-2xl border-2 border-secondary/20 bg-secondary/5 dark:bg-gray-900 p-4 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Why Choose Organic?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Organic farming avoids synthetic pesticides and fertilizers, preserves
          soil health, and delivers produce with better flavor and nutrition.
          Supporting organic also helps local farmers and the environment.
        </p>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" /> Non-GMO
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" /> Sustainably
            Sourced
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" /> No Artificial
            Additives
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" /> Better for Soil
            & Pollinators
          </li>
        </ul>
      </div>

      <ProductTabs
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shortDescription={product.short_description}
        longDescription={product.long_description}
        stock={stock}
        variantsCount={product.variantsId.length}
      />
    </div>
  );
}
