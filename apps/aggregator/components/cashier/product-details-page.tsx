"use client";

import Image from "next/image";
import { LightIcon, ScanQrIcon, TipsIcon } from "../icons/svgs";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import SearchBar from "../ui/search-bar";
import ScanConnected from "./scan-connected";
import { menuItems } from "./all-menus";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-[24px] max-lg:px-[10px]">
      <ProfileHeader
        className="border-b-0"
        title="Product Details"
        subtitle="Scan a product barcode to add to cart"
      />

      <div className="flex pr-[24px] max-lg:flex-col max-lg:pb-[24px] max-lg:pr-0 justify-between items-center  rounded-[16px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] bg-white">
        <SearchBar />

        <div className="max-lg:w-full max-lg:px-[24px]">
          <Button className="max-lg:w-full" variant="scan" size="scan">
            <ScanQrIcon /> Scan Item
          </Button>
        </div>
      </div>

      <ScanConnected />

      <div className="w-full h-[522.25px] relative">
        <Image
          src={"/images/bigger-coke.svg"}
          fill
          alt="image"
          className="object-cover"
        />
      </div>

      <div className=" rounded-[16px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] p-[20px] flex justify-between items-center max-lg:flex-col max-lg:gap-[20px]">
        <div className="flex items-center gap-[8px]">
          <TipsIcon />
          <div className="space-y-[2px]">
            <p className="font-[500] text-[16px] text-[#131313]">Tips</p>
            <p className="font-[400] text-[14px] text-[#363636]">
              Hold the barcode steady and ensure it is very visible
            </p>
          </div>
        </div>

        <Button className="max-lg:w-full" variant="outline" size="lg">
          <LightIcon /> Turn on flashlight
        </Button>
      </div>

      <div className="space-y-[16px]">
        <div className="flex justify-between items-center">
          <p className="font-[600] text-[20px] text-[#131313] max-lg:text-[14px]">
            Recent scanned items
          </p>
          <p className="font-[600] text-[16px] text-[#04907E]">Clear All</p>
        </div>

        <div className="grid grid-cols-3 gap-[16px] max-lg:grid-cols-1">
          {menuItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-[8px] rounded-[8px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] flex items-center justify-between"
            >
              <div className="flex items-center gap-[8px]">
                <div className="w-[56px] h-[70px] relative">
                  <Image
                    src={item.image}
                    fill
                    alt={item.name}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-[2px]">
                  <p className="flex items-center font-[500] text-[16px] text-[#363636] gap-[2px]">
                    {item.name} |{" "}
                    <span className="font-[500] text-[16px] text-[#6C6C6C]">
                      35cl
                    </span>{" "}
                  </p>
                </div>
              </div>
              <p className="font-[500] text-[14px] text-[#686764]">X1</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
