"use client";

import Badge from "@/components/ui/badge";
import { useState } from "react";
import { Modal } from "../ui/modal";

interface SummaryProps {
  data: {
    availableBalance: { amount: string; status: string; date: string };
    expectedBalance: {
      amount: string;
      percentage: number;
      targetBalance: string;
      expectedCommission: string;
    };
    quickBonus: { unlockAmount: string; description: string };
  };
}

export const SummaryCards: React.FC<SummaryProps> = ({ data }) => {
  const commision = [
    {
      title: "Agent pool commission",
      amount: "₦98,400",
      desc: "38 agents x ₦120 per day x 30 days",
      interest: "58.4%",
    },

    {
      title: "Merchant pool commission",
      amount: "₦52,000",
      desc: "24 merchants x ₦90 per day x 30 days",
      interest: "30.9%",
    },

    {
      title: "Onboarding commissions",
      amount: "₦18,000",
      desc: "10 referrals x₦30 per day ",
      interest: "10.7%",
    },
  ];

  const { availableBalance, expectedBalance, quickBonus } = data;
  const [breakdown, setBreakdown] = useState(false);
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="flex min-h-[186px] flex-col justify-between rounded-lg shadow-sm  bg-white p-4">
          <div>
            <span className="text-[12px] font-medium text-[#6C6C6C]">
              Available Balance
            </span>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {availableBalance.amount}
                </h2>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10.0411 3.26679C12.8479 3.27372 15.5511 4.92818 17.4155 7.87388C17.7829 8.45406 17.9766 9.23931 17.9746 10.0432C17.9726 10.8474 17.7745 11.6293 17.4048 12.203L17.4048 12.2039C16.5205 13.5837 15.4573 14.6765 14.2864 15.4502L14.0517 15.6C12.7883 16.3712 11.4142 16.778 10.0077 16.7746C7.28828 16.7677 4.66802 15.2218 2.81236 12.4404L2.63432 12.1675C2.26671 11.5872 2.07326 10.8037 2.07522 10.001C2.07695 9.29863 2.22847 8.61192 2.51457 8.06365L2.64501 7.83741C3.58825 6.36555 4.73513 5.22009 5.99911 4.44041L5.99814 4.43943C7.26111 3.66867 8.63508 3.26338 10.0411 3.26679ZM10.0337 6.27459C7.95484 6.26964 6.27956 7.94604 6.27441 10.0153C6.2693 12.0846 7.9363 13.7693 10.0151 13.7746C12.0941 13.7797 13.7693 12.1033 13.7744 10.0338C13.7795 7.96445 12.1126 6.27973 10.0337 6.27459Z"
                    fill="#8A8A8A"
                    stroke="#8A8A8A"
                    strokeWidth="0.766667"
                  />
                  <path
                    d="M10.0294 8.02515C11.126 8.02786 12.0271 8.93346 12.0244 10.0301C12.0215 11.1248 11.1177 12.0191 10.0195 12.0163C8.92306 12.0136 8.03078 11.1166 8.03324 10.0202C8.03597 8.9144 8.93364 8.02244 10.0294 8.02515Z"
                    fill="#8A8A8A"
                    stroke="#8A8A8A"
                    strokeWidth="0.766667"
                  />
                </svg>
              </div>
              <Badge variant="on_track" className="!h-7 !px-2 !text-[11px]">
                {availableBalance.status}
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-[400] text-[12px] text-[#6C6C6C]">
              Next payout
            </span>
            <span className="font-medium text-gray-900">
              {availableBalance.date}
            </span>
          </div>
        </div>

        <div className="flex min-h-[186px] shadow-sm flex-col  rounded-lg bg-white p-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[12px] font-medium text-[#6C6C6C]">
                Total Expected Balance
              </span>
              <h2 className="mt-2 text-xl font-bold text-gray-900">
                {expectedBalance.amount}
              </h2>
            </div>
            <div className="relative flex h-10 w-10 items-center justify-center">
              <svg className="h-10 w-10 -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-gray-100"
                  fill="transparent"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeDasharray={100}
                  strokeDashoffset={100 - expectedBalance.percentage}
                  strokeLinecap="round"
                  className="text-[#04802E]"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-gray-700">
                {expectedBalance.percentage}%
              </span>
            </div>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="flex justify-between text-[12px] text-gray-500">
              <span className="font-[400] text-[12px] text-[#6C6C6C]">
                Target Balance
              </span>
              <span className="font-semibold text-gray-800">
                {expectedBalance.targetBalance}
              </span>
            </div>
            <div className="flex justify-between text-[12px] text-gray-500">
              <span className="font-[400] text-[12px] text-[#6C6C6C]">
                Base commission (This month)
              </span>
              <span className="font-semibold text-gray-800">
                {expectedBalance.expectedCommission}
              </span>
            </div>
          </div>
          <button
            onClick={() => setBreakdown(true)}
            type="button"
            className="mt-auto pt-3 text-left text-[12px] font-semibold flex items-center gap-[4px] text-[#04907E]"
          >
            See how it is calculated
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.10535 5.51612L11.3956 5.38765L11.524 9.67786"
                stroke-width="1.07143"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#04907E"
              />
              <path
                d="M5.5675 11.5753L11.337 5.44952"
                stroke-width="1.07143"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#04907E"
              />
            </svg>
          </button>
        </div>

        <div className="flex min-h-[186px] shadow-sm flex-col justify-between rounded-lg  bg-white p-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Badge variant="on_track" className="!h-7 !px-2 !text-[11px]">
                Quick Bonus
              </Badge>
              <span className="text-[12px] font-[400] text-[#6C6C6C] flex items-center gap-[4px]">
                {/* {quickBonus.unlockAmount} */} Unlock{" "}
                <span className="font-[500] text-[12px] text-[#000000]">
                  ₦30,000
                </span>
                bonus
              </span>
            </div>
            <p className="mt-6 text-[12px] leading-relaxed text-gray-500">
              {quickBonus.description}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 self-start text-[12px] font-semibold text-[#04907E]"
          >
            <span>Get Started</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.21484 2.96497L10.2498 5.99997L7.21484 9.03497"
                stroke="#04907E"
                stroke-width="1.07143"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.75 6L10.165 6"
                stroke="#04907E"
                stroke-width="1.07143"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        className=" min-w-[750px] bg-white"
        open={breakdown}
        onOpenChange={setBreakdown}
      >
        <div className="space-y-[32px]">
          <div className="space-y-[24px]">
            <div className="space-y-[12px]">
              <p className="font-[600] text-[24px] text-[#131313]">
                Earnings Breakdown
              </p>
              <p className="font-[400] text-[16px] text-[#363636]">
                Simple breakdown of your expected payout this month.
              </p>
            </div>
            <div className="space-y-[32px]">
              <div className="space-y-[12px] p-[12px] rounded-[8px] border border-[#E5E7EB] shadow-[0_4px_30px_rgb(0,0,0,0.04)] bg-white">
                <div className="space-y-[8px]">
                  <p className="font-[500] text-[12px] text-[#6C6C6C]">
                    Available Balance
                  </p>

                  <Badge className="bg-[#FEF6E7] font-[500] !text-[10px] text-[#363636]">
                    Your commissions from the previous month
                  </Badge>
                </div>

                <p className="font-[600] text-[20px] text-[#000000]">
                  ₦142,000.00
                </p>
              </div>
            </div>

            <div className="space-y-[32px]">
              <div className="space-y-[12px] border border-[#E5E7EB] shadow-[0_4px_30px_rgb(0,0,0,0.04)] rounded-[8px] p-[10px]">
                <div className="space-y-[12px] p-[12px] rounded-[8px]">
                  <div className="space-y-[8px]">
                    <p className="font-[500] text-[12px] text-[#6C6C6C]">
                      Base commission For This Month (March)
                    </p>

                    <Badge className="bg-[#FEF6E7] font-[500] !text-[10px] text-[#363636]">
                      The estimated earnings for this month if your targets are
                      achieved
                    </Badge>
                  </div>

                  <p className="font-[600] text-[20px] text-[#000000]">
                    ₦168,000.00
                  </p>
                </div>

                <div className="space-y-[12px] p-[12px]  ">
                  {commision.map((item, i) => (
                    <div
                      key={i}
                      className="space-y-[10px] bg-[#faf8f8] rounded-[8px] p-[10px]"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-[400] text-[12px] text-[#363636]">
                          {item.title}
                        </p>

                        <p className="font-[600] text-[14px] text-[#000000]">
                          {item.amount}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="font-[500] text-[10px] text-[#6C6C6C]">
                          {item.desc}
                        </p>
                        <p className="font-[500] text-[10px] text-[#6C6C6C]">
                          {item.interest}
                        </p>
                      </div>

                      <div className="w-full h-[6px] bg-[#C4E5E199] rounded-full">
                        <div
                          className={` bg-[#04802E] h-full rounded-full     ${item.interest === "58.4%" ? "w-[60%]" : item.interest === "30.9%" ? "w-[30%]" : item.interest === "10.7%" ? "w-[10%]" : ""}   `}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-[8px] rounded-[8px]  p-[12px] border border-[#E5E7EB] shadow-[0_4px_30px_rgb(0,0,0,0.04)]">
                <div className="space-y-[12px] rounded-[8px] p-[10px]">
                  <div className="space-y-[8px]">
                    <p className="font-[500] text-[12px] text-[#6C6C6C]">
                      Total Expected Balance
                    </p>

                    <Badge className="bg-[#FEF6E7] font-[500] !text-[10px] text-[#363636]">
                      This is made up of your available account balance and this
                      month&apos;s base commission
                    </Badge>
                  </div>

                  <p className="font-[600] text-[20px] text-[#000000]">
                    ₦310,400.00
                  </p>
                </div>

                <div className="space-y-[10px] bg-[#faf8f8] p-[10px] rounded-[8px]">
                  <Total title="Available balance" amount="₦142,000.00" />
                  <div className="flex justify-end items-end">
                    <p className="font-[500] text-[14px] text-[#000000]">+</p>
                  </div>

                  <Total title="Base commission" amount="₦168,000.00" />

                  <div className="flex justify-end items-end">
                    <p className="font-[500] text-[14px] text-[#000000]">=</p>
                  </div>

                  <Total title="Total expected balance" amount="₦310,400.00" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="font-[500] text-[12px] text-[#363636]">
              Payout Schedule
              <span className="font-[500] text-[12px] text-[#6C6C6C]">
                :Base commission settles monthly to your account balance. It is
                paid in one lump-sum on the last business day of the month. If
                you hit 100% of all KPIs before month-end, bonus pays early
                within 24 hrs.
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

type TotalProps = {
  title: string;
  amount: string;
};

const Total = ({ title, amount }: TotalProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-[400] text-[12px] text-[#363636]">{title} </p>
      <p className="font-[600] text-[14px] text-[#000000]">{amount} </p>
    </div>
  );
};
