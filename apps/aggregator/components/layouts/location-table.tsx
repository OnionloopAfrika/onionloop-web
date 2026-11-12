import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LocationItem } from "@/types/types";
import React from "react";

const LocationList = ({ filteredData }: { filteredData: LocationItem[] }) => {
  const getStatusStyles = (status: LocationItem["status"]) => {
    switch (status) {
      case "Healthy":
        return {
          badge: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]",
          bar: "bg-[#04802E]",
        };
      case "Warning":
        return {
          badge: "bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]",
          bar: "bg-[#DD900D]",
        };
      case "Critical":
        return {
          badge: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]",
          bar: "bg-[#CB1A14]",
        };
    }
  };
  return (
    <div className="w-full overflow-x-auto bg-white border border-gray-100 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Groups
            </TableHead>
            <TableHead>
              Location
            </TableHead>
            <TableHead>
              Manager
            </TableHead>
            <TableHead>
              Revenue
            </TableHead>
            <TableHead>
              Transactions
            </TableHead>
            <TableHead>
              Perf. Score
            </TableHead>
            <TableHead>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((loc) => {
            const styles = getStatusStyles(loc.status);
            return (
              <TableRow
                key={loc.id}
              >
                <TableCell>
                  {loc.group}
                </TableCell>
                <TableCell>
                  {loc.name}
                </TableCell>
                <TableCell>
                  {loc.manager}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-normal text-[#6C6C6C]">
                      {loc.revenue}
                    </span>
                    <span
                      className={`text-xs font-normal flex items-center gap-0.5 ${loc.isTrendUp ? "text-green-600" : "text-red-600"}`}
                    >
                      {loc.isTrendUp ? "↑" : "↓"}
                      {loc.trend}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {loc.transactions}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${styles.bar}`}
                        style={{ width: `${loc.perfScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-normal text-[#6C6C6C]">
                      {loc.perfScore}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-4 py-1 border rounded-full text-xs font-normal ${styles.badge}`}
                  >
                    {loc.status}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LocationList;
