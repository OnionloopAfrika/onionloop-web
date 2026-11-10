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
import Image from "next/image";
import React, { useState, useMemo } from "react";

import Select from "../ui/select";
import { SearchInput } from "../ui/search-input";
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from "../ui/tabs";

export interface BusinessItem {
  id: string;
  owner: string;
  avatar: string;
  name: string;
  type: string;
  volume: string;
  commission: string;
  kycLevel: string;
  activeStatus: string;
  inactiveStatus: string;
}

interface BusinessTableProps {
  businesses: BusinessItem[];
  activeTab: "active" | "inactive";
  onTabChange: (tab: "active" | "inactive") => void;
  itemsPerPage?: number;
}

const filterOptions = [
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
  { value: "all-time", label: "All time" },
];

export const BusinessTable: React.FC<BusinessTableProps> = ({
  businesses,
  activeTab,
  onTabChange,
  itemsPerPage = 10,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("this-month");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [businesses, searchValue]);

  const totalItems = filteredBusinesses.length;
  const paginatedBusinesses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBusinesses.slice(start, start + itemsPerPage);
  }, [filteredBusinesses, currentPage, itemsPerPage]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleTabSwitch = (tab: "active" | "inactive") => {
    onTabChange(tab);
    setCurrentPage(1);
  };

  const handleTabsValueChange = (value: string) => {
    if (value === "active" || value === "inactive") {
      handleTabSwitch(value);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabsValueChange}
      className="mt-6 space-y-[12px]"
    >
      <div className="w-full bg-white p-[16px] shadow-sm rounded-2xl">
        <NavTabsList className="inline-flex">
          <NavTabsTrigger value="active">Active Businesses</NavTabsTrigger>
          <NavTabsTrigger value="inactive">Inactive Businesses</NavTabsTrigger>
        </NavTabsList>
      </div>

      <TabsContent value={activeTab}>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="w-full lg:w-1/2 p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="w-full">
              <SearchInput
                placeholder="Search business name"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-start justify-start w-full sm:w-60">
              <Select
                options={filterOptions}
                value={selectedTimeframe}
                onValueChange={setSelectedTimeframe}
                placeholder="Select period"
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
                  <TableHead>Business Type</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>KYC Level</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBusinesses.length > 0 ? (
                  paginatedBusinesses.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5 w-10">
                          <Image
                            src={item.avatar}
                            alt={item.owner}
                            width={32}
                            height={32}
                            className="w-8 h-8 shrink-0 rounded-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{item.owner}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.type === "Agent" ? "agent" : "merchant"}
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>{item.commission}</TableCell>
                      <TableCell>
                        <Badge variant="tier">{item.kycLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        {activeTab === "active" ? (
                          <Badge variant="target_active">
                            {item.activeStatus}
                          </Badge>
                        ) : (
                          <Badge variant="target_inactive">
                            {item.inactiveStatus}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>No businesses found.</TableCell>
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
            itemLabel={`${activeTab} businesses`}
            onPageChange={setCurrentPage}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
