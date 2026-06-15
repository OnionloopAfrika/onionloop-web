import React from "react";
import { ScanQrIcon } from "../icons/svgs";

export default function ScanConnected() {
  return (
    <div className="p-[10px] rounded-[8px] shadow-[0_0_15px_rgba(0,0,0,0.15)] flex items-center gap-[10px] w-fit">
      <ScanQrIcon className="text-[#04907E]" />
      <span className="font-[500] text-[18px] text-[#131313]">
        Scan Connected
      </span>
    </div>
  );
}
