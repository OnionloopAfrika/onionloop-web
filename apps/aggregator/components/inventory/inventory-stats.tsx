"use client";

import { inventoryStats } from "@/lib/mockdata/inventory";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import { Modal } from "../ui/modal";
import { AddProductForm } from "./add-product-form";
import { Product } from "@/types/inventory/type";
import { useState } from "react";
import { DownloadIcon, DownloadIconSolid, PlusIcon } from "../icons/svgs";

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
      <div className="space-y-[16px]">
        <ProfileHeader
          className="flex-col md:flex-row gap-4 justify-between items-start border-b-0 pb-[0px]"
          title="Inventory"
          subtitle="Manage your products and stock levels"
          btn={
            <div className="grid grid-cols-2 gap-[20px]">
              <Button className="bg-white" size="md" variant="outline">
                <DownloadIconSolid className="" /> Export
              </Button>
              <Button variant="primary" size="md" onClick={() => setOpen(true)}>
                <PlusIcon /> Add product
              </Button>
            </div>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
          {inventoryStats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <div
                key={i}
                className="bg-white p-[12px] rounded-[8px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <p className="font-[600] text-[20px] text-[#111827] leading-none tracking-tight font-sans">
                    {stat.figure}
                  </p>

                  <div
                    className={`p-2 rounded-[8px] flex justify-center items-center ${stat.desc === "Total products"
                        ? "bg-[#C2EAD0] text-[#04802E]"
                        : stat.desc === "Low stock items"
                          ? "bg-[#FEF6E7] text-[#DD900D]"
                          : stat.desc === "Out of stock"
                            ? "bg-[#FBEAE9] text-[#CB1A14]"
                            : ""
                      }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                </div>

                <div className="space-y-[8px] mt-auto">
                  <p className="font-[400] text-[12px] text-[#4B5563] font-sans">
                    {stat.desc}
                  </p>

                  <div
                    className={`inline-flex p-1 rounded-full items-center gap-[6px] font-[500] text-[10px] font-sans ${stat.desc === "Total products"
                      ? "text-[#04802E] bg-[#E7F6EC]"
                        : stat.desc === "Low stock items"
                        ? "text-[#DD900D] bg-[#FEF6E7]"
                          : stat.desc === "Out of stock"
                          ? "text-[#CB1A14] bg-[#FBEAE9]"
                            : ""
                      }`}
                  >
                    {/* {stat.desc === "Total products" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-[10px] h-[10px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                        />
                      </svg>
                    )} */}
                    <span>{stat.action}</span>
                  </div>
                </div>
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