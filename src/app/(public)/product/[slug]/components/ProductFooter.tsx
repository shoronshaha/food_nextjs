import { Button } from "@/components/ui/atoms/button";
import { CartSheet } from "@/components/ui/organisms/cart-sheet";
import { WishlistSheet } from "@/components/ui/organisms/WishlistSheet";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

interface ProductFooterProps {
  productId: string;
  isPreOrder: boolean;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onAddToCart: () => boolean;
  buttonText: string;
  buttonTitle: string;
}

export function ProductFooter({
  productId,
  isPreOrder,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
  buttonText,
  buttonTitle,
}: ProductFooterProps) {
  const { items: cartItems } = useCart();
  const { items: wishItems } = useWishlist();

  return (
    <>
      <div className="fixed bottom-16 left-2 z-50 md:hidden max-w-[56px] bg-primary p-3 rounded-full shadow-lg">
        <Link href="/">
          <FaHome className="h-6 w-6 text-white" />
        </Link>
      </div>

      {!isPreOrder && wishItems.length > 0 && (
        <div className="fixed bottom-16 right-2 z-50 md:hidden flex flex-col gap-2 items-end max-w-[56px] bg-secondary/10 p-2 rounded-lg border border-secondary/20 shadow-sm">
          <WishlistSheet />
        </div>
      )}

      <div className="flex items-center gap-1">
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t border-earth-200 lg:hidden z-50 bg-base/90 dark:bg-earth-900/90">
          <div className="flex items-center justify-between p-3 gap-3 bg-transparent">
            {!isPreOrder && (
              <div className="pl-1">
                <button
                  onClick={onWishlistToggle}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    isWishlisted
                      ? "text-primary border-primary/20 bg-primary/10"
                      : "text-earth-700 border-secondary/20 bg-secondary/10 hover:bg-secondary/20"
                  }`}
                >
                  <FiHeart
                    size={20}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>
            )}
            <Button
              title={buttonTitle}
              className={`flex-1 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-14 text-base font-bold rounded-full ${
                isPreOrder
                  ? "bg-primary/90 text-white"
                  : "bg-primary text-white"
              }`}
              variant={isPreOrder ? "default" : "custom"}
              onClick={onAddToCart}
              size="md"
            >
              {buttonText}
            </Button>
            {!isPreOrder && cartItems.length > 0 && (
              <div className="w-12 h-12 bg-primary p-1 rounded-full aspect-square shadow-lg transform-gpu">
                <CartSheet />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
