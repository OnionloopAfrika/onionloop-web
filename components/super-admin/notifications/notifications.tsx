import Button from "@/components/ui/button";
import React from "react";

const notis = [
  {
    title: " Revenue Below Target by 32% critical",
    status: "critical",
    desc: "Daily revenue ₦480,000 — target is ₦700,000. Third consecutive day underperforming.",
    location: "Badagry",
    time: "12 min ago",
  },

  {
    title: "Sales 18% Below Week Average",
    status: "resolved",
    desc: "Today's sales trending 18% below this week's daily average. Mid-day slump.",
    location: "Ajah",
    time: "12 hrs ago",
  },

  {
    title: "Sales 18% Below Week Average warning",
    status: "warning",
    desc: "Today's sales trending 18% below this week's daily average. Mid-day slump.",
    location: "Ajah",
    time: "12 hrs ago",
  },

  {
    title: "Low Performance Score Trend",
    status: "warning",
    desc: "Score dropped from 68 to 55 in 2 weeks. Pattern suggests systemic issues.",
    location: "Ajah",
    time: "2 hrs ago",
  },
];

export default function Notifications() {
  const status = {
    critical:
      "px-[8px] h-[18px] rounded-full bg-[#F2BCBA] flex justify-center items-center font-[500] text-[10px] text-[#CB1A14] w-fit",
    resolved:
      "px-[8px] h-[18px] rounded-full bg-[#B5E3C4] flex justify-center items-center font-[500] text-[10px] text-[#04802E] w-fit",
    warning:
      "px-[8px] h-[18px] rounded-full bg-[#FBE2B7] flex justify-center items-center font-[500] text-[10px] text-[#DD900D] w-fit",
  };

  return (
    <div className="space-y-[16px]">
      {notis.map((item, i) => (
        <div
          key={i}
          className="bg-white border border-[#E5E7EB] rounded-[12px] p-[24px] flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="space-y-[16px]">
            <div className="space-y-[8px]">
              <p className="font-[600] text-[20px] text-[#000000] flex items-center gap-[4px]">
                {" "}
                {item.title}{" "}
                <span
                  className={`${item.status === "critical" ? status.critical : item.status === "resolved" ? status.resolved : item.status === "warning" ? status.warning : ""}`}
                >
                  {item.status}
                </span>
              </p>

              <p className="font-[500] text-[16px] text-[#6C6C6C]">
                {item.desc}
              </p>
            </div>

            <p className="font-[400] text-[14px] text-[#6C6C6C]">
              {item.location} <span>{item.time}</span>{" "}
            </p>
          </div>
          <div className="flex flex-col gap-[8px]">
            {(item.status === "critical" || item.status === "warning") && (
              <div className="flex flex-col gap-[8px]">
                <Button variant="primary" size="msg">
                  Resolve
                </Button>

                <Button variant="outline" size="msg">
                  Dismiss
                </Button>
              </div>
            )}

            {item.status === "resolved" && (
              <div className="flex flex-col gap-[8px]">
                <Button variant="outline" size="msg">
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
