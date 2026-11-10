import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import React from "react";
import { VerificationQueue } from "./verification-queue";
import { MyVisit } from "./my-visit";
import { InProgress } from "./in-progress";

export function BusinessVerification() {
  const BUSINESS_VERIFICATION = [
    { value: "4", desc: "Pending Verification" },
    { value: "3", desc: "In Progress" },
    { value: "7", desc: "Verified" },
  ];
  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-3 gap-[16px] max-lg:grid-cols-2">
        {BUSINESS_VERIFICATION.map((item, i) => (
          <div
            key={i}
            className="bg-white min-h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
          >
            <p className="font-[600] text-[20px] text-[#000000]">
              {item.value}
            </p>
            <p className="font-[500] text-[10px] text-[#6C6C6C]">{item.desc}</p>
          </div>
        ))}
      </div>

      <Tabs className="space-y-[24px]" defaultValue="verification_queue">
        <div className="w-full bg-white rounded-[16px] p-[16px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <NavTabsList className="w-fit max-lg:w-full max-lg:overflow-auto">
            <NavTabsTrigger value="verification_queue">
              Verification Queue
            </NavTabsTrigger>
            <NavTabsTrigger value="my_visit">My Visit</NavTabsTrigger>
            <NavTabsTrigger value="in_progress">In Progress</NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="verification_queue">
          <VerificationQueue />
        </TabsContent>

        <TabsContent value="my_visit">
          <MyVisit />
        </TabsContent>
        <TabsContent value="in_progress">
          <InProgress />
        </TabsContent>
      </Tabs>
    </div>
  );
}
