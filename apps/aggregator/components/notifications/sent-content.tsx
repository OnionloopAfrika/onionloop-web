import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from "../ui/tabs";
import SentAll from "./sent-all";

export default function SentContent() {
  return (
    <div>
      <Tabs className="space-y-[24px]" defaultValue="All">
        <div className="bg-white p-[16px] rounded-[16px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex justify-start items-center ">
          <NavTabsList className="overflow-x-auto ">
            <NavTabsTrigger value="All">All</NavTabsTrigger>
            <NavTabsTrigger value="KYC Rejected">KYC Rejected</NavTabsTrigger>
            <NavTabsTrigger value="KYC Approved">KYC Approved</NavTabsTrigger>
            <NavTabsTrigger value="Account Suspended">
              Account Suspended
            </NavTabsTrigger>
            <NavTabsTrigger value="KYC On Hold">KYC On Hold</NavTabsTrigger>
            <NavTabsTrigger value="Float Top-up Approved">
              Float Top-up Approved
            </NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="All">
          <SentAll />
        </TabsContent>

        <TabsContent value="KYC Rejected">
          <SentAll notificationType="KYC Rejected" />
        </TabsContent>

        <TabsContent value="KYC Approved">
          <SentAll notificationType="KYC Approved" />
        </TabsContent>

        <TabsContent value="Account Suspended">
          <SentAll notificationType="Account Suspended" />
        </TabsContent>

        <TabsContent value="KYC On Hold">
          <SentAll notificationType="KYC On Hold" />
        </TabsContent>

        <TabsContent value="Float Top-up Approved">
          <SentAll notificationType="Float Top-up Approved" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
