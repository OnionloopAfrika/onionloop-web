"use client";

import {
  DangerIcon,
  MultiplyIcon,
  VerifyIcon,
} from "@/components/icons/svgs";
import { EmptyProducts } from "@/components/inventory/empty-product";
import { InventoryStats } from "@/components/inventory/inventory-stats";
import { ProductTable } from "@/components/inventory/product-table";
import { Warning } from "@/components/inventory/warning";
import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { initialProducts } from "@/lib/mockdata/inventory";
import { Product } from "@/types/inventory/type";
import { useEffect, useState } from "react";

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [savedProductName, setSavedProductName] = useState<string | null>(null);

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
          onProductSaved={setSavedProductName}
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

          <InventoryStats
            onProductAdded={handleAddProduct}
            onProductSaved={setSavedProductName}
          />
          <Warning
            icon={
              <div className=" w-[24px] h-[24px] flex justify-center items-center bg-[#FEF6E7] rounded-[8px] border border-[#FBE2B7]">
                <DangerIcon className="w-[9px] h-[8.5px] text-[#DD900D]" />
              </div>
            }
            text="3 products are running low on stock — restock soon to avoid disruptions."
            cancel={
              <MultiplyIcon className="w-[20px] h-[20px] text-[#DD900D]" />
            }
          />

          <ProductTable
            products={products}
            onProductUpdated={handleUpdateProduct}
            onProductDeleted={handleDeleteProduct}
          />
        </div>
      )}
      <Modal
        open={savedProductName !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSavedProductName(null);
        }}
      >
        <div className="space-y-[64px]">
          <div className="space-y-[40px]">
            <VerifyIcon className="mx-auto text-light" />
            <div className="space-y-[8px] text-center">
              <p className="font-[600] text-[24px] text-light">
                Product saved successfully!
              </p>
              <p className="font-[500] text-[16px] text-[#363636]">
                {savedProductName} has been added to the food items
              </p>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[362px] justify-center">
            <Button
              onClick={() => setSavedProductName(null)}
              size="sm"
              className="!bg-[#004E46] !text-white"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryPage;
