"use client";
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "../icons/svgs";
import { SearchInput } from "../ui/search-input";

interface Employee {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  viewDashboard: "Full Access" | "Limited Access" | "No Access";
  processSales: "Full Access" | "Limited Access" | "No Access";
  issueRefunds: "Full Access" | "Limited Access" | "No Access";
  viewReports: "Full Access" | "Limited Access" | "No Access";
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Titi Folarin",
    role: "Business Owner",
    avatarUrl: "https://i.pravatar.cc/150?u=12",
    viewDashboard: "Full Access",
    processSales: "Full Access",
    issueRefunds: "Full Access",
    viewReports: "Full Access",
  },
  {
    id: "2",
    name: "Titi Folarin",
    role: "Store Manager",
    avatarUrl: "https://i.pravatar.cc/150?u=13",
    viewDashboard: "Limited Access",
    processSales: "Limited Access",
    issueRefunds: "Limited Access",
    viewReports: "Limited Access",
  },
  {
    id: "3",
    name: "Titi Folarin",
    role: "Inventory Manager",
    avatarUrl: "https://i.pravatar.cc/150?u=14",
    viewDashboard: "No Access",
    processSales: "No Access",
    issueRefunds: "No Access",
    viewReports: "No Access",
  },
  {
    id: "4",
    name: "Titi Folarin",
    role: "Cashier",
    avatarUrl: "https://i.pravatar.cc/150?u=15",
    viewDashboard: "Full Access",
    processSales: "Full Access",
    issueRefunds: "Full Access",
    viewReports: "Full Access",
  },
];

export function PermissionsTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const getAccessBadge = (access: string) => {
    if (access === "Full Access") {
      return (
        <span className="py-[4px] px-[12px] rounded-full text-[14px] font-medium bg-[#E7F6EC] text-[#04802E] whitespace-nowrap">
          Full Access
        </span>
      );
    }
    if (access === "Limited Access") {
      return (
        <span className="py-[4px] px-[12px] rounded-full text-[14px] font-medium bg-[#FEF6E7] text-[#DD900D] whitespace-nowrap">
          Limited Access
        </span>
      );
    }
    return (
      <span className="py-[4px] px-[12px] rounded-full text-[14px] font-medium bg-[#FBEAE9] text-[#CB1A14] whitespace-nowrap">
        No Access
      </span>
    );
  };

  const filteredEmployees = mockEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEmployeeClick = (employee: any) => {
    setSearchQuery(employee.name);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm font-sans">
      <div className="p-6 border-b border-gray-100">
        <div className="relative w-full max-w-[420px]">
          <SearchInput
            placeholder="Search Employees"
            value={searchQuery}
            onChange={setSearchQuery}
            categories={[]}
            products={[]}
            employees={mockEmployees}
            onEmployeeClick={handleEmployeeClick}
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>{" "}
              <TableHead>
                Employees
              </TableHead>
              <TableHead>
                Role
              </TableHead>
              <TableHead>
                View Dashboard
              </TableHead>
              <TableHead>
                Process Sales
              </TableHead>
              <TableHead>
                Issue Refunds
              </TableHead>
              <TableHead>
                View Reports
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <TableRow
                key={emp.id}
              >
                <TableCell>
                  <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0">
                    <img
                      src={emp.avatarUrl}
                      alt={emp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-[14px] text-[#363636] font-medium">
                    {emp.name}
                  </span>
                </TableCell>

                <TableCell>
                  {emp.role}
                </TableCell>
                <TableCell>
                  {getAccessBadge(emp.viewDashboard)}
                </TableCell>
                <TableCell>
                  {getAccessBadge(emp.processSales)}
                </TableCell>
                <TableCell>
                  {getAccessBadge(emp.issueRefunds)}
                </TableCell>
                <TableCell>
                  {getAccessBadge(emp.viewReports)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between w-full gap-4">
                    <button className="text-[#04907E] transition-colors flex items-center gap-[12px]">
                      <EditIcon />{" "}
                      <span className="font-[500] text-[14px] text-[#04907E]">
                        Edit
                      </span>
                    </button>
                    <button className="text-[#C62828] transition-colors">
                      <DeleteIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
