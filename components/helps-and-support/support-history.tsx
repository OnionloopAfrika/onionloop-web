import { SUPPORT_HISTORY } from "@/lib/mockdata/support-history";
import { DownloadIcon } from "../icons/svgs";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";

export function SupportHistory() {
  return (
    <div className="space-y-[40px] p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white">
      <ProfileHeader
        title="Latest Support History"
        subtitle="Here’s your most recent history"
        btn={
          <Button variant="outline" size="cashierOutline">
            <span className="flex items-center gap-[10px]">
              <DownloadIcon className="fill-none w-[20px] h-[20px]" />
              <span className="font-[500] text-[16px] text-[#131313]">
                Download Report
              </span>
            </span>
          </Button>
        }
      />

      <div className="space-y-[24px]">
        {SUPPORT_HISTORY.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between pb-[12px] border-b border-b-[#C7C7C7] bg-white"
          >
            <div className="flex flex-col gap-[2px]">
              <p className="text-[10px] font-[500] text-[#363636]">
                Issue ID: {item.id}
              </p>

              <p className="font-[500] text-[14px] text-[#131313]">
                {item.title}
              </p>

              <p className="font-[400] text-[12px] text-[#6C6C6C]">
                {item.message}
              </p>
            </div>

            <div className="flex flex-col items-end gap-[20px]">
              <span
                className={`px-3 py-1 text-[14px] font-[500] rounded-full ${
                  item.status === "pending"
                    ? "bg-[#F3A218] text-white"
                    : "bg-[#0F973D] text-white"
                }`}
              >
                {item.status}
              </span>

              <p className="font-[400] text-[10px] text-[#8A8A8A]">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
