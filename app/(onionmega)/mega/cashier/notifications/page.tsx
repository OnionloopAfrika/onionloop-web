"use client";

import ProfileLayout from "../settings/Shell";
import SearchBar from "@/components/ui/search-bar";
import {
  CautionIcon,
  DangerIcon,
  LeaveIcon,
  MessageIcon,
  WarningIcon,
} from "@/components/icons/svgs";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const statusOptions = [{ value: "all", label: "All Status" }];
  const dateOptions = [{ value: "this-month", label: "This Month" }];

  const notifications = [
    {
      id: "1",
      type: "message",
      title: "Leave Request",
      message:
        "Your leave request has been approved by you employer and has taken effect effective immediately",
      time: "11:30 AM",
    },
    {
      id: "2",
      type: "warning",
      title: "Issue Request Resolved",
      message:
        'Your issue request for "Money went to the wrong account" has been resolved',
      time: "11:30 AM",
    },
    {
      id: "3",
      type: "message",
      title: "Leave Request",
      message:
        "Your leave request has been approved by you employer and has taken effect effective immediately",
      time: "11:30 AM",
    },
    {
      id: "4",
      type: "warning",
      title: "Issue Request Resolved",
      message:
        'Your issue request for "Money went to the wrong account" has been resolved',
      time: "11:30 AM",
    },
    {
      id: "5",
      type: "message",
      title: "Message Request",
      message:
        "Your Tier 2 verification has been approved! You can now access onionloop features",
      time: "11:30 AM",
    },
  ];

  return (
    <ProfileLayout
      active="/cashier/notifications"
      heading="Notifications"
      subheading="Keep track of important notifications "
    >
      <div className="space-y-[40px] bg-white">
        <SearchBar
          searchPlaceholder="Search by Request"
          statusOptions={statusOptions}
          dateOptions={dateOptions}
          showingText="Showing 05 Request"
        />

        <div className="flex flex-col gap-[16px] px-[24px]">
          {notifications.map((notis, i) => (
            <div
              onClick={() => router.push("/mega/cashier/messages")}
              className="flex flex-col gap-[12px] cursor-pointer border-b border-b-[#C7C7C7] last:border-b-0 pb-[8px]"
            >
              <div className="flex justify-between items-center]">
                {notis.title === "Leave Request" ? (
                  <LeaveIcon />
                ) : (
                  <DangerIcon className="text-[#DD900D] w-[16px] h-[16px]  stroke-[#DD900D]  " />
                )}

                <p className="font-[400] text-[14px] text-[#8A8A8A]">
                  {notis.time}
                </p>
              </div>
              <div className="flex flex-col gap-[12px]">
                <p className="font-[500] text-[16px] text-[#131313]">
                  {notis.title}
                </p>
                <p className="font-[400] text-[14px] text-[#6C6C6C]">
                  {notis.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default page;
