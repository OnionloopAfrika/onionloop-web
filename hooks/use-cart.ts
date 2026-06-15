"use client";

import { useState, useEffect } from "react";

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

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cashierCart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cashierCart", JSON.stringify(cart));
    window.dispatchEvent(
      new CustomEvent("cashierCartUpdate", { detail: cart }),
    );
  }, [cart]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cashierCart" && e.newValue) {
        setCart(JSON.parse(e.newValue));
      }
    };

    const handleCustomCartUpdate = (e: CustomEvent<CartItem[]>) => {
      setCart(e.detail);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "cashierCartUpdate",
      handleCustomCartUpdate as EventListener,
    );
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "cashierCartUpdate",
        handleCustomCartUpdate as EventListener,
      );
    };
  }, []);

  return { cart, setCart };
}
