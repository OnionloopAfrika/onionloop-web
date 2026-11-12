import Image from "next/image";
import {
  CopyIcon,
  DragBtn,
  SuccessIcon,
  VerifyIcon,
  ChevronLeftIcon,
} from "../icons/svgs";
import { SummaryHeader } from "./confirm-order";
import { OrderInfo } from "./order-details";
import Button from "../ui/button";
import { useState } from "react";
import { OrderReceipt } from "./order-receipt";

export function PaymentReceived({
  showBackButton = false,
  onBack,
}: {
  showBackButton?: boolean;
  onBack?: () => void;
}) {
  const [showReceipt, setShowReceipt] = useState(false);

  if (showReceipt) {
    return <OrderReceipt showBackButton onBack={() => setShowReceipt(false)} />;
  }

  return (
    <div className="space-y-[24px]">
      {showBackButton && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#131313] font-medium md:hidden"
        >
          <ChevronLeftIcon />
          Back
        </button>
      )}
      <SummaryHeader title="Payment Received" />

      <div className="p-[16px] bg-white rounded-[8px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[8px] flex flex-col items-center">
        <div className="space-y-[8px]">
          <VerifyIcon className="text-[#04907E] mx-auto" />

          <p className="font-[500] text-[24px] text-[#04907E] text-center max-lg:text-[14px]">
            Payment Received
          </p>
        </div>

        <div className="space-y-[6px]">
          <p className="text-center font-[600] text-[18px] text-[#363636]">
            +₦12,362.50
          </p>

          <p className="text-center font-[400] text-[14px] text-[#6C6C6C] max-lg:text-[12px]">
            AYODELE OKUNADE
          </p>

          <span className="py-[4px] px-[8px] rounded-full flex items-center gap-[4px] bg-[#F7F7F7] border border-[#C7C7C7] w-fit mx-auto font-[400] text-[12px] text-[#6C6C6C]">
            <SuccessIcon /> Successful
          </span>
        </div>
      </div>

      <SummaryHeader
        className="font-[500] text-[18px] text-[#6C6C6C]"
        title="Transaction details"
      />

      <div className="p-[24px] rounded-[8px] p-[24px]  shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[16px]">
        <div className="pb-[8px] border-b border-b-[#C7C7C7] flex justify-between items-center">
          <p className="font-[400] text-[16px] text-[#363636] max-lg:text-[14px]">
            KFC Holdings
          </p>{" "}
          <p className="font-[400] text-[16px] text-[#6C6C6C] max-lg:text-[14px]">
            03 Feb, 2026 at 9:00 AM
          </p>
        </div>

        <OrderInfo
          title="From:"
          value={
            <div className="flex items-center gap-[6px]">
              <Image
                src={"/icons/moniepoint.svg"}
                height={18}
                width={18}
                alt="image"
              />
              Moniepoint MFB
            </div>
          }
        />

        <OrderInfo
          title="From:"
          value={
            <div className="flex items-center gap-[6px]">
              <Image
                src={"/icons/onionloop.svg"}
                height={18}
                width={18}
                alt="image"
              />
              Onionloop{" "}
            </div>
          }
        />

        <OrderInfo title="Customer’s  Name:" value="Ayodele Okunade" />

        <OrderInfo
          title="Payment Method: Bank Transfer"
          value="Bank Transfer"
        />

        <OrderInfo
          title="Transaction ID:"
          value={
            <p className="flex items-center gap-[8px] font-[500] text-[16px] text-[#363636]">
              TXN-7821 <CopyIcon />
            </p>
          }
        />

        <OrderInfo title="Description:" value="Snacks and drinks" />

        <OrderInfo title="Processed by:" value="Oluwaseun Olowookere(You)" />

        <OrderInfo title="Order number:" value="#0022" />

        <OrderInfo title="Order Amount:" value="₦11,500.00" />

        <OrderInfo title="VAT (7.5%)" value="₦862.50" />

        <OrderInfo title="Total Amount:" value="₦12,362.50" />
      </div>

      <div className="p-[16px] space-y-[24px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <DragBtn className="mx-auto" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Button
            onClick={() => setShowReceipt(true)}
            variant="cashier_Outline"
            size="cashier_Outline"
          >
            View Receipt
          </Button>
          <Button variant="cashierSolid" size="cashier_Outline">
            Start New Order
          </Button>
        </div>
      </div>
    </div>
  );
}
