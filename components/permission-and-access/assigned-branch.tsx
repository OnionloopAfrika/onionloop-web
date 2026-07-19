"use client";

import { usePathname } from "next/navigation";

export default function AssignedBranch() {
  const pathname = usePathname();
  const isGroupManager = pathname.includes("group-manager");
  const isSuperAdmin = pathname.includes("super-admin");

  return (
    <div className="p-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]">
      <div className="space-y-[8px]">
        <p className="font-[600] text-[12px] text-[#363636]">
          {isGroupManager || isSuperAdmin
            ? "Assigned Groups"
            : "Assigned Branch"}
        </p>
        <span className="bg-[#F5FFFD] px-[16px] py-[4px] rounded-full flex justify-center items-center font-[500] text-[12px] text-[#04907E] w-fit">
          {isGroupManager || isSuperAdmin
            ? "All groups"
            : "individual branches"}
        </span>
      </div>
    </div>
  );
}
