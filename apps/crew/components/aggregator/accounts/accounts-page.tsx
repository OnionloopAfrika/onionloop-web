import Header from "@/components/layouts/header";
import { AGGREGATOR_ACCOUNTS } from "@/lib/mockdata/accounts";
import React from "react";
import EmptyAccounts from "./empty-accounts";
import Button from "@/components/ui/button";
import { CalendarIcon } from "@/components/icons/svgs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TicketsTrigger,
} from "@/components/ui/tabs";
import { Account } from "./account/account";
import AggTransaction from "../transaction/agg-transaction";

export function AccountsPage() {
  if (AGGREGATOR_ACCOUNTS.length === 0) {
    return (
      <div className="space-y-[24px]">
        <Header
          heading="Accounts"
          subHeading="View and manage all business accounts."
        />

        <EmptyAccounts />
      </div>
    );
  }

  return (
    <div className="space-y-[24px]">
      <div className=" flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
        <Header
          heading="Accounts"
          subHeading="View and manage business accounts, account balance, and revenue"
        />
        <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
            <CalendarIcon />
            Mar 2026
          </button>
        </div>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="flex items-center gap-[10px] mb-[24px]">
          <TicketsTrigger value="account">Account</TicketsTrigger>
          <TicketsTrigger value="transaction">Transaction</TicketsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Account />
        </TabsContent>

        <TabsContent value="transaction">
          <AggTransaction />
        </TabsContent>
      </Tabs>
    </div>
  );
}
