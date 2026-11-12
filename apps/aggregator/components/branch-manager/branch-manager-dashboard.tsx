"use client";
import React from "react";

import { branchActivity } from "@/lib/mockdata/branch-activity";
import { NoStaffActivity } from "../no-activity";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import {
  CalendarIcon,
  DownloadIcon,
  DownloadIconSolid,
  PlusIcon,
} from "../icons/svgs";
import { BranchStatGrid } from "./branch-stat-grid";
import RevenueOverview from "../layouts/revenue-overview";
import { BranchRecentTransactions } from "./branch-recent-transactions";
import BranchTopSelling from "./branch-top-selling";
import { BranchStaffActivity } from "./branch-staff-activity";
import { useEffect, useState } from "react";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";
import { RevenuePayload } from "@/types/transactions/types";

export function BranchManagerDashboard() {
  const [initialData, setInitialData] = useState<RevenuePayload | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchRevenue("7days");
      setInitialData(data);
    }
    loadData();
  }, []);

  if (branchActivity.length === 0) {
    return (
      <div className=" space-y-[100px]">
        {/* <ProfileHeader
          className="space-y-8px border-b-0 pb-[0px]"
          title="Lekki Branch Overview"
          subtitle="Here's what's happening with your business today  · Last updated 3 min ago"
        /> */}

        <NoStaffActivity
          title="No activity from your staff yet"
          description="Activity will appear here once your staff starts processing payments."
          btnText="Invite New Staff"
        />
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="">
        <ProfileHeader
          className="space-y-8px border-b-0 pb-[0px]"
          title="Lekki Branch Overview"
          subtitle="Here's what's happening with your business today  · Last updated 3 min ago"
        />
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-100 rounded-2xl"></div>
          <div className="h-80 bg-gray-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-[24px]">
      <ProfileHeader
        className="flex-col md:flex-row gap-4 justify-between items-start mb-6 border-b-0 pb-[0px]"
        title="Lekki Branch Overview"
        subtitle="Here's what's happening with your business today  · Last updated 3 min ago"
        btn={
          <div className="flex items-center gap-[10px]">
            <Button variant="outline" size="cashierOutline">
              <CalendarIcon /> Mar 2026
            </Button>
            <Button variant="primary" size="cashierOutline">
              <DownloadIconSolid />
              Download Report
            </Button>
          </div>
        }
      />

      <BranchStatGrid />

      <div className="space-y-[42px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
          <RevenueOverview initialData={initialData} />
          <BranchRecentTransactions />
          <BranchTopSelling />
          <BranchStaffActivity />
        </div>
      </div>
    </div>
  );
}
