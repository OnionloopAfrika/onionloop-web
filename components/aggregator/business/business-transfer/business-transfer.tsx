import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import React from "react";
import AllTransfers from "./all-transfers";
import MyRequests from "./my-requests";
import Approved from "./approved";
import Rejected from "./rejected";

export function BusinessTransfer() {
  const BUSINESS_TRANSFER = [
    { value: "128", desc: "Transfer Request" },
    { value: "128", desc: "In Review" },
    { value: "128", desc: "Approved" },
    { value: "1", desc: "Rejected" },
  ];
  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-4 gap-[16px]">
        {BUSINESS_TRANSFER.map((item, i) => (
          <div
            key={i}
            className="bg-white h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
          >
            <p className="font-[600] text-[20px] text-[#000000]">
              {item.value}
            </p>
            <p className="font-[500] text-[10px] text-[#6C6C6C]">{item.desc}</p>
          </div>
        ))}
      </div>

      <Tabs className="space-y-[24px]" defaultValue="all_transfers">
        <div className="w-full bg-white rounded-[16px] p-[16px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <NavTabsList className="w-fit">
            <NavTabsTrigger value="all_transfers">All Transfers</NavTabsTrigger>
            <NavTabsTrigger value="my_requests">My Requests</NavTabsTrigger>
            <NavTabsTrigger value="approved">Approved</NavTabsTrigger>
            <NavTabsTrigger value="rejected">Rejected</NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="all_transfers">
          <AllTransfers />
        </TabsContent>

        <TabsContent value="my_requests">
          {" "}
          <MyRequests />{" "}
        </TabsContent>
        <TabsContent value="approved">
          {" "}
          <Approved />{" "}
        </TabsContent>
        <TabsContent value="rejected">
          {" "}
          <Rejected />{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
}
