import React, { Suspense } from "react";
import ReportHistory from "./report-history";

export default function Page() {
  return (
    <Suspense fallback="Loading Page......">
      <ReportHistory />
    </Suspense>
  );
}
