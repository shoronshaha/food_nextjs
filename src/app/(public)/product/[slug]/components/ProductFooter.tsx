import React from "react";
import { FaHome } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/ui/atoms/button";
import { CartSheet } from "@/components/ui/organisms/cart-sheet";
import { WishlistSheet } from "@/components/ui/organisms/WishlistSheet";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

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
            <div className="fixed bottom-16 left-2 z-50 md:hidden max-w-[50px] bg-primary p-2 rounded-full">
                <Link href="/">
                    <FaHome className="h-6 w-6 text-white" />
                </Link>
            </div>

            {(!isPreOrder && wishItems.length > 0) && (
                <div className="fixed bottom-16 right-2 z-50 md:hidden flex flex-col gap-2 items-end max-w-[50px] bg-secondary p-2 rounded-full">
                    <WishlistSheet />
                </div>
            )}

            <div className="flex items-center gap-1">
                <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:hidden z-50 bg-white/80 dark:bg-black/80">
                    <div className="flex items-center justify-between p-2 gap-3 bg-transparent">
                        {!isPreOrder && (
                            <div className="pl-1">
                                <button
                                    onClick={onWishlistToggle}
                                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                    className={`p-2.5 rounded-full border transition-all duration-300 ${isWishlisted ? "text-red-500 border-red-200 bg-red-50" : "text-gray-400 border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                                >
                                    <FiHeart size={22} fill={isWishlisted ? "#ef4444" : "none"} />
                                </button>
                            </div>
                        )}
                        <Button
                            title={buttonTitle}
                            className={`flex-1 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-12 text-base font-bold rounded-full ${isPreOrder ? "bg-gradient-to-r from-orange-500 to-red-600" : ""}`}
                            variant={isPreOrder ? "default" : "custom"}
                            onClick={onAddToCart}
                            size="md"
                        >
                            {buttonText}
                        </Button>
                        {!isPreOrder && cartItems.length > 0 && (
                            <div className="max-w-10 bg-gradient-to-tr from-orange-500 to-red-500 p-0.5 rounded-full aspect-square shadow-lg animate-in zoom-in duration-300">
                                <CartSheet />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}