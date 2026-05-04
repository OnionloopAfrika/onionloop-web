import React, { Dispatch, SetStateAction } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  quantity: number;
  expiryDate?: string;
  lowStock?: number;
  image?: string;
  createdAt: string;
}

export interface ProductFormState {
  productName: string;
  category: string;
  unit: string;
  price: string;
  quantity: string;
  selectedDate: Date | undefined;
  lowStockThreshold: string;
  imageBase64: string;
}

export interface AddProductProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onProductAdded?: (product: Product) => void;
}

export interface WarningProps {
  icon?: React.ReactNode;
  text?: string;
  cancel?: React.ReactNode;
  warning?: string;
}

export interface InventoryStatProps {
  icon: React.ElementType;
  figure: string;
  desc: string;
  action: string;
}
