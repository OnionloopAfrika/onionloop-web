"use client";

import { useMemo, useState } from "react";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import Card from "@/components/card";
import { CalendarIcon, SingleSeparator } from "@/components/icons/svgs";
import Input from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
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
import { Modal } from "../ui/modal";
import { Items, OrderInfo } from "../cashier/order-details";
import { TotalAmount } from "../order-summary";

type OrderStatus = "successful" | "pending" | "failed";

interface Order {
  id: string;
  items: string;
  staff: string;
  amount: string;
  date: string;
  dateLabel: string;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Chike Ikenna",
    amount: "₦3,200",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Precious Jude",
    amount: "₦3,200",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Precious Jude",
    amount: "₦3,200",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Gbolahan Oguntiroye",
    amount: "₦3,200",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "pending",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Gbolahan Oguntiroye",
    amount: "₦3,200",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "pending",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Gbolahan Oguntiroye",
    amount: "₦3,200",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Gbolahan Oguntiroye",
    amount: "₦3,200",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Jude Nneka",
    amount: "+₦7,600",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "successful",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Jude Nneka",
    amount: "+₦7,600",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "failed",
  },
  {
    id: "ORD-2291",
    items: "1x Jollof Rice, 2x Coca-Cola (50cl)...",
    staff: "Jude Nneka",
    amount: "+₦7,600",
    date: "2026-05-19",
    dateLabel: "May 19, 2026 at 09:15am",
    status: "failed",
  },
];

const staffOptions = [
  { value: "all", label: "Staff: All" },
  ...["Chike Ikenna", "Precious Jude", "Gbolahan Oguntiroye", "Jude Nneka"].map(
    (staff) => ({ value: staff, label: staff }),
  ),
];

