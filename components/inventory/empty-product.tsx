"use client";

import Image from "next/image";
import { AddIcon, NoProductsIcon } from "../icons/svgs";
import Button from "../ui/button";
import { AddProductProps } from "@/types/inventory/type";
import { Modal } from "../ui/modal";
import { AddProductForm } from "./add-product-form";
import { Product } from "@/types/inventory/type";

export function EmptyProducts({
  open,
  setOpen,
  onProductAdded,
}: AddProductProps) {
  const handleAddProduct = (product: Product) => {
    onProductAdded?.(product);
    setOpen(false);
  };

  return (
    <>
      <div className="w-full pt-[20px] h-full flex justify-center items-start">
        <div className="max-w-[836px] flex flex-col items-center gap-[42px]">
          <div className="space-y-[24px] flex flex-col items-center">
            <NoProductsIcon />

            <div className="text-center space-y-[16px]">
              <p className="font-[500] text-[24px] text-[#131313]">
                No products Yet
              </p>
              <p className="font-[400] text-[14px] text-[#6C6C6C]">
                Start adding products to manage your inventory and enable sales
              </p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="primary" size="save">
            <AddIcon /> Add Product
          </Button>
        </div>
      </div>

      <Modal
        className="overflow-y-scroll max-h-[90%]"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="">
          <AddProductForm onProductAdded={handleAddProduct} />
        </div>
      </Modal>
    </>
  );
}
