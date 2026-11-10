"use client";

import Link from "next/link";
import { RightArrowIcon } from "../icons/svgs";
import { useRouter } from "next/navigation";

type BreadcrumbProps = {
  firstTab: string;
  secondTab: string;
  firstLink?: string;
  secondLink?: string;
};

export function Breadcrumb({
  firstTab,
  secondTab,
  firstLink,
  secondLink,
}: BreadcrumbProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-[8px]">
      <Link
        href={firstLink ?? "#"}
        className="font-[400] text-[12px] text-[#6C6C6C]"
        onClick={() => router.back()}
      >
        {firstTab}
      </Link>
      <RightArrowIcon className="text-[#C7C7C7] w-[16px] h-[16px]" />
      <Link
        href={secondLink ?? "#"}
        className="font-[500] text-[12px] text-[#363636]"
      >
        {secondTab}
      </Link>
    </div>
  );
}
