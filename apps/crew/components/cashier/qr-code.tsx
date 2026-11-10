import Image from "next/image";

export function Qrcode() {
  return (
    <div className="py-[12px] px-[16px] sapce-y-[12px] rounded-[8px] shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white">
      <div className="space-y-[4px]">
        <p className="font-[400] text-[16px] text-[#6C6C6C] text-center">
          Amount to pay
        </p>
        <p className="font-[600] text-[24px] text-[#363636] text-center">
          ₦12,362.50
        </p>
      </div>

      <Image
        className="mx-auto"
        src={"/icons/qr-code.svg"}
        height={354}
        width={359}
        alt="qrcode"
      />
    </div>
  );
}
