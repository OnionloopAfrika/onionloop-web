import { BusinessInfo } from "@/components/aggregator/business/business-owner/business-details/business-info";
import { Performance } from "@/components/aggregator/business/business-owner/business-details/performance";
import { Settings } from "@/components/aggregator/business/business-owner/business-details/settings";
import { Tickets } from "@/components/aggregator/business/business-owner/business-details/tickets";
import { BusinessTransactions } from "@/components/aggregator/business/business-owner/business-details/transactions";
import {
  AggCallIcon,
  AggMessageIcon,
  LocationIcon,
  ProfileCardIcon,
} from "@/components/icons/svgs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="space-y-[40px]">
      <Breadcrumb firstTab="Business Owners" secondTab="De-Light SuperStores" />

      <div className="bg-white rounded-[16px] py-[28px] px-[24px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-start gap-[16px]">
          <Image src={"/images/de-light.svg"} width={64} height={64} alt="" />

          <div className="flex flex-col  gap-[16px]  w-full">
            <div className="flex gap-[12px]">
              <p className="font-[600] text-[16px] text-[#131313]">
                De-Light SuperStores
              </p>

              <span className="bg-[#E7F6EC] rounded-full py-[2px] px-[8px] font-[400] text-[12px] text-[#04802E]">
                Active
              </span>
            </div>
            <div className=" w-full flex gap-[20px]">
              <div className="space-y-[10px]">
                <div className="flex gap-[8px] items-center">
                  <ProfileCardIcon className="text-[#8A8A8A]" />
                  <p className="font-[500] text-[14px] text-[#6C6C6C]">
                    Joseph Maduabachi
                  </p>
                </div>

                <div className="flex gap-[8px] items-center">
                  <AggMessageIcon className="text-[#8A8A8A]" />
                  <p className="font-[500] text-[14px] text-[#6C6C6C]">
                    josephmaduabuchi@gmail.com
                  </p>
                </div>
              </div>

              <div className="space-y-[10px]">
                <div className="flex gap-[8px] items-center">
                  <AggCallIcon className="text-[#8A8A8A]" />
                  <p className="font-[500] text-[14px] text-[#6C6C6C]">
                    +234 816 249 0242
                  </p>
                </div>

                <div className="flex gap-[8px] items-center">
                  <LocationIcon className="text-[#8A8A8A]" />
                  <p className="font-[500] text-[14px] text-[#6C6C6C]">
                    653, Allen adekunle, Ogba, Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs className="space-y-[24px]" defaultValue="business_info">
        <div className="w-full bg-white rounded-[16px] p-[16px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <NavTabsList className="w-fit">
            <NavTabsTrigger value="business_info">Business Info</NavTabsTrigger>
            <NavTabsTrigger value="performance">Performance</NavTabsTrigger>
            <NavTabsTrigger value="transactions">Transactions</NavTabsTrigger>
            <NavTabsTrigger value="tickets">Tickets</NavTabsTrigger>
            <NavTabsTrigger value="settings">Settings</NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="business_info">
          <BusinessInfo />
        </TabsContent>

        <TabsContent value="performance">
          <Performance />
        </TabsContent>

        <TabsContent value="transactions">
          <BusinessTransactions />
        </TabsContent>

        <TabsContent value="tickets">
          <Tickets />
        </TabsContent>

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
