import React from "react";
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from "../ui/tabs";
import AllNotis from "./all-notis";
import KycNotis from "./kyc-notis";
import AgentNotis from "./agent-notis";
import MerchantNotis from "./merchant-notis";
import DisputeNotis from "./dispute-notis";
import SystemNotice from "./system-notice";

export default function AlertContent() {
  return (
    <div>
      <Tabs className="space-y-[24px]" defaultValue="All">
        <div className="bg-white p-[16px] rounded-[16px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex justify-start items-center ">
          <NavTabsList className="overflow-x-auto">
            <NavTabsTrigger value="All">All</NavTabsTrigger>
            <NavTabsTrigger value="KYC">KYC</NavTabsTrigger>
            <NavTabsTrigger value="Agent">Agent</NavTabsTrigger>
            <NavTabsTrigger value="Merchant">Merchant</NavTabsTrigger>
            <NavTabsTrigger value="Dispute">Dispute</NavTabsTrigger>
            <NavTabsTrigger value="System">System</NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="All">
          <AllNotis />
        </TabsContent>

        <TabsContent value="KYC">
          <KycNotis />
        </TabsContent>

        <TabsContent value="Agent">
          <AgentNotis />
        </TabsContent>

        <TabsContent value="Merchant">
          <MerchantNotis />
        </TabsContent>

        <TabsContent value="Dispute">
          <DisputeNotis />
        </TabsContent>

        <TabsContent value="System">
          <SystemNotice />
        </TabsContent>
      </Tabs>
    </div>
  );
}
