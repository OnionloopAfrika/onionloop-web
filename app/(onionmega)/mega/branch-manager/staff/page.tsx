import React from "react";
import StaffManagement from "@/components/staff-page/mega-staff-management";

const page = () => {
  return (
    <div>
      <StaffManagement leaveRequestPath="/branch-manager/staff/leave-request" />
    </div>
  );
};

export default page;
