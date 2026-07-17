"use client";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductTable } from "@/components/inventory/product-table";
import { Product } from "@/types/inventory/type";
import { useEffect, useState } from "react";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Milk",
    category: "Dairy",
    unit: "litre",
    price: 1200,
    quantity: 0,
    lowStock: 3,
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Rice",
    category: "Grains",
    unit: "bag",
    price: 35000,
    quantity: 0,
    lowStock: 1,
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Bread",
    category: "Bakery",
    unit: "loaf",
    price: 300,
    quantity: 0,
    lowStock: 5,
    expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export default function page() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    localStorage.setItem("outOfStockProducts", JSON.stringify(products));
  }, [products]);

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <div className="space-y-[24px]">
      <Breadcrumb firstTab="inventory" secondTab="Out of stock" />
      <ProductTable
        products={products}
        onProductUpdated={handleUpdateProduct}
        onProductDeleted={handleDeleteProduct}
      />
    </div>
  );
}
