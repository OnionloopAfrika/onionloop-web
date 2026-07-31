"use client";

import { BusinessApproval } from "@/components/aggregator/business/business-approval/business-approval";
import { BusinessOwner } from "@/components/aggregator/business/business-owner/business-owner";
import { BusinessTransfer } from "@/components/aggregator/business/business-transfer/business-transfer";
import { BusinessVerification } from "@/components/aggregator/business/business-verification/business-verification";
import EmptyBusiness from "@/components/aggregator/business/empty-business";
import Header from "@/components/layouts/header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TicketsTrigger,
} from "@/components/ui/tabs";
import { BUSINESSES } from "@/lib/mockdata/businesses";
import { useState } from "react";

const Page = () => {
  const [addBusinessTrigger, setAddBusinessTrigger] = useState(0);

  const handleAddBusiness = () => {
    setAddBusinessTrigger((prev) => prev + 1);
  };

  const hasBusinesses = BUSINESSES.length > 0;

  return (
    <div className="space-y-[20px]">
      <Header
        heading="Business"
        subHeading="Manage reassignment of businesses between aggregators."
      />

      {hasBusinesses && (
        <Tabs className="space-y-[24px] " defaultValue="business_owners">
          <TabsList className="grid grid-cols-4 w-[55%] gap-[10px] overflow-x-auto">
            <TicketsTrigger value="business_owners">
              <div className="flex items-center gap-[8px] min-w-0">
                <span className="truncate">Business Owners</span>
              </div>
            </TicketsTrigger>

            <TicketsTrigger value="business_verification">
              <div className="flex items-center gap-[8px] min-w-0">
                <span className="truncate">Business Verification</span>
              </div>
            </TicketsTrigger>

            <TicketsTrigger value="business_transfer">
              <div className="flex items-center gap-[8px] min-w-0">
                <span className="truncate">Business Transfer</span>
              </div>
            </TicketsTrigger>

            <TicketsTrigger value="business_approval">
              <div className="flex items-center gap-[8px] min-w-0">
                <span className="truncate">Business Approval</span>
              </div>
            </TicketsTrigger>
          </TabsList>
          <div>
            <TabsContent value="business_owners">
              <BusinessOwner onAddBusiness={handleAddBusiness} />
            </TabsContent>

            <TabsContent value="business_verification">
              <BusinessVerification />
            </TabsContent>

            <TabsContent value="business_transfer">
              <BusinessTransfer />
            </TabsContent>

            <TabsContent value="business_approval">
              <BusinessApproval />
            </TabsContent>
          </div>
        </Tabs>
      )}

      <EmptyBusiness
        showEmptyUI={!hasBusinesses}
        triggerOpen={addBusinessTrigger}
      />
    </div>
  );
};

export default Page;
