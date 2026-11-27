import React from "react";
import Header from "../layouts/header";
import { RiaghtArrow, RightArrowIcon } from "../icons/svgs";
import Card from "../card";
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from "../ui/tabs";
import TransactionTable from "./transaction-table";

export const TransactionsPage = () => {
  const stat = [
    {
      title: "Scan-to-Pay",
      amount: "₦496,050",
      footer_text: "7 transactions · 70% of confirmed revenue",
    },

    {
      title: "Bank Transfer",
      amount: "₦8,500",
      footer_text: "3 transactions · 20% of confirmed revenue",
    },

    {
      title: "Cash",
      amount: "₦5,000",
      footer_text: "1 transaction · 10% of confirmed revenue",
    },
  ];

  return (
    <div className="space-y-[24px]">
      <div className="flex justify-between items-center">
        <Header
          heading="Transactions"
          subHeading="View and manage all sales and payment records"
        />

        <button className="bg-[#024E44] rounded-[8px] py-[8px] px-[16px] font-[500] text-[16px] min-h-[40px] text-white flex items-center gap-[10px]">
          Cash Reconciliation <RiaghtArrow />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-[16px]">
        {stat.map((item, i) => (
          <Card
            className="min-h-[100px] flex flex-col justify-between gap-[8px] rounded-[8px] p-[12px]"
            key={i}
          >
            <p className="font-[500] text-[10px] text-[#6C6C6C]">
              {item.title}
            </p>

            <p className="font-[600] text-[20px] text-[#242424]">
              {item.amount}
            </p>

            <p className="font-[400] text-[10px] text-[#04802E]">
              {item.footer_text}
            </p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="All">
        <Card className="p-[16px] rounded-[16px] flex justify-start items-center mb-[16px]">
          <NavTabsList>
            <NavTabsTrigger value="All">All</NavTabsTrigger>
            <NavTabsTrigger value="Scan">Scan to Pay</NavTabsTrigger>
            <NavTabsTrigger value="Bank">Bank Transfer</NavTabsTrigger>
            <NavTabsTrigger value="Cash">Cash</NavTabsTrigger>
          </NavTabsList>
        </Card>

        <TabsContent value="All">
          <TransactionTable />
        </TabsContent>

        <TabsContent value="Scan">
          <TransactionTable paymentMethodFilter="Scan to Pay" />
        </TabsContent>

        <TabsContent value="Bank">
          <TransactionTable paymentMethodFilter="Bank Transfer" />
        </TabsContent>

        <TabsContent value="Cash">
          <TransactionTable paymentMethodFilter="Cash" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
