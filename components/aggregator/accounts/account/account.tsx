import {
  ArrowDownCircleIcon,
  OpenEyeIcon,
  PercentageBadgeicon,
} from "@/components/icons/svgs";
import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import React from "react";
import MainBalance from "./main-balance";
import { RevenueBalance } from "./revenue-balance";
import { OnionBalance } from "./onion-balance";

type StatTypes = {
  title: string;
  amount: string;
  desc: string | null;
  chart: React.ReactNode | null;
};

const STAT: StatTypes[] = [
  {
    title: "Main Balance",
    amount: "₦142,000",
    desc: null,
    chart: null,
  },

  {
    title: "Revenue Balance",
    amount: "₦142,000",
    desc: "This is the revenue generated from your target for the month and it will be automatically transfer into your main account if targets are met.",
    chart: <PercentageBadgeicon />,
  },

  {
    title: "Onion Bonus Balance",
    amount: "₦142,000",
    desc: "This is the revenue generated from your target for the month and it will be automatically transfer into your main account if targets are met.",
    chart: null,
  },
];

export function Account() {
  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-3 gap-[16px]">
        {STAT.map((item, i) => (
          <div
            key={i}
            className="rounded-[8px] bg-white p-[16px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-[16px]"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-[8px]">
                <p className="font-[500] text-[12px] text-[#6C6C6C]">
                  {item.title}
                </p>

                <div className="flex items-center gap-[8px]">
                  <p className="text-[#000000] font-[600] text-[20px]">
                    {item.amount}
                  </p>
                  <OpenEyeIcon className="text-[#8A8A8A]" />
                </div>
              </div>

              {item.title === "Revenue Balance" && <PercentageBadgeicon />}
            </div>

            {item.title === "Main Balance" && (
              <button className="bg-[#024E44] rounded-[8px] py-[7px] px-[16px] flex items-center gap-[8px] w-fit">
                <ArrowDownCircleIcon className="text-white" />{" "}
                <span className="font-[500] text-[12px] text-white">
                  Withdraw your money
                </span>
              </button>
            )}

            {item.title !== "Main Balance" && (
              <p className="font-[400] text-[10px] text-[#6C6C6C]">
                {item.desc}
              </p>
            )}
          </div>
        ))}
      </div>

      <Tabs defaultValue="main_balance">
        <div className="bg-white rounded-[16px] p-[16px] mb-[24px]">
          <NavTabsList className="w-fit">
            <NavTabsTrigger value="main_balance">Main Balance</NavTabsTrigger>
            <NavTabsTrigger value="revenue_balance">
              Revenue Balance
            </NavTabsTrigger>
            <NavTabsTrigger value="onion_balance">
              Onion Bonus Balance
            </NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="main_balance">
          <MainBalance />
        </TabsContent>

        <TabsContent value="revenue_balance">
          <RevenueBalance />
        </TabsContent>

        <TabsContent value="onion_balance">
          <OnionBalance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
