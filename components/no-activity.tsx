"use client";

import { NoProductsIcon, PlusIcon } from "./icons/svgs";
import Button from "./ui/button";

type ActivityProps = {
  title: string;
  description: string;
  btnText: string;
  btnAction?: () => void;
};

export function NoStaffActivity({
  title,
  description,
  btnText,
  btnAction,
}: ActivityProps) {
  return (
    <div className="w-full flex justify-center items-start">
      <div className="max-w-[637px] flex flex-col items-center gap-[42px]">
        <div className="gap-[24px] flex flex-col items-center">
          <NoProductsIcon />

          <div className="text-center space-y-[16px]">
            <p className="font-[500] text-[32px] text-[#131313]">{title}</p>
            <p className="font-[400] text-[20px] text-[#6C6C6C]">
              {description}{" "}
            </p>
          </div>
        </div>

        <Button onClick={btnAction} variant="primary" size="newOrder">
          <PlusIcon /> {btnText}
        </Button>
      </div>{" "}
    </div>
  );
}
