"use client";

import { useState } from "react";
import {
  AddToCart,
  DeleteFromCart,
  DragBtn,
  RemoveFromCart,
} from "../icons/svgs";
import Image from "next/image";
import { OrderSummary, TotalAmount } from "../order-summary";
import Button from "../ui/button";
import { useCart } from "@/hooks/use-cart";
import OrderDetails from "./order-details";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  stock: string;
  image: string;
  isAdded: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const parsePrice = (price: string): number => {
  return Number(price.replace(/₦|,/g, ""));
};

export function ConfirmOrder() {
  const { cart, setCart } = useCart();
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotals = () => {
    const subTotal = cart.reduce((sum, item) => {
      return sum + parsePrice(item.price) * item.quantity;
    }, 0);
    const vat = subTotal * 0.075;
    const total = subTotal + vat;
    return {
      subTotal: `₦${subTotal.toLocaleString()}.00`,
      vat: `₦${vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      total: `₦${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };
  };

  const totals = calculateTotals();

  const handleGenerateQrCode = () => {
    setShowOrderDetails(true);
  };

  if (showOrderDetails) {
    return <OrderDetails />;
  }

  return (
    <div className="space-y-[40px]">
      <SummaryHeader title="Confirm Order" />

      <div className="bg-white rounded-[8px] p-[24px] shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <div className="flex justify-between items-center">
          <p className="font-[500] text-[18px] text-[#686764]">
            Cart({cart.length})
          </p>
          <button
            onClick={clearCart}
            className="font-[500] text-[14px] text-[#CB1A14]"
          >
            Clear cart
          </button>
        </div>

        <div className="space-y-[16px] ">
          {cart.map((cartItem) => (
            <div
              key={cartItem.id}
              className="pb-[4px] border-b border-b-[#C7C7C7] flex justify-between items-center"
            >
              <div className="flex items-center gap-[8px]">
                <div className="w-[48px] h-[80px] relative">
                  <Image
                    src={cartItem.image}
                    fill
                    alt={cartItem.name}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-[2px]">
                  <p className="font-[500] text-[16px] text-[#363636] flex items-center gap-[2px]">
                    {cartItem.name} |{" "}
                    <span className="text-[#6C6C6C]">35cl</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[8px]">
                <button onClick={() => updateQuantity(cartItem.id, -1)}>
                  <RemoveFromCart className="w-[24px] h-[24px]" />
                </button>
                <span>X{cartItem.quantity}</span>
                <button onClick={() => updateQuantity(cartItem.id, 1)}>
                  <AddToCart className="w-[24px] h-[24px]" />
                </button>
              </div>

              <button onClick={() => removeItem(cartItem.id)}>
                <DeleteFromCart />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-[16px]">
        <p className="font-[600] text-[20px] text-[#131313]">Order Summary</p>

        <div className="space-y-[24px] bg-white rounded-[8px] shadow-[0_0_15px_rgba(0,0,0,0.15)] py-[12px] px-[16px]">
          <OrderSummary item="Sub Total:" value={totals.subTotal} />
          <OrderSummary item="VAT (7.5%):" value={totals.vat} />
          <OrderSummary item="Discount" value="-" />

          <TotalAmount total="Total Amount" amount={totals.total} />
        </div>
      </div>

      <div className="p-[16px] space-y-[24px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <DragBtn className="mx-auto" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Button variant="cashierOutline" size="cashierOutline">
            Other Banks
          </Button>
          <Button
            variant="cashierSolid"
            size="cashierOutline"
            onClick={handleGenerateQrCode}
          >
            Generate QR Code
          </Button>
        </div>
      </div>
    </div>
  );
}

type HeaderType = {
  title: string;
  className?: string;
};

export const SummaryHeader = ({ title, className = " " }: HeaderType) => {
  return (
    <p className={`font-[600] text-[20px] text-[#363636]  ${className}`}>
      {title}
    </p>
  );
};
