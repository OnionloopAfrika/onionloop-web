"use client";

import { ConfirmOrder } from "@/components/cashier/confirm-order";
import ProductDetailsPage from "@/components/cashier/product-details-page";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export default function Page() {
  const { cart } = useCart();
  const [showConfirmOrderOnMobile, setShowConfirmOrderOnMobile] =
    useState(false);

  if (cart.length > 0 && !showConfirmOrderOnMobile) {
    setShowConfirmOrderOnMobile(true);
  }

  if (cart.length === 0) {
    return <ProductDetailsPage params={{ id: "1" }} />;
  }

  return (
    <>
      <div className="hidden lg:grid lg:grid-cols-[2fr_1fr] lg:gap-[40px]">
        <ProductDetailsPage params={{ id: "1" }} />
        <ConfirmOrder />
      </div>
      <div className="md:hidden">
        {showConfirmOrderOnMobile ? (
          <ConfirmOrder
            showBackButton
            onBack={() => setShowConfirmOrderOnMobile(false)}
          />
        ) : (
          <ProductDetailsPage params={{ id: "1" }} />
        )}
      </div>
    </>
  );
}
