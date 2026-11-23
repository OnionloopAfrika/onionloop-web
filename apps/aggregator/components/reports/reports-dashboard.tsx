import React from "react";

import Header from "../layouts/header";
import ReportStat from "./report-stat";
import ReportHistory from "./report-history";
import ScheduleReports from "./schedule-reports";

export default function ReportsDashboard() {
  return (
    <div className="space-y-[24px]">
      <Header
        heading="Reports"
        subHeading="Access detailed reports to monitor performance, identify trends, and make informed decisions."
      />

      <ReportStat />
      <ScheduleReports />
      <ReportHistory />
    </div>
  );
}
