"use client";

import { useState } from "react";
import Image from "next/image";
import {
  TickIcon,
  CopyIcon,
  Separator,
  SingleSeparator,
  DragBtn,
  ChevronLeftIcon,
} from "../icons/svgs";
import Button from "../ui/button";
import { SummaryHeader } from "./confirm-order";
import { TotalAmount } from "../order-summary";
import {
  PaymentTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { AccountNumber } from "./account-number";
import { Qrcode } from "./qr-code";
import { PaymentReceived } from "./payment-received";

export default function OrderDetails({
  showBackButton = false,
  onBack,
}: {
  showBackButton?: boolean;
  onBack?: () => void;
}) {
  const [paymentReceived, setPaymentReceived] = useState(false);

  if (paymentReceived) {
    return (
      <PaymentReceived
        showBackButton
        onBack={() => setPaymentReceived(false)}
      />
    );
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
      <SummaryHeader title="Order Details" />

      <div className="bg-white rounded-[8px] p-[24px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[16px]">
        <div className="space-y-[12px]">
          <OrderInfo
            className="text-[14px]"
            title="Date:"
            value="03 Feb, 2026 at 9:00 AM "
          />

          <OrderInfo title="Processed by:" value="Oluwaseun Olowookere" />

          <OrderInfo title="Customer Name:" value="Ayodele Okunade" />

          <OrderInfo title="Customer Phone Number:" value="090734561721" />

          <OrderInfo title="Order Number" value="#0022" />
        </div>

        <Separator className="w-full" />

        <div className="space-y-[12px]">
          <Items item="Coca-cola" nos="2" amount="₦1,000" />
          <Items item="Meat pie" nos="4" amount="₦2,000" />
          <Items item="Sprite" nos="2" amount="₦2,000" />
          <Items item="Fanta" nos="2" amount="₦2,000" />
          <Items item="Donuts" nos="2" amount="₦2,000" />
          <Items item="Bottle Water" nos="2" amount="₦3,000" />
        </div>

        <SingleSeparator className="w-full" />

        <Items item="Sub Total" amount="₦11,500" />

        <SingleSeparator className="w-full" />

        <div className="space-y-[12px] w-full">
          <Items item="Number of products sold" amount="6" />
          <Items item="VAT (7.5%)" amount="₦12,360.00" />
        </div>

        <TotalAmount
          total="Total Bills"
          amount="₦12,360.00"
          className="font-[400]"
        />
      </div>

      <div className="space-y-[24px]">
        <div className="space-y-[16px]">
          <Tabs defaultValue="account" className="space-y-[24px]">
            <TabsList className=" rounded-full p-[4px] grid grid-cols-2 bg-white">
              <PaymentTrigger value="account">
                Transfer to Account Number
              </PaymentTrigger>

              <PaymentTrigger value="qr">Scan QR Code</PaymentTrigger>
            </TabsList>

            <TabsContent value="account">
              <AccountNumber />
            </TabsContent>
            <TabsContent value="qr">
              <Qrcode />
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-[16px] space-y-[24px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <DragBtn className="mx-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <Button variant="cashier_Outline" size="cashier_Outline">
              Cancel Order
            </Button>
            <Button
              onClick={() => setPaymentReceived(true)}
              variant="cashierSolid"
              size="cashier_Outline"
            >
              Payment Received
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type ItemsProps = {
  item: string;
  nos?: string;
  amount: string;
};

type OrderDetails = {
  title: string;
  value: React.ReactNode;
  className?: string;
};

export const OrderInfo = ({ title, value, className = "" }: OrderDetails) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-[400] text-[16px] text-[#6C6C6C] max-lg:text-[10px]">
        {title}
      </p>
      <p
        className={`font-[500] text-[16px] text-[#363636] max-lg:text-[12px] ${className}  `}
      >
        {value}
      </p>
    </div>
  );
};

export const Items = ({ item, nos, amount }: ItemsProps) => {
  return (
    <div className="grid grid-cols-3 w-full ">
      <p className="font-[400] text-[16px] text-[#6C6C6C] max-lg:text-[10px]">
        {item}
      </p>

      <p className="font-[400] text-[16px] text-[#6C6C6C] max-lg:text-[10px] text-center">
        {nos && <span> x{nos}</span>}
      </p>
      <p className="font-[500] text-[16px] text-[#363636] text-end max-lg:text-[12px]">
        {amount}
      </p>
    </div>
  );
};
