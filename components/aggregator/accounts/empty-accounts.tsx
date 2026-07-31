import { AddIcon, NoProductsIcon } from "@/components/icons/svgs";
import Button from "@/components/ui/button";
import React from "react";

export default function EmptyAccounts() {
  return (
    <div className="w-full flex justify-center">
      {" "}
      <div className="max-w-[836px] flex flex-col items-center gap-[42px]">
        <div className="space-y-[24px] flex flex-col items-center">
          <NoProductsIcon />

          <div className="text-center space-y-[16px]">
            <p className="font-[500] text-[24px] text-[#131313]">
              No Account Data yet
            </p>
            <p className="font-[400] text-[14px] text-[#6C6C6C]">
              You haven’t added any businesses yet. Start by adding new business
            </p>
          </div>
        </div>

        <Button variant="primary" size="save">
          <AddIcon /> Add New Business
        </Button>
      </div>
    </div>
  );
}
