"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon } from "@/components/icons/svgs";
import Badge from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Image from "next/image";
import React, { useState, useMemo } from "react";

export interface BusinessItem {
  id: string;
  owner: string;
  avatar: string;
  name: string;
  kycLevel: string;
  phoneNumber: string;
  type: "Agent" | "Merchant";
  perfScore: number;
}

interface BusinessPerformanceTableProps {
  initialData?: BusinessItem[];
  itemsPerPage?: number;
}

const MOCK_BUSINESSES: BusinessItem[] = [
  {
    id: "1",
    owner: "Joseph Maduabuchi",
    avatar: "/images/joshua.svg",
    name: "De-Light SuperStores",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Agent",
    perfScore: 91,
  },
  {
    id: "2",
    owner: "Oluwafunmiike Robbin",
    avatar: "/images/grace.svg",
    name: "KFC Holdings",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Merchant",
    perfScore: 91,
  },
  {
    id: "3",
    owner: "Oladimejii Yemisi",
    avatar: "/images/ben.svg",
    name: "Proens Stores",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Merchant",
    perfScore: 91,
  },
  {
    id: "4",
    owner: "John Chinedu",
    avatar: "/images/agent.svg",
    name: "God’s Owned Business",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Merchant",
    perfScore: 91,
  },
  {
    id: "5",
    owner: "Grace Wanjiku",
    avatar: "/images/zinny.svg",
    name: "Swift Logistics",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Merchant",
    perfScore: 91,
  },
  {
    id: "6",
    owner: "Philip Tonbara",
    avatar: "/images/tunde.svg",
    name: "Emeka & co.",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Merchant",
    perfScore: 91,
  },
  {
    id: "7",
    owner: "Joshua Agbasi",
    avatar: "/images/joshua.svg",
    name: "Big Bites Restaurants",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Merchant",
    perfScore: 91,
  },
  {
    id: "8",
    owner: "Mary Adebayo",
    avatar: "/images/grace.svg",
    name: "Grace Beauty Hub",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Merchant",
    perfScore: 58,
  },
  {
    id: "9",
    owner: "David Iwalewa",
    avatar: "/images/ben.svg",
    name: "Mains Cosmetics",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Agent",
    perfScore: 58,
  },
  {
    id: "10",
    owner: "Hannah Nwankwo",
    avatar: "/images/agent.svg",
    name: "Prime Med. Pharmacy",
    kycLevel: "TIER 3",
    phoneNumber: "+234 816 249 0242",
    type: "Agent",
    perfScore: 58,
  },
];

const perfScoreOptions = [
  { value: "all", label: "All Perf. Score" },
  { value: "high", label: "High (70 - 100)" },
  { value: "low", label: "Low (0 - 69)" },
];

const businessTypeOptions = [
  { value: "all", label: "All Businesses" },
  { value: "Agent", label: "Agent" },
  { value: "Merchant", label: "Merchant" },
  { value: "Collectors", label: "Collectors" },
  { value: "Agent-and-Collectors", label: "Agent and Collectors" },
];

export const BusinessPerformanceTable: React.FC<
  BusinessPerformanceTableProps
> = ({ initialData = MOCK_BUSINESSES, itemsPerPage = 10 }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPerfScore, setSelectedPerfScore] = useState("all");
  const [selectedBusinessType, setSelectedBusinessType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBusinesses = useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchValue.toLowerCase());

      const matchesType =
        selectedBusinessType === "all" || item.type === selectedBusinessType;

      const matchesPerf =
        selectedPerfScore === "all" ||
        (selectedPerfScore === "high" && item.perfScore >= 70) ||
        (selectedPerfScore === "low" && item.perfScore < 70);

      return matchesSearch && matchesType && matchesPerf;
    });
  }, [initialData, searchValue, selectedBusinessType, selectedPerfScore]);

  const totalItems = filteredBusinesses.length;
  const paginatedBusinesses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBusinesses.slice(start, start + itemsPerPage);
  }, [filteredBusinesses, currentPage, itemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden font-sans">
      <div className="p-4 border-b border-[#F3F4F6] flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:max-w-xs">
          <Input
            type="text"
            placeholder="Search business name"
            value={searchValue}
            onChange={handleSearchChange}
            prefixicon={<SearchIcon />}
            className="text-xs !bg-[#F9FAFB] !border-[#E5E7EB]"
          />
        </div>
        <div className="w-full sm:w-44">
          <Select
            options={perfScoreOptions}
            value={selectedPerfScore}
            onValueChange={(val) => {
              setSelectedPerfScore(val);
              setCurrentPage(1);
            }}
            placeholder="All Perf. Score"
          />
        </div>
        <div className="w-full sm:w-44">
          <Select
            options={businessTypeOptions}
            value={selectedBusinessType}
            onValueChange={(val) => {
              setSelectedBusinessType(val);
              setCurrentPage(1);
            }}
            placeholder="All Businesses"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Business Owner</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>KYC Level</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Perf. Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBusinesses.length > 0 ? (
              paginatedBusinesses.map((item) => {
                const isHighPerf = item.perfScore >= 70;
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 w-10">
                        <Image
                          src={item.avatar}
                          alt={item.owner}
                          width={28}
                          height={28}
                          className="w-7 h-7 shrink-0 rounded-full object-cover"
                        />
                        {/* <span className="font-semibold text-[#111827]">{item.owner}</span> */}
                      </div>
                    </TableCell>

                    <TableCell>{item.owner}</TableCell>
                    <TableCell>{item.name}</TableCell>

                    <TableCell>
                      <Badge variant="tier">
                        {item.kycLevel}
                      </Badge>
                    </TableCell>

                    <TableCell>{item.phoneNumber}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          item.type === "Agent" ? "agent" : "merchant"
                        }
                      >
                        {item.type}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isHighPerf ? "bg-[#024E44]" : "bg-[#CB1A14]"
                            }`}
                            style={{ width: `${item.perfScore}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-[#6C6C6C]">
                          {item.perfScore}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  No businesses match your search parameters.
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
          itemLabel="businesses"
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BusinessPerformanceTable;
