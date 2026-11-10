"use client";

import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useMemo, useState } from "react";
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
    avatar: "",
  },
  {
    business_owner: "Oluwafunmiike Robbin",
    business_name: "KFC Holdings",
    earning_type: "Onboarding",
    amount: 120,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Oladimeji Yemisi",
    business_name: "Proens Stores",
    earning_type: "Onboarding",
    amount: 120,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "John Chinedu",
    business_name: "God's Owned Business",
    earning_type: "Transaction",
    amount: 50,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Grace Wanjiku",
    business_name: "Swift Logistics",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Philip Tonbara",
    business_name: "Emeka & co.",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Joshua Agbasi",
    business_name: "Big Bites Restaurants",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Mary Adebayo",
    business_name: "Grace Beauty Hub",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "David Iwalewa",
    business_name: "Mains Cosmetics",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Hannah Nwankwo",
    business_name: "Prime Med. Pharmacy",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getEarningBadge = (type: RevenueItem["earning_type"]) => {
    if (type === "Onboarding") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#C6DDF7] text-[#0D5EBA]">
          Onboarding
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#B5E3C4] text-[#024E44]">
        Transaction
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
      <div className="grid grid-cols-[2fr_1fr] gap-3 p-4 w-[40%] max-lg:w-full max-lg:grid-cols-1">
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
              <TableHead>
                Business Owner
              </TableHead>
              <TableHead>
                Business Name
              </TableHead>
              <TableHead>
                Earning Type
              </TableHead>
              <TableHead>
                Amount
              </TableHead>
              <TableHead>
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRevenue.map((item, i) => (
              <TableRow
                key={i}
              >
                <TableCell>
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.business_owner}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[12px] font-medium text-gray-600">
                      {getInitials(item.business_owner)}
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-[500] text-[#6C6C6C]">
                      {item.business_owner}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {item.business_name}
                </TableCell>
                <TableCell>
                  {getEarningBadge(item.earning_type)}
                </TableCell>
                <TableCell>
                  {formatAmount(item.amount)}
                </TableCell>
                <TableCell>
                  {item.date}
                </TableCell>
              </TableRow>
            ))}
            {filteredRevenue.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                >
                  No revenue items match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="border-t border-gray-100 px-4 py-4">
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={filteredRevenue.length}
          itemLabel="Accounts"
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
