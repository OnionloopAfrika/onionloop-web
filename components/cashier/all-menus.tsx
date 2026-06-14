"use client";

import Image from "next/image";
import { AddedToCart, AddToCart } from "../icons/svgs";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  stock: string;
  image: string;
  isAdded: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Coca-cola",
    price: "₦500",
    stock: "60 in stock",
    image: "/images/coke.svg",
    isAdded: true,
  },
  {
    id: "2",
    name: "Sprite Drink",
    price: "₦500",
    stock: "60 in stock",
    image: "/images/ice-cream.svg",
    isAdded: false,
  },
  {
    id: "3",
    name: "Pepsi Drink",
    price: "₦500",
    stock: "60 in stock",
    image: "/images/pepsi.svg",
    isAdded: false,
  },
  {
    id: "4",
    name: "Monster Drink",
    price: "₦3,000",
    stock: "60 in stock",
    image: "/images/monster.svg",
    isAdded: false,
  },
  {
    id: "5",
    name: "Ice cream",
    price: "₦5,000",
    stock: "60 in stock",
    image: "/images/ice-cream.svg",
    isAdded: false,
  },
  {
    id: "6",
    name: "Bottle Fanta",
    price: "₦500",
    stock: "60 in stock",
    image: "/images/fanta.svg",
    isAdded: true,
  },
  {
    id: "7",
    name: "Coca-cola",
    price: "₦500",
    stock: "60 in stock",
    image: "/images/coke.svg",
    isAdded: true,
  },
  {
    id: "8",
    name: "Sprite Drink",
    price: "₦500",
    stock: "60 in stock",
    image: "/images/ice-cream.svg",
    isAdded: false,
  },
  {
    id: "9",
    name: "Pepsi Drink",
    price: "₦500",
    stock: "60 in stock",
    image: "/images/pepsi.svg",
    isAdded: false,
  },
];

export default function AllMenus() {
  const { cart, setCart } = useCart();
  const router = useRouter();

  const isInCart = (id: string) => cart.some((item) => item.id === id);

  const toggleCartItem = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className="w-full grid grid-cols-5 gap-[16.77px]">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="gap-[6.67px] flex flex-col justify-between p-[10px] rounded-[5px] bg-[white]"
        >
          <div
            onClick={() =>
              router.push(`/mega/cashier/new-order/product/${item.id}`)
            }
            className="h-[124.99px] w-full relative cursor-pointer"
          >
            <Image
              src={item.image}
              fill
              alt={item.name}
              className="object-contain"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="space-y-[4px]">
              <p className="font-[600] text-[20px] text-[#131313]">
                {item.name}
              </p>
              <p className="font-[500] text-[15px] text-[#6C6C6C]">
                {item.price}
              </p>
            </div>

            <button onClick={() => toggleCartItem(item)}>
              {isInCart(item.id) ? (
                <AddedToCart className="text-primary-color " />
              ) : (
                <AddToCart className="cursor-pointer" />
              )}
            </button>
          </div>

          <p className="font-[400] text-[13.33px] text-[#04907E]">
            {item.stock}
          </p>
        </div>
      ))}
    </div>
  );
}
