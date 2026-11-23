import onion from "@/public/icons/on.svg";
import onion_logo from "@/public/icons/onion_logo.svg";

import Image from "next/image";

interface ReportDocumentSummaryProps {
  title: string;
  summary: string;
  cards: { label: string; value: string }[];
}

const REPORT_METADATA = [
  { label: "Report ID:", value: "AGG-2607-COM" },
  { label: "Period:", value: "23 Sept 2026 – 22 Oct 2026" },
  { label: "Region:", value: "Lagos Mainland" },
  { label: "Generated:", value: "Just now" },
];

export default function ReportDocumentSummary({
  title,
  summary,
  cards,
}: ReportDocumentSummaryProps) {
  return (
    <>
      <div className="flex h-[61.68px] items-center gap-[2px] bg-[#024E44] px-[16px]">
        <Image width={90} height={22} src={onion_logo} alt="onionloop_logo" />
      </div>

      <div className="space-y-[16px] p-[16px]">
        <div className="space-y-[6px]">
          <h2 className="text-[16px] font-[600] text-[#000000]">{title}</h2>
          <p className=" text-[12px] text-[#6C6C6C] font-normal">
            NorthGate Onboarding · AGG-0412
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-[8px] md:grid-cols-4 max-lg:grid-cols-1 max-lg:gap-[16px]">
          {REPORT_METADATA.map((item) => (
            <div key={item.label} className="space-y-[4px]">
              <dt className="text-[14px] font-normal text-[#6C6C6C]">
                {item.label}
              </dt>
              <dd className="text-[14px] font-[600] text-[#363636]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-[14px] font-normal leading-[1.6] text-[#6C6C6C]">
          <span className="font-[600] text-[14px] text-[#04907E]">
            SUMMARY:
          </span>
          {summary}
        </p>

        <div className="grid grid-cols-2 gap-[16px] md:grid-cols-4 max-lg:grid-cols-1 max-lg:gap-[16px]">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-[8px]  p-[16px] shadow-sm bg-white"
            >
              <p className="text-[9px] text-[#6C6C6C]">{card.label}</p>
              <p className="mt-[6px] text-[13px] font-[600] text-[#131313]">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
