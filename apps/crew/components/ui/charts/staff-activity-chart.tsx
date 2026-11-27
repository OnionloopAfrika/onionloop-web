import Image from "next/image";
import Link from "next/link";
import Card from "@/components/card";
import { CardHeader } from "@/components/layouts/card-header";

export interface StaffActivityItem {
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: string;
}

interface StaffActivityChartProps {
  staff: StaffActivityItem[];
  title?: string;
  manageActivitiesHref?: string;
  manageActivitiesLabel?: string;
}

export default function StaffActivityChart({
  staff,
  title = "Staff Activity",
  manageActivitiesHref = "/crew/staffs",
  manageActivitiesLabel = "Manage Activities",
}: StaffActivityChartProps) {
  return (
    <Card className="space-y-[24px]">
      <header className=" flex items-center justify-between gap-4">
        <CardHeader title={title} />{" "}
        <Link
          href={manageActivitiesHref}
          className="whitespace-nowrap text-[14px] font-semibold text-[#024E44]"
        >
          {manageActivitiesLabel}
        </Link>
      </header>

      <div className="space-y-[16px]">
        {staff.map((member, index) => (
          <div
            key={member.id}
            className={`flex items-center justify-between gap-3 py-3.5  ${
              index < staff.length - 1 ? "border-b border-[#E0E0E0]" : ""
            }`}
          >
            <div className="flex min-w-0 items-center gap-[10px]">
              <Image
                src={member.avatar}
                alt={member.name}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 space-y-[2px]">
                <p className="truncate text-[14px] font-medium text-[#131313]">
                  {member.name}
                </p>
                <p className="truncate text-[12px] font-normal text-[#6C6C6C]">
                  {member.role}
                </p>
              </div>
            </div>

            <p
              className={`flex shrink-0 items-center font-[500] gap-1.5 whitespace-nowrap text-[14px] ${
                member.status === "offline"
                  ? "text-[#CB1A14]"
                  : member.lastSeen
                    ? "text-[#8A8A8A]"
                    : "text-[#04802E]"
              }`}
            >
              {member.status === "online" && !member.lastSeen && (
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#04802E]"
                />
              )}
              {member.status === "online" ? "Online" : "Offline"}
              {member.lastSeen && (
                <>
                  <span aria-hidden="true">•</span>
                  {member.lastSeen}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
