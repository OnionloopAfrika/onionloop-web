import Image from "next/image";
import {
  BarCode,
  DragBtn,
  Separator,
  SingleSeparator,
  VerifyIcon,
  ChevronLeftIcon,
} from "../icons/svgs";
import { SummaryHeader } from "./confirm-order";
import { Items, OrderInfo } from "./order-details";
import Button from "../ui/button";

export function OrderReceipt({
  showBackButton = false,
  onBack,
}: {
  showBackButton?: boolean;
  onBack?: () => void;
}) {
  return (
    <div className="space-y-[16px]">
      {showBackButton && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#131313] font-medium md:hidden"
        >
          <ChevronLeftIcon />
          Back
        </button>
      )}
      <SummaryHeader title="Order Receipt" />

      <div className="space-y-[48px]">
        <div className="space-y-[24px] bg-white rounded-[8px] shadow-[0_0_15px_rgba(0,0,0,0.15)] p-[24px]">
          <div className="space-y-[8px]">
            <VerifyIcon className="text-[#04907E] mx-auto" />

            <div className="space-y-[4px]">
              <p className="font-[400] text-[18px] text-[#6C6C6C] text-center">
                YOUR RECEIPT
              </p>

              <p className="font-[600] text-[16px] text-[#363636] text-center">
                KFC
              </p>
            </div>
          </div>

          <div className="space-y-[16px]">
            <OrderInfo
              title="Date:"
              value="03 Feb, 2026 at 9:00 AM "
              className="text-[14px]"
            />

            <OrderInfo title="Processed by:" value="Oluwaseun Olowookere" />

            <OrderInfo
              title="Customer Name:"
              value="Ayodele Okunade"
              className="font-[400]"
            />

            <OrderInfo
              title="Customer Phone Number:"
              value="090734561721"
              className="font-[400]"
            />

            <OrderInfo
              title="Order Number"
              value="#0022"
              className="font-[400]"
            />

            <Separator className="w-full" />

            <Items item="Coca-cola" nos="2" amount="₦1,000" />

            <Items item="Meat pie" nos="4" amount="₦2,000" />

            <Items item="Sprite" nos="2" amount="₦2,000" />

            <Items item="Fanta" nos="1" amount="₦1,000" />

            <Items item="Donuts" nos="3" amount="₦3,000" />

            <Items item="Bottle Water" nos="3" amount="₦3,000" />

            <SingleSeparator className="w-full" />

            <Items item="Sub Total" amount="₦11,500" />

            <SingleSeparator className="w-full" />

            <Items item="Number of products sold" amount="6" />

            <Items item="VAT (7.5%)" amount="₦862.50" />

            <Items item="Total Bills" amount="₦12,360.00" />

            <div className="w-full h-[66.96px] relative">
              <Image src={"/icons/barcode.svg"} fill alt="barcode" />
            </div>

            <p className="font-[400] text-[16px] text-[#131313] text-center">
              Thank you for your purchase
            </p>
          </div>
        </div>
        <div className="p-[16px] space-y-[24px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <DragBtn className="mx-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <Button variant="cashier_Outline" size="cashier_Outline">
              Print Receipt
            </Button>
            <Button variant="cashierSolid" size="cashier_Outline">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
