"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import React, { useMemo, useState } from "react";
import SearchBar from "@/components/ui/search-bar";

const PAGE_SIZE = 5;

interface ApprovalItem {
  id: string;
  business_name: string;
  related_name: string;
  business_type: "Merchant" | "Agent";
  requested_on: string;
  status: "Pending" | "Approved" | "Rejected";
  avatar: string;
}

const mockApprovals: ApprovalItem[] = [
  {
    id: "1",
    business_name: "De-Light SuperStores",
    related_name: "De-Light SuperStores",
    business_type: "Merchant",
    requested_on: "Aug 1,2026 at 09:15am",
    status: "Pending",
    avatar: "/images/joshua.svg",
  },
  {
    id: "2",
    business_name: "KFC Holdings",
    related_name: "God's Owned Business",
    business_type: "Merchant",
    requested_on: "Aug 2,2026 at 11:30am",
    status: "Approved",
    avatar: "/images/ben.svg",
  },
  {
    id: "3",
    business_name: "Proens Stores",
    related_name: "God's Owned Business",
    business_type: "Agent",
    requested_on: "Aug 3,2026 at 02:45pm",
    status: "Rejected",
    avatar: "/images/agent.svg",
  },
  {
    id: "4",
    business_name: "God's Owned Business",
    related_name: "God's Owned Business",
    business_type: "Merchant",
    requested_on: "July 15,2026 at 10:00am",
    status: "Approved",
    avatar: "/images/grace.svg",
  },
  {
    id: "5",
    business_name: "Swift Logistics",
    related_name: "God's Owned Business",
    business_type: "Merchant",
    requested_on: "July 20,2026 at 04:20pm",
    status: "Pending",
    avatar: "/images/tunde.svg",
  },
  {
    id: "6",
    business_name: "Emeka & co.",
    related_name: "Swift Logistics",
    business_type: "Agent",
    requested_on: "July 28,2026 at 08:45am",
    status: "Approved",
    avatar: "/images/zinny.svg",
  },
  {
    id: "7",
    business_name: "Big Bites Restaurants",
    related_name: "Emeka & co.",
    business_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
    avatar: "/images/joshua.svg",
  },
  {
    id: "8",
    business_name: "Grace Beauty Hub",
    related_name: "Big Bites Restaurants",
    business_type: "Merchant",
    requested_on: "May 22,2026 at 01:10pm",
    status: "Pending",
    avatar: "/images/ben.svg",
  },
  {
    id: "9",
    business_name: "Mains Cosmetics",
    related_name: "Grace Beauty Hub",
    business_type: "Agent",
    requested_on: "June 5,2026 at 03:05pm",
    status: "Approved",
    avatar: "/images/agent.svg",
  },
  {
    id: "10",
    business_name: "Prime Med. Pharmacy",
    related_name: "Prime Med. Pharmacy",
    business_type: "Agent",
    requested_on: "July 31,2026 at 07:50pm",
    status: "Pending",
    avatar: "/images/grace.svg",
  },
];

export function BusinessApproval() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredApprovals = useMemo(() => {
    return mockApprovals.filter((item) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          item.business_name.toLowerCase().includes(q) ||
          item.related_name.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (statusFilter && statusFilter !== "all") {
        const normalized =
          statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1);
        if (item.status !== normalized) return false;
      }

      if (typeFilter && typeFilter !== "all") {
        const normalized =
          typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1);
        if (item.business_type !== normalized) return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const paginatedApprovals = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredApprovals.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredApprovals]);

  const BUSINESS_APPROVAL = [
    { value: "128", desc: "Transfer Request" },
    { value: "128", desc: "In Review" },
    { value: "128", desc: "Approved" },
    { value: "1", desc: "Rejected" },
  ];

  const getStatusBadge = (status: ApprovalItem["status"]) => {
    if (status === "Pending") {
      return <Badge variant="transfer_pending">Pending</Badge>;
    }
    if (status === "Approved") {
      return <Badge variant="transfer_approved">Approved</Badge>;
    }
    return <Badge variant="transfer_rejected">Rejected</Badge>;
  };

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-4 gap-[16px] max-lg:grid-cols-2">
        {BUSINESS_APPROVAL.map((item, i) => (
          <div
            key={i}
            className="bg-white min-h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
          >
            <p className="font-[600] text-[20px] text-[#000000]">
              {item.value}
            </p>
            <p className="font-[500] text-[10px] text-[#6C6C6C]">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
        <div className="w-[60%] max-lg:w-full">
          <SearchBar
            searchPlaceholder="Search business name..."
            searchValue={searchQuery}
            onSearchChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
            categories={[]}
            products={[]}
            statusOptions={[
              { value: "all", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            statusValue={statusFilter}
            statusPlaceholder="All Status"
            onStatusChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
            dateOptions={[
              { value: "all", label: "All Types" },
              { value: "merchant", label: "Merchant" },
              { value: "agent", label: "Agent" },
            ]}
            dateValue={typeFilter}
            datePlaceholder="All Types"
            onDateChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedApprovals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                      <img
                        src={item.avatar}
                        alt={`${item.business_name} avatar`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-[500] text-[#6C6C6C]">
                        {item.business_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.related_name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.business_type === "Merchant" ? "merchant" : "agent"
                      }
                    >
                      {item.business_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.requested_on}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
              {filteredApprovals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    No requests match your filters.
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
          totalItems={filteredApprovals.length}
          itemLabel="Requests"
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
