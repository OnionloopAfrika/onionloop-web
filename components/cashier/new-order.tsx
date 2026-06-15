"use client";

import { ConfirmOrder } from "./confirm-order";
import { TodaysMenu } from "./todays-menu";
import { useCart } from "@/hooks/use-cart";

export default function NewOrder() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <TodaysMenu />;
  }

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-[40px]">
      <TodaysMenu />
      <ConfirmOrder />
    </div>
  );
}
