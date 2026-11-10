"use client";

import { cashierOrders } from "@/lib/mockdata/cashier-orders";
import NoOrder from "./no-order";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import { PlusIcon } from "../icons/svgs";
import CashierStats from "./cashier-stats";
import RecentOrders from "./recent-orders";
import { useRouter } from "next/navigation";

export default function CashierDashboard() {
  const router = useRouter();
  const orders = cashierOrders;

  if (orders.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <NoOrder />
      </div>
    );
  }

  return (
    <div className=" space-y-[24px]">
      <ProfileHeader
        className="flex-col md:flex-row gap-4 justify-between items-start mb-6 border-b-0 pb-[0px]"
        title="Hello Oluwaseun,"
        subtitle="Track your progress here, you are almost at your goal."
        btn={
          <Button
            onClick={() => router.push("/mega/cashier/new-order")}
            variant="primary"
            size="newOrder"
          >
            <PlusIcon />
            New Order
          </Button>
        }
      />

      <CashierStats />
      <RecentOrders />
    </div>
  );
}
