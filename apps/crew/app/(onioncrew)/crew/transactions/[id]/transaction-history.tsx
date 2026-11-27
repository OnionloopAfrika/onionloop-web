"use client";

import { useState } from "react";
import { CalendarIcon } from "@/components/icons/svgs";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import Input from "@/components/ui/input";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ReconciliationStatus = "balance" | "imbalance";

interface Reconciliation {
  date: string;
  dateLabel: string;
  expected: string;
  counted: string;
  shortage: string;
  status: ReconciliationStatus;
}

const reconciliations: Reconciliation[] = [
  {
    date: "2026-05-20",
    dateLabel: "Today, at 09:15am",
    expected: "₦3,200",
    counted: "₦3,200",
    shortage: "₦0",
    status: "balance",
  },
  {
    date: "2026-05-20",
    dateLabel: "Today, at 09:15am",
    expected: "₦3,200",
    counted: "₦3,200",
    shortage: "₦0",
    status: "balance",
  },
  {
    date: "2026-05-19",
    dateLabel: "Yesterday, at 09:15am",
    expected: "₦9,800",
    counted: "₦9,300",
    shortage: "-₦500",
    status: "imbalance",
  },
  {
    date: "2026-05-19",
    dateLabel: "Yesterday at 09:15am",
    expected: "₦3,200",
    counted: "₦3,200",
    shortage: "₦0",
    status: "balance",
  },
  {
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    expected: "₦3,200",
    counted: "₦3,200",
    shortage: "₦0",
    status: "balance",
  },
  {
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    expected: "₦9,800",
    counted: "₦9,300",
    shortage: "-₦3,200",
    status: "imbalance",
  },
  {
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    expected: "₦3,200",
    counted: "₦3,200",
    shortage: "₦0",
    status: "balance",
  },
  {
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    expected: "₦7,600",
    counted: "+₦7,600",
    shortage: "₦0",
    status: "balance",
  },
  {
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    expected: "₦9,800",
    counted: "₦9,300",
    shortage: "-₦7,600",
    status: "imbalance",
  },
  {
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    expected: "₦7,600",
    counted: "+₦7,600",
    shortage: "₦0",
    status: "balance",
  },
];

const statusOptions = [
  { value: "all", label: "Status: All" },
  { value: "balance", label: "Balance" },
  { value: "imbalance", label: "Imbalance" },
];

const statusVariants: Record<ReconciliationStatus, BadgeVariant> = {
  balance: "balance",
  imbalance: "imbalance",
};

const formatDateInput = (date: string) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

export const TransactionHistory = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("2026-05-08");
  const [status, setStatus] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);

  const selectedDate = date ? new Date(`${date}T00:00:00`) : undefined;
  const query = search.trim().toLowerCase();
  const filteredReconciliations = reconciliations.filter((item) => {
    const matchesSearch =
      !query ||
      `${item.dateLabel} ${item.expected} ${item.counted} ${item.shortage} ${item.status}`
        .toLowerCase()
        .includes(query);
    const matchesDate = !date || item.date >= date;
    const matchesStatus = status === "all" || item.status === status;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="rounded-[8px] border border-[#E5E7EB] bg-white">
      <h2 className="px-4 pt-4 text-[16px] font-semibold text-[#131313]">
        Reconciliation History
      </h2>

      <div className="flex flex-wrap items-center gap-[8px] border-b border-[#E5E7EB] p-4">
        <div className=" shrink-0">
          <SearchInput
            placeholder="Search by reconciliation"
            value={search}
            onChange={setSearch}
            categories={[]}
          />
        </div>

        <div className="relative w-fit shrink-0">
          <Input
            type="text"
            aria-label="Filter reconciliations from date"
            value={formatDateInput(date)}
            readOnly
            className="!bg-[#f7f7f7] !border-[#E5E7EB]"
            onClick={() => setShowCalendar((isOpen) => !isOpen)}
            icon={
              <button
                type="button"
                aria-label="Open reconciliation date calendar"
                aria-expanded={showCalendar}
                onClick={() => setShowCalendar((isOpen) => !isOpen)}
                className="flex items-center text-[#8A8A8A] "
              >
                <CalendarIcon className="h-4 w-4" />
              </button>
            }
          />
          {showCalendar && (
            <div className="absolute left-0 top-full z-50 mt-2">
              <Calendar
                value={selectedDate}
                onChange={(selected) => {
                  const year = selected.getFullYear();
                  const month = String(selected.getMonth() + 1).padStart(
                    2,
                    "0",
                  );
                  const day = String(selected.getDate()).padStart(2, "0");
                  setDate(`${year}-${month}-${day}`);
                  setShowCalendar(false);
                }}
              />
            </div>
          )}
        </div>

        <div className=" shrink-0">
          <Select
            options={statusOptions}
            value={status}
            onValueChange={setStatus}
            placeholder="Status: All"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table style={{ minWidth: "700px" }}>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Counted</TableHead>
              <TableHead>Shortage</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReconciliations.map((item, index) => (
              <TableRow key={`${item.date}-${item.dateLabel}-${index}`}>
                <TableCell>{item.dateLabel}</TableCell>
                <TableCell>{item.expected}</TableCell>
                <TableCell>{item.counted}</TableCell>
                <TableCell>
                  <span
                    className={
                      item.status === "imbalance"
                        ? "font-medium text-[#CB1A14]"
                        : "font-medium text-[#04802E]"
                    }
                  >
                    {item.shortage}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[item.status]}>
                    {item.status === "balance" ? "Balance" : "Imbalance"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredReconciliations.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <span className="block py-6 text-center">
                    No reconciliations match the selected filters.
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
