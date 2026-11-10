"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import { PlusIcon } from "@/components/icons/svgs";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import { BUSINESSES } from "@/lib/mockdata/businesses";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

interface BusinessOwnerProps {
  onAddBusiness?: () => void;
}

const MONTH_MAP: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseBusinessDate(dateStr: string): Date {
  const match = dateStr.match(
    /^([A-Za-z]{3})\s+(\d{1,2}),(\d{4})\s+at\s+(.+)$/,
  );
  if (!match) return new Date(NaN);
  const [, mmm, dd, yyyy, time] = match;
  const month = MONTH_MAP[mmm];
  if (month === undefined) return new Date(NaN);
  const timeStr = time.trim();
  return new Date(
    `${yyyy}-${String(month + 1).padStart(2, "0")}-${String(dd).padStart(2, "0")}T${timeStr}`,
  );
}

export function BusinessOwner({ onAddBusiness }: BusinessOwnerProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBusinesses = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    return BUSINESSES.filter((biz) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          biz.business_owner.toLowerCase().includes(q) ||
          biz.business_name.toLowerCase().includes(q) ||
          biz.phone_number.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (statusFilter && statusFilter !== "all") {
        if (biz.status !== statusFilter) return false;
      }

      if (dateFilter) {
        const d = parseBusinessDate(biz.date);
        if (isNaN(d.getTime())) return false;
        if (dateFilter === "this-month") {
          if (d.getMonth() !== currentMonth || d.getFullYear() !== currentYear)
            return false;
        } else if (dateFilter === "last-month") {
          if (d.getMonth() !== lastMonth || d.getFullYear() !== lastMonthYear)
            return false;
        }
      }

      return true;
    });
  }, [searchQuery, statusFilter, dateFilter]);

  const paginatedBusinesses = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredBusinesses.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredBusinesses]);

  const STAT = [
    {
      value: "128",
      description: "Total Business",
    },
    {
      value: "96",
      description: "Active Business",
    },
    {
      value: "18",
      description: "Inactive Business",
    },
    {
      value: "90",
      description: "Total Business",
    },
    {
      value: "38",
      description: "Total",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-5 gap-[16px] max-lg:grid-cols-2">
        {STAT.map((item, i) => (
          <div
            key={i}
            className="bg-white min-h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
          >
            <p className="font-[600] text-[20px] text-[#000000]">
              {item.value}
            </p>
            <p className="font-[500] text-[10px] text-[#6C6C6C]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full bg-white mt-[40px] font-sans rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full flex-1">
            <div className="relative w-full sm:max-w-[280px]">
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
                placeholder="Search business owner, name, phone..."
              />
            </div>

            <div className="w-[200px] max-lg:w-full">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
                options={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                placeholder="All Status"
              />
            </div>

            <div className="w-[200px] max-lg:w-full">
              <Select
                value={dateFilter}
                onValueChange={(value) => {
                  setDateFilter(value);
                  setCurrentPage(1);
                }}
                options={[
                  { value: "this-month", label: "This Month" },
                  { value: "last-month", label: "Last Month" },
                ]}
                placeholder="This Month"
              />
            </div>
          </div>

          <button
            onClick={onAddBusiness}
            className="h-[40px] px-4 bg-[#024E44] hover:bg-[#0a4a3e] text-white text-[14px] font-medium rounded-lg flex items-center gap-2 whitespace-nowrap"
          >
            <PlusIcon />
            Add New Business
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Business Owner</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>KYC Level</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBusinesses.map((biz) => (
                <TableRow
                  onClick={() =>
                    router.push(`/aggregator/business/business-owner/${biz.id}`)
                  }
                  key={biz.id}
                >
                  <TableCell>
                    {biz.avatar ? (
                      <img
                        src={biz.avatar}
                        alt={biz.business_owner}
                        className="w-9 h-9 max-w-none rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[14px] font-medium text-[#6C6C6C]">
                        {getInitials(biz.business_owner)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span>{biz.business_owner}</span>
                    </div>
                  </TableCell>
                  <TableCell>{biz.business_name}</TableCell>
                  <TableCell>
                    <Badge variant="tier">{biz.hyc_level}</Badge>
                  </TableCell>
                  <TableCell>{biz.phone_number}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        biz.business_type === "Merchant" ? "merchant" : "agent"
                      }
                    >
                      {biz.business_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{biz.date}</TableCell>
                  <TableCell>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBusinesses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8}>
                    No businesses match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 py-4">
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={filteredBusinesses.length}
          itemLabel="businesses"
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
