import React from "react";
import {
  AddStaffIcon,
  ExportReportIcon,
  OpenEyeIcon,
  OpenTransactionsIcon,
  PlusIcon,
} from "../icons/svgs";
import Card from "../card";

export default function QuickActions() {
  const actions = [
    {
      title: "Add product",
      icon: <PlusIcon color="#04907E" />,
    },

    {
      title: "Add Staff",
      icon: <AddStaffIcon />,
    },

    {
      title: "Export Report",
      icon: <ExportReportIcon />,
    },

    {
      title: "View Transactions",
      icon: <OpenTransactionsIcon />,
    },
  ];

  return (
    <div className="space-y-[12px]">
      <p className="font-[600] text-[16px] text-[#363636]">Quick Actions</p>

      <div className="grid grid-cols-4 gap-[16px]">
        {actions.map((item, i) => (
          <Card
            className="rounded-[4px] min-h-[84px] flex flex-col justify-center items-center gap-[12px] py-[10px] px-[20px]"
            key={i}
          >
            {item.icon}

            <p className="font-[500] text-[12px] text-[#8A8A8A]">
              {item.title}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
