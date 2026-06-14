"use client";

import { NoProductsIcon, PlusIcon } from "../icons/svgs";
import Button from "../ui/button";

export default function NoOrder() {
  return (
    <div className="max-w-[637px] flex flex-col items-center gap-[42px]">
      <div className="gap-[24px] flex flex-col items-center">
        <NoProductsIcon />

        <div className="text-center space-y-[16px]">
          <p className="font-[500] text-[32px] text-[#131313]">No Orders Yet</p>
          <p className="font-[400] text-[20px] text-[#6C6C6C]">
            New orders will appear here when customers place them
          </p>
        </div>
      </div>

      <Button variant="primary" size="newOrder">
        <PlusIcon /> New Order
      </Button>
    </div>
  );
}
