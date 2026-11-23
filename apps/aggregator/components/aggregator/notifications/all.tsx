import { NotisMsgIcon, NotisMsgWarning } from "@/components/icons/svgs";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";

export default function All() {
  const notis = [
    {
      icon: <NotisMsgIcon />,
      title: "Leave Request",
      desc: "Your leave request has been approved by you employer and has taken effect effective immediately",
      time: "11:30 AM",
    },

    {
      icon: <NotisMsgWarning />,
      title: "Issue Request Resolved",
      desc: "Your issue request for “Money went to the wrong account” has been resolved",
      time: "11:30 AM",
    },

    {
      icon: <NotisMsgIcon />,
      title: "Leave Request",
      desc: "Your leave request has been approved by you employer and has taken effect effective immediately",
      time: "11:30 AM",
    },

    {
      icon: <NotisMsgWarning />,
      title: "Issue Request Resolved",
      desc: "Your issue request for “Money went to the wrong account” has been resolved",
      time: "11:30 AM",
    },

    {
      icon: <NotisMsgIcon />,
      title: "Message Request",
      desc: "Your Tier 2 verification has been approved! You can now access onionloop features",
      time: "11:30 AM",
    },

    {
      icon: <NotisMsgIcon />,
      title: "Message Request",
      desc: "Your Tier 2 verification has been approved! You can now access onionloop features",
      time: "11:30 AM",
    },
  ];

  return (
    <div className="p-[24px] space-y-[24px] border border-[#E5E7EB] bg-white rounded-[8px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[9px]  w-fit">
          <SearchInput />
          <Select placeholder="All Status" />
          <Select placeholder="This Month" />
        </div>

        <p className="font-[500] text-[16px] text-[#6C6C6C]">
          Showing 05 Request
        </p>
      </div>

      <div className="space-y-[16px]">
        {notis.map((items, i) => (
          <div
            key={i}
            className="space-y-[12px] border-b border-b-[#C7C7C7] pb-[8px] last:border-b-0"
          >
            <div className="flex justify-between items-center  ">
              <div className="w-[32px] h-[32px] rounded-[2px] flex justify-center items-center p-[8px] border border-[#E5E7EB]">
                {items.icon}
              </div>

              <p className="font-[400] text-[14px] text-[#8A8A8A]">
                {items.time}
              </p>
            </div>

            <p className="font-[500] text-[16px] text-[#131313]">
              {items.title}
            </p>
            <p className="font-[400] text-[14px] text-[#6C6C6C]">
              {items.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
