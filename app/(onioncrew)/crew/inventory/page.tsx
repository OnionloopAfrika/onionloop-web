"use client";

import { DangerIcon, MultiplyIcon } from "@/components/icons/svgs";
import { EmptyProducts } from "@/components/inventory/empty-product";
import { InventoryStats } from "@/components/inventory/inventory-stats";
import { ProductTable } from "@/components/inventory/product-table";
import { Warning } from "@/components/inventory/warning";
import { initialProducts, warning } from "@/lib/mockdata/inventory";
import { Product } from "@/types/inventory/type";
import { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing products:", error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setOpen(false);
  };

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
    <div className="min-h-screen w-full">
      {products.length === 0 ? (
        <EmptyProducts
          open={open}
          setOpen={setOpen}
          onProductAdded={handleAddProduct}
        />
      ) : (
        <div className="space-y-[42px]">
          {/* <div className="space-y-[16px]">
            {warning.map((items, i) => (
              <Warning
                icon={
                  <div className=" w-[24px] h-[24px] flex justify-center items-center bg-[#FEF6E7] rounded-[8px] border border-[#FBE2B7]">
                    <DangerIcon className="w-[9px] h-[8.5px] text-[#DD900D]" />
                  </div>
                }
                text={items.warning}
                cancel={
                  <MultiplyIcon className="w-[20px] h-[20px] text-[#DD900D]" />
                }
              />
            ))}
          </div> */}

          <InventoryStats onProductAdded={handleAddProduct} />

          <ProductTable
            products={products}
            onProductUpdated={handleUpdateProduct}
            onProductDeleted={handleDeleteProduct}
          />
        </div>
      )}
    </div>
  );
};

export default page;