const statusOptions: { value: string; label: string }[] = [
  { value: "all", label: "Status: All" },
  { value: "successful", label: "Successful" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

const statusBadge: Record<
  OrderStatus,
  { label: string; variant: BadgeVariant }
> = {
  successful: { label: "Successful", variant: "successful" },
  pending: { label: "Pending", variant: "pending" },
  failed: { label: "Failed", variant: "failed" },
};

const pageSize = 10;

export const OrdersTable = () => {
  const [search, setSearch] = useState("");
  const [staffFilter, setStaffFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("2026-05-08");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const selectedDate = dateFrom ? new Date(`${dateFrom}T00:00:00`) : undefined;

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        query.length === 0 ||
        `${order.id} ${order.items} ${order.staff}`
          .toLowerCase()
          .includes(query);
      const matchesStaff = staffFilter === "all" || order.staff === staffFilter;
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesDate = dateFrom.length === 0 || order.date >= dateFrom;

      return matchesSearch && matchesStaff && matchesStatus && matchesDate;
    });
  }, [dateFrom, search, staffFilter, statusFilter]);

  const paginatedOrders = useMemo(
    () =>
      filteredOrders.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      ),
    [currentPage, filteredOrders],
  );

  return (
    <div className="space-y-4">
      <Card className="!p-0 overflow-hidden">
        <div className="flex min-w-0 flex-wrap items-center gap-[9px] border-b border-gray-100 p-4">
          <div className="min-w-[220px] ">
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

          <div className="relative w-[160px] shrink-0">
            <Input
              type="text"
              aria-label="Filter orders from date"
              value={selectedDate?.toLocaleDateString() ?? ""}
              readOnly
              onClick={() => setShowCalendar((isOpen) => !isOpen)}
              className="!h-12 !w-full !border-[#E5E7EB] !bg-[#f7f7f7]"
              icon={
                <button
                  type="button"
                  aria-label="Open calendar"
                  aria-expanded={showCalendar}
                  onClick={() => setShowCalendar((isOpen) => !isOpen)}
                  className="flex items-center text-[#8A8A8A]"
                >
                  <CalendarIcon className="h-5 w-5" />
                </button>
              }
            />
            {showCalendar && (
              <div className="absolute left-0 top-full z-50 mt-2 sm:left-auto sm:right-0">
                <Calendar
                  value={selectedDate}
                  onChange={(date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    setDateFrom(`${year}-${month}-${day}`);
                    setCurrentPage(1);
                    setShowCalendar(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-[145px] shrink-0">
            <Select
              options={staffOptions}
              value={staffFilter}
              placeholder="Staff: All"
              onValueChange={(value) => {
                setStaffFilter(value);
                setCurrentPage(1);
              }}
              className="!h-12 !w-full"
            />
          </div>
          <div className="w-[145px] shrink-0">
            <Select
              options={statusOptions}
              value={statusFilter}
              placeholder="Status: All"
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              className="!h-12 !w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table style={{ minWidth: "850px" }}>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order, index) => {
                const badge = statusBadge[order.status];

                return (
                  <TableRow
                    key={`${order.id}-${index}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      <span
                        className="block max-w-[230px] truncate"
                        title={order.items}
                      >
                        {order.items}
                      </span>
                    </TableCell>
                    <TableCell>{order.staff}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>{order.dateLabel}</TableCell>
                    <TableCell>
                      <Badge
                        variant={badge.variant}
                        className="!min-h-6 !px-3 !text-[11px]"
                      >
                        {badge.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <span className="block py-6 text-center">
                      No orders match the selected filters.
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredOrders.length}
        itemLabel="orders"
        onPageChange={setCurrentPage}
      />

      <Modal
        open={selectedOrder !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
      >
        <div className="space-y-[24px]">
          <p className="font-[700] text-[24px] text-[#242424]">
            {selectedOrder?.id}
          </p>

          <div className="space-y-[40px]">
            <div className="space-y-[16px]">
              <div className="flex justify-between items-center">
                <Badge
                  variant={
                    selectedOrder
                      ? statusBadge[selectedOrder.status].variant
                      : "successful"
                  }
                >
                  {selectedOrder
                    ? statusBadge[selectedOrder.status].label
                    : statusBadge.successful.label}
                </Badge>
                <p className="font-[600] text-[12px] text-[#363636]">
                  {selectedOrder?.dateLabel}
                </p>
              </div>

              <div className="space-y-[8px]">
                <OrderInfo
                  title="Processed by:"
                  value={selectedOrder?.staff ?? ""}
                  className1="border-b border-b-[#C7C7C7]"
                />

                <OrderInfo
                  title="Customer type:"
                  value="Onionloop user"
                  className1="border-b border-b-[#C7C7C7]"
                />

                <OrderInfo title="Payment method:" value="Onionloop user" />
              </div>
            </div>

            <div className="space-y-[15px]">
              <div className="space-y-[12px]">
                <Items
                  item="Cocacola"
                  nos="2"
                  amount="₦1,000"
                  amountStyle="text-[12px]"
                />

                <Items
                  item="Meat pie"
                  nos="4"
                  amount="₦2,000"
                  amountStyle="text-[12px]"
                />

                <Items
                  item="Sprite"
                  nos="2"
                  amount="₦2,000"
                  amountStyle="text-[12px]"
                />

                <Items
                  item="Fanta"
                  nos="2"
                  amount="₦2,000"
                  amountStyle="text-[12px]"
                />

                <Items
                  item="Donuts"
                  nos="3"
                  amount="₦2,000"
                  amountStyle="text-[12px]"
                />

                <Items
                  item="Donuts"
                  nos="2"
                  amount="₦2,000"
                  amountStyle="text-[12px]"
                />

                <SingleSeparator className="max-w-[70%] mx-auto" />

                <OrderInfo title="Sub Total" value="₦11,500" />

                <SingleSeparator className="max-w-[70%] mx-auto" />
              </div>

              <div className="space-y-[12px]">
                <OrderInfo
                  title="Order Number"
                  value={selectedOrder?.id ?? ""}
                />

                <OrderInfo title="Number of products sold" value="6" />

                <OrderInfo title="VAT (7.5%)" value="₦862.50" />

                <TotalAmount total="Total Bills" amount="₦12,360.00" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
