import React from "react";
import StaffManagement from "@/components/staff-page/mega-staff-management";

export default function Page() {
  return (
    <div>
      <StaffManagement leaveRequestPath="/branch-manager/staff/leave-request" />
    </div>
  );
}
