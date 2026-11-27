"use client";

import Card from "@/components/card";
import Header from "@/components/layouts/header";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import React, { useState } from "react";
import { TransactionHistory } from "./transaction-history";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function TransactionDetails() {
  const [reconcile, setReconcile] = useState(false);

  const transDetails = [
    {
      amount: "200",
      label: "Total Orders",
    },

    {
      amount: "₦86,000",
      label: "Total Expected Payments From Orders",
    },

    {
      amount: "₦6,000",
      label: "Expected cash right now (today, unreconciled)",
    },

    {
      amount: "₦80,000",
      label: "Total Payments Received",
    },
  ];

  return (
    <>
      <div className="space-y-[24px]">
        <Breadcrumb firstTab="Transactions" secondTab="Cash Reconciliation" />

        <div className="flex justify-between items-center">
          <Header
            heading="Cash Reconciliation"
            subHeading="The system totals every confirmed cash sale during a shift. "
          />

          <button
            onClick={() => setReconcile(true)}
            className="bg-[#024E44] min-h-[40px] rounded-[8px] flex justify-center items-center py-[8px] px-[16px] font-[500] text-[16px] text-white"
          >
            Reconcile Cash
          </button>
        </div>

        <div className="grid grid-cols-4 gap-[16px]">
          {transDetails.map((item, i) => (
            <Card
              className={`min-h-[82px] p-[12px] rounded-[8px] space-y-[8px] flex flex-col justify-between  ${item.amount === "₦6,000" ? "!bg-[#FEF6E7] " : "bg-white"}  `}
              key={i}
            >
              <p
                className={`font-[600] text-[20px]   ${item.amount === "₦6,000" ? " text-[#DD900D]" : "text-[#000000]"}  `}
              >
                {item.amount}
              </p>

              <p
                className={`font-[500] text-[10px]   ${item.amount === "₦6,000" ? " text-[#DD900D]" : "text-[#6C6C6C]"}  `}
              >
                {item.label}
              </p>
            </Card>
          ))}
        </div>

        <TransactionHistory />
      </div>

      <Modal open={reconcile} onOpenChange={setReconcile}>
        <div className="space-y-[64px]">
          <div className="space-y-[24px]">
            <p className="font-[700] text-[24px] text-[#242424]">
              Reconcile Cash
            </p>

            <div className="p-[16px] rounded-[8px] bg-[#FEF6E7] min-h-[124px] gap-[12px] flex flex-col justify-between">
              <div className="space-y-[8px]">
                <p className="font-[400] text-[14px] text-[#6C6C6C]">
                  Expected Cash Amount
                </p>

                <p className="font-[600] text-[16px] text-[#DD900D]">₦6,000</p>
              </div>

              <p className="font-[400] text-[14px] text-[#6C6C6C]">
                System expects ₦6,000 (from confirmed order sales today) to
                balance all successful orders
              </p>
            </div>

            <Input
              placeholder="e.g ₦1,000 "
              label="Enter Cash Amount You Counted"
            />
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <Button onClick={() => setReconcile(false)} variant="secondary">
              Cancel
            </Button>

            <Button onClick={() => setReconcile(false)}>Submit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
