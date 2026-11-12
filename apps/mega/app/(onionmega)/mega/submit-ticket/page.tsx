import {
  LockIcon,
  MultiplyIcon,
  OthersIcon,
  PaymentIcon,
  ReceiptIcon,
  SwapIcon,
  TicketSlashIcon,
  UsersIcon,
} from "@/components/icons/svgs";
import { TicketWarning } from "@/components/inventory/warning";
import { ProfileHeader } from "@/components/profile-header";
import TransactionIssue from "@/components/submit-ticket/transaction-issue";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TicketsTrigger,
} from "@/components/ui/tabs";
import React from "react";

export default function page() {
  return (
    <div className=" space-y-[50px] flex flex-col min-h-screen">
      <ProfileHeader
        className="border-b-0"
        title="Submit a Ticket"
        subtitle="Get help from our support team"
      />

      <TicketWarning
        text="Submit a Ticket"
        cancel={<MultiplyIcon />}
        subText="We will get back to you as soon as possible."
      />

      <div className=" ">
        <div className="space-y-[37px]">
          <div className="space-y-[20px]">
            <div className="space-y-[1px]">
              <span className="font-[600] text-[14px] text-[#131313]">
                Issue Type
              </span>
              <span className="text-[#CB1A14]">*</span>
              <p className="font-[500] text-[12px] text-[#6C6C6C]">
                Select the category that best describes your issues.
              </p>
            </div>

            <Tabs className="space-y-[64px]" defaultValue="transaction-issue">
              <TabsList className="grid grid-cols-7 gap-[21px] overflow-x-auto">
                <TicketsTrigger value="transaction-issue">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <SwapIcon className="flex-shrink-0" />
                    <span className="truncate">Transaction Issue</span>
                  </div>
                </TicketsTrigger>

                <TicketsTrigger value="payment-failed">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <PaymentIcon className="flex-shrink-0" />
                    <span className="truncate">Payment Failed</span>
                  </div>
                </TicketsTrigger>

                <TicketsTrigger value="account-access">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <UsersIcon className="flex-shrink-0" />
                    <span className="truncate">Account Access</span>
                  </div>
                </TicketsTrigger>

                <TicketsTrigger value="card-problem">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <TicketSlashIcon className="flex-shrink-0" />
                    <span className="truncate">Card Problem</span>
                  </div>
                </TicketsTrigger>

                <TicketsTrigger value="app-syncing">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <ReceiptIcon className="flex-shrink-0" />
                    <span className="truncate">App Syncing</span>
                  </div>
                </TicketsTrigger>

                <TicketsTrigger value="staff-access">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <ReceiptIcon className="flex-shrink-0" />
                    <span className="truncate">Staff Access</span>
                  </div>
                </TicketsTrigger>

                <TicketsTrigger value="others">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <OthersIcon className="flex-shrink-0" />
                    <span className="truncate">Others</span>
                  </div>
                </TicketsTrigger>
              </TabsList>
              <div>
                <TabsContent value="transaction-issue">
                  <TransactionIssue />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
