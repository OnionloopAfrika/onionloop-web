"use client";

import { ConfirmOrder } from "./confirm-order";
import { TodaysMenu } from "./todays-menu";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export default function NewOrder() {
  const { cart } = useCart();
  const [showConfirmOrderOnMobile, setShowConfirmOrderOnMobile] =
    useState(false);

  const shouldShowConfirmOrderMobile =
    cart.length > 0 && showConfirmOrderOnMobile;

  if (cart.length > 0 && !showConfirmOrderOnMobile) {
    setShowConfirmOrderOnMobile(true);
  }

  if (cart.length === 0) {
    return <TodaysMenu />;
  }

  return (
    <>
      <div className="hidden md:grid md:grid-cols-[2fr_1fr] md:gap-[40px]">
        <TodaysMenu />
        <ConfirmOrder />
      </div>
      <div className="md:hidden">
        {shouldShowConfirmOrderMobile ? (
          <ConfirmOrder
            showBackButton
            onBack={() => setShowConfirmOrderOnMobile(false)}
          />
        ) : (
          <TodaysMenu />
        )}
      </div>
    </>
  );
}
