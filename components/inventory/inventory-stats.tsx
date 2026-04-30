"use client";

import { inventoryStats } from "@/lib/mockdata/inventory";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import { Modal } from "../ui/modal";
import { AddProductForm } from "./add-product-form";
import { Product } from "@/types/inventory/type";
import { useState } from "react";

export function InventoryStats({
  onProductAdded,
}: {
  onProductAdded?: (product: Product) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleAddProduct = (product: Product) => {
    onProductAdded?.(product);
    setOpen(false);
  };
  return (
    <>
      <div className="space-y-[42px]">
        <ProfileHeader
          className="border-b-0"
          title="Inventory"
          subtitle="Manage your products and stock levels"
          btn={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]  max-w-[341px]">
              <Button className="bg-white" variant="secondary">
                Export
              </Button>
              <Button onClick={() => setOpen(true)}>Add product</Button>
            </div>
          }
        />

        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
          {inventoryStats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <div className="rounded-[6px] bg-white space-y-[16px] p-[16px] shadow-[0_0_15px_rgba(0,0,0,0.15)]">
                <div>
                  <div className="space-y-[24px]">
                    <div
                      className={`w-[40px] h-[40px] rounded-[8px]  flex justify-center items-center
                    ${
                      stat.desc === "Total products"
                        ? "bg-[#E7F6EC] text-[#04802E]"
                        : stat.desc === "Low stock items"
                          ? "bg-[#FEF6E7] text-[#DD900D]"
                          : stat.desc === "Out of stock"
                            ? "bg-[#FBEAE9] text-[#CB1A14]"
                            : ""
                    }  `}
                    >
                      <Icon className="w-[24px] h-[24px] " />
                    </div>

                    <p className="font-[600] text-[36px] text-[#000000]">
                      {stat.figure}
                    </p>
                  </div>

                  <p className="font-[400] text-[14px] text-[#6C6C6C]">
                    {stat.desc}
                  </p>
                </div>

                <span
                  className={` rounded-[8px] flex  items-center font-[500] text-[10px] w-fit py-[5px] px-[7px]
                    ${
                      stat.desc === "Total products"
                        ? "bg-[#E7F6EC] text-[#04802E]"
                        : stat.desc === "Low stock items"
                          ? "bg-[#FEF6E7] text-[#DD900D]"
                          : stat.desc === "Out of stock"
                            ? "bg-[#FBEAE9] text-[#CB1A14]"
                            : ""
                    }  `}
                >
                  {stat.action}
                </span>
              </div>
            );
          })}
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
