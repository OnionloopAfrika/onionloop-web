"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";

const PAGE_SIZE = 5;

interface RevenueItem {
  business_owner: string;
  business_name: string;
  earning_type: "Onboarding" | "Transaction";
  amount: number;
  date: string;
  avatar: string;
}

const mockRevenue: RevenueItem[] = [
  {
    business_owner: "Joseph Maduabuchi",
    business_name: "De-Light SuperStores",
    earning_type: "Onboarding",
    amount: 250,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/joshua.svg",
  },
  {
    business_owner: "Oluwafunmiike Robbin",
    business_name: "KFC Holdings",
    earning_type: "Onboarding",
    amount: 120,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/grace.svg",
  },
  {
    business_owner: "Oladimeji Yemisi",
    business_name: "Proens Stores",
    earning_type: "Onboarding",
    amount: 120,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/ben.svg",
  },
  {
    business_owner: "John Chinedu",
    business_name: "God's Owned Business",
    earning_type: "Transaction",
    amount: 50,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/agent.svg",
  },
  {
    business_owner: "Grace Wanjiku",
    business_name: "Swift Logistics",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/zinny.svg",
  },
  {
    business_owner: "Philip Tonbara",
    business_name: "Emeka & co.",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/tunde.svg",
  },
  {
    business_owner: "Joshua Agbasi",
    business_name: "Big Bites Restaurants",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/joshua.svg",
  },
  {
    business_owner: "Mary Adebayo",
    business_name: "Grace Beauty Hub",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/grace.svg",
  },
  {
    business_owner: "David Iwalewa",
    business_name: "Mains Cosmetics",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/ben.svg",
  },
  {
    business_owner: "Hannah Nwankwo",
    business_name: "Prime Med. Pharmacy",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "/images/agent.svg",
  },
];

export function RevenueBalance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [earningFilter, setEarningFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRevenue = useMemo(() => {
    return mockRevenue.filter((item) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          item.business_owner.toLowerCase().includes(q) ||
          item.business_name.toLowerCase().includes(q) ||
          item.earning_type.toLowerCase().includes(q) ||
          String(item.amount).includes(q) ||
          item.date.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (earningFilter && earningFilter !== "all") {
        const typeMap: Record<string, RevenueItem["earning_type"]> = {
          onboarding: "Onboarding",
          transaction: "Transaction",
        };
        if (item.earning_type !== typeMap[earningFilter]) return false;
      }

      return true;
    });
  }, [searchQuery, earningFilter]);

  const paginatedRevenue = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredRevenue.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredRevenue]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getEarningBadge = (type: RevenueItem["earning_type"]) => {
    if (type === "Onboarding") {
      return <Badge variant="onboarding">Onboarding</Badge>;
    }
    return <Badge variant="transaction">Transaction</Badge>;
  };

  return (
    <>
      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
        <div className="flex items-center gap-3 max-lg:flex-col w-fit p-4">
          <SearchInput
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
            categories={[]}
            products={[]}
            employees={[]}
            chats={[]}
            placeholder="Search business name"
          />

          <Select
            value={earningFilter}
            onValueChange={(value) => {
              setEarningFilter(value);
              setCurrentPage(1);
            }}
            options={[
              { value: "all", label: "All Earning Types" },
              { value: "onboarding", label: "Onboarding" },
              { value: "transaction", label: "Transaction" },
            ]}
            placeholder="All Earning Types"
          />
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Business Owner</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Earning Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRevenue.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Image
                      src={item.avatar}
                      alt={item.business_owner}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-[500] text-[#6C6C6C]">
                        {item.business_owner}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.business_name}</TableCell>
                  <TableCell>{getEarningBadge(item.earning_type)}</TableCell>
                  <TableCell>{formatAmount(item.amount)}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
              {filteredRevenue.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    No revenue items match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-4 px-4 py-4">
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={filteredRevenue.length}
          itemLabel="Accounts"
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
