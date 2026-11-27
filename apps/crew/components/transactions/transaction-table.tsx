"use client";

import { useState } from "react";
import { CalendarIcon } from "@/components/icons/svgs";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import Input from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type PaymentMethod = "Scan to Pay" | "Cash" | "Bank Transfer";
type TransactionStatus = "successful" | "pending" | "refunded" | "failed";

interface Transaction {
  transactionId: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: string;
  staff: string;
  date: string;
  dateLabel: string;
  status: TransactionStatus;
}

const transactions: Transaction[] = [
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Scan to Pay",
    amount: "₦3,200",
    staff: "Chike Ikenna",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Scan to Pay",
    amount: "₦3,200",
    staff: "Precious Jude",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Scan to Pay",
    amount: "₦3,200",
    staff: "Precious Jude",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Scan to Pay",
    amount: "₦3,200",
    staff: "Gbolahan Oguntiroye",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "pending",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Scan to Pay",
    amount: "₦3,200",
    staff: "Gbolahan Oguntiroye",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "pending",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Scan to Pay",
    amount: "₦3,200",
    staff: "Gbolahan Oguntiroye",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "refunded",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Cash",
    amount: "₦3,200",
    staff: "Gbolahan Oguntiroye",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Bank Transfer",
    amount: "+₦7,600",
    staff: "Jude Nneka",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Bank Transfer",
    amount: "+₦7,600",
    staff: "Jude Nneka",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    transactionId: "TXN-8801",
    orderId: "ORD-2291",
    paymentMethod: "Bank Transfer",
    amount: "+₦7,600",
    staff: "Jude Nneka",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "failed",
  },
];

const paymentOptions = [
  { value: "all", label: "Payment Method: All" },
  { value: "Scan to Pay", label: "Scan to Pay" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Cash", label: "Cash" },
];

const statusOptions = [
  { value: "all", label: "Status: All" },
  { value: "successful", label: "Successful" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
  { value: "failed", label: "Failed" },
];

const statusVariants: Record<TransactionStatus, BadgeVariant> = {
  successful: "successful",
  pending: "pending",
  refunded: "refunded",
  failed: "failed",
};

const statusLabels: Record<TransactionStatus, string> = {
  successful: "successful",
  pending: "Pending",
  refunded: "Refunded",
  failed: "Failed",
};

const pageSize = 10;

const formatDateInput = (date: string) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

interface TransactionTableProps {
  paymentMethodFilter?: PaymentMethod;
}

export default function TransactionTable({
  paymentMethodFilter,
}: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("2026-05-08");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [status, setStatus] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedDate = date ? new Date(`${date}T00:00:00`) : undefined;
  const query = search.trim().toLowerCase();
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      !query ||
      `${transaction.transactionId} ${transaction.orderId} ${transaction.paymentMethod} ${transaction.amount} ${transaction.staff}`
        .toLowerCase()
        .includes(query);
    const matchesDate = !date || transaction.date >= date;
    const activePaymentFilter = paymentMethodFilter ?? paymentMethod;
    const matchesPayment =
      activePaymentFilter === "all" ||
      transaction.paymentMethod === activePaymentFilter;
    const matchesStatus = status === "all" || transaction.status === status;

    return matchesSearch && matchesDate && matchesPayment && matchesStatus;
  });
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="rounded-[8px] border border-[#E5E7EB] bg-white">
        <div className="flex flex-wrap items-center gap-[8px] border-b border-[#E5E7EB] p-[16px]">
          <div className=" shrink-0">
            <SearchInput
              placeholder="Search products"
              value={search}
              onChange={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
              categories={[]}
            />
          </div>

          <div className="relative w-[114px] shrink-0">
            <Input
              type="text"
              aria-label="Filter transactions from date"
              value={formatDateInput(date)}
              readOnly
              className="!border !bg-[#f7f7f7] !border-[#E5E7EB]"
              onClick={() => setShowCalendar((isOpen) => !isOpen)}
              icon={
                <button
                  type="button"
                  aria-label="Open transaction date calendar"
                  aria-expanded={showCalendar}
                  onClick={() => setShowCalendar((isOpen) => !isOpen)}
                  className="flex items-center text-[#8A8A8A]"
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
                    setCurrentPage(1);
                    setShowCalendar(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className=" shrink-0">
            <Select
              options={paymentOptions}
              value={paymentMethodFilter ?? paymentMethod}
              onValueChange={(value) => {
                setPaymentMethod(value);
                setCurrentPage(1);
              }}
              disabled={paymentMethodFilter !== undefined}
              placeholder="Payment Method: All"
            />
          </div>

          <div className=" shrink-0">
            <Select
              options={statusOptions}
              value={status}
              onValueChange={(value) => {
                setStatus(value);
                setCurrentPage(1);
              }}
              placeholder="Status: All"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table style={{ minWidth: "850px" }}>
            <TableHeader>
              <TableRow>
                <TableHead>TXN ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction, index) => (
                <TableRow
                  onClick={() =>
                    router.push(`/crew/transactions/${transaction.orderId}`)
                  }
                  key={`${transaction.transactionId}-${index}`}
                >
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.orderId}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.staff}</TableCell>
                  <TableCell>{transaction.dateLabel}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[transaction.status]}>
                      {statusLabels[transaction.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <span className="block py-6 text-center">
                      No transactions match the selected filters.
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredTransactions.length}
        itemLabel="transactions"
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
