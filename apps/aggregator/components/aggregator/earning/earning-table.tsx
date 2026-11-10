"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, SearchIcon } from "@/components/icons/svgs";
import Input from "@/components/ui/input";
import React, { useState, useMemo } from "react";
import { SearchInput } from "@/components/ui/search-input";
import Badge from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";

export interface EarningItem {
  id: string;
  businessName: string;
  avatar?: string;
  kycLevel?: string;
  earningType: "Transaction" | "Onboarding";
  balanceBefore?: string;
  balanceAfter: string;
  earnings: string;
  status: "Successful" | "Completed";
  date?: string;
}

interface EarningsTableProps {
  initialData?: EarningItem[];
  itemsPerPage?: number;
}

const MOCK_ONBOARDING_DATA: EarningItem[] = [
  {
    id: "1",
    businessName: "De-Light SuperStores",
    avatar: "/images/joshua.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦250,250.00",
    earnings: "₦250.00",
    status: "Completed",
  },
  {
    id: "2",
    businessName: "KFC Holdings",
    avatar: "/images/grace.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦120,120.00",
    earnings: "₦120.00",
    status: "Completed",
  },
  {
    id: "3",
    businessName: "Proens Stores",
    avatar: "/images/ben.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦120,120.00",
    earnings: "₦120.00",
    status: "Completed",
  },
  {
    id: "4",
    businessName: "God’s Owned Business",
    avatar: "/images/agent.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦50,050.00",
    earnings: "₦50.00",
    status: "Completed",
  },
  {
    id: "5",
    businessName: "Swift Logistics",
    avatar: "/images/zinny.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "6",
    businessName: "Emeka & co.",
    avatar: "/images/tunde.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "7",
    businessName: "Big Bites Restaurants",
    avatar: "/images/joshua.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "8",
    businessName: "Grace Beauty Hub",
    avatar: "/images/grace.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "9",
    businessName: "Mains Cosmetics",
    avatar: "/images/ben.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "10",
    businessName: "Prime Med. Pharmacy",
    avatar: "/images/agent.svg",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
];

const MOCK_TRANSACTION_DATA: EarningItem[] = [
  {
    id: "t1",
    businessName: "De-Light SuperStores",
    earningType: "Transaction",
    balanceBefore: "₦250,000.00",
    earnings: "₦250.00",
    balanceAfter: "₦250,250.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t2",
    businessName: "KFC Holdings",
    earningType: "Transaction",
    balanceBefore: "₦120,000.00",
    earnings: "₦120.00",
    balanceAfter: "₦120,120.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t3",
    businessName: "Proens Stores",
    earningType: "Transaction",
    balanceBefore: "₦120,000.00",
    earnings: "₦120.00",
    balanceAfter: "₦120,120.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t4",
    businessName: "God’s Owned Business",
    earningType: "Transaction",
    balanceBefore: "₦50,000.00",
    earnings: "₦50.00",
    balanceAfter: "₦50,050.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t5",
    businessName: "Swift Logistics",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t6",
    businessName: "Emeka & co.",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t7",
    businessName: "Big Bites Restaurants",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t8",
    businessName: "Grace Beauty Hub",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t9",
    businessName: "Mains Cosmetics",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t10",
    businessName: "Prime Med. Pharmacy",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
];

export const EarningsTableSection: React.FC<EarningsTableProps> = ({
  itemsPerPage = 10,
}) => {
  const [activeTab, setActiveTab] = useState<"transaction" | "onboarding">(
    "transaction",
  );
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("08-05-2026");
  const [currentPage, setCurrentPage] = useState(1);

  const rawData =
    activeTab === "transaction" ? MOCK_TRANSACTION_DATA : MOCK_ONBOARDING_DATA;

  const filteredData = useMemo(() => {
    return rawData.filter((item) =>
      item.businessName.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [rawData, searchValue]);

  const totalItems = filteredData.length;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleTabSwitch = (tab: "transaction" | "onboarding") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleTabsValueChange = (value: string) => {
    if (value === "transaction" || value === "onboarding") {
      handleTabSwitch(value);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabsValueChange}
      className="w-full space-y-[12px]"
    >
      <div className="border border-[#F2F4F7] bg-white p-[16px] rounded-[14px]">
        <NavTabsList className="w-full sm:w-auto">
          <NavTabsTrigger
            value="transaction"
            className="h-auto flex-1 px-6 py-2.5 text-[13px] sm:flex-initial"
          >
            Transaction Earnings
          </NavTabsTrigger>
          <NavTabsTrigger
            value="onboarding"
            className="h-auto flex-1 px-6 py-2.5 text-[13px] sm:flex-initial"
          >
            Onboarding Earnings
          </NavTabsTrigger>
        </NavTabsList>
      </div>

      <TabsContent value={activeTab}>
        <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="w-full md:w-1/2 p-4 border-b border-[#F3F4F6] flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="w-full">
              <SearchInput
                placeholder="Search business name"
                value={searchValue}
                onChange={(value) => {
                  setSearchValue(value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="w-full sm:w-50">
              <div className="w-full px-2 relative flex items-center justify-start bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none">
                <input
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  className="h-10 px-4 font-[500] text-[14px] text-[#A8A8A8] border-none outline-0"
                />
                <CalendarIcon className="w-4 h-4 text-[#9CA3AF]" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  {activeTab === "onboarding" && (
                    <TableHead>KYC Level</TableHead>
                  )}
                  <TableHead>Earning Type</TableHead>
                  {activeTab === "transaction" && (
                    <TableHead>Balance Before</TableHead>
                  )}
                  {activeTab === "onboarding" && (
                    <TableHead>Balance After</TableHead>
                  )}
                  <TableHead>Earnings</TableHead>
                  <TableHead>Balance After</TableHead>
                  <TableHead>Status</TableHead>
                  {activeTab === "transaction" && <TableHead>Date</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {activeTab === "onboarding" && item.avatar && (
                            <img
                              src={item.avatar}
                              alt=""
                              className="w-7 h-7 shrink-0 rounded-full object-cover"
                            />
                          )}
                          <span>{item.businessName}</span>
                        </div>
                      </TableCell>
                      {activeTab === "onboarding" && (
                        <TableCell>
                          <Badge variant="tier">{item.kycLevel}</Badge>
                        </TableCell>
                      )}

                      <TableCell>
                        {activeTab === "onboarding" ? (
                          <Badge variant="onboarding">Onboarding</Badge>
                        ) : (
                          <Badge variant="transaction">Transaction</Badge>
                        )}
                      </TableCell>

                      {activeTab === "transaction" && (
                        <TableCell>{item.balanceBefore}</TableCell>
                      )}

                      {activeTab === "onboarding" && (
                        <TableCell>{item.balanceAfter}</TableCell>
                      )}

                      <TableCell>{item.earnings}</TableCell>
                      <TableCell>{item.balanceAfter}</TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Completed"
                              ? "completed"
                              : "successful"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>

                      {activeTab === "transaction" && (
                        <TableCell>{item.date}</TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={activeTab === "onboarding" ? 7 : 7}>
                      No earnings activity found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-4 p-4">
          <Pagination
            currentPage={currentPage}
            pageSize={itemsPerPage}
            totalItems={totalItems}
            itemLabel={
              activeTab === "onboarding"
                ? "onboarding earnings"
                : "transaction earnings"
            }
            onPageChange={setCurrentPage}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default EarningsTableSection;
