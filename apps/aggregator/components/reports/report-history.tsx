"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { SearchInput } from "../ui/search-input";
import { Modal } from "../ui/modal";
import { CalendarIcon, VerifyIcon } from "../icons/svgs";
import { Calendar } from "../ui/calendar";
import Select from "../ui/select";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

interface ReportHistoryItem {
  id: string;
  name: string;
  period: string;
  date: string;
}

const REPORT_HISTORY: ReportHistoryItem[] = [
  {
    id: "commission-earnings",
    name: "Commission & Earnings Statement",
    period: "01 Sept 2026 – 30 Sept 2026",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "target-bonus",
    name: "Target & Bonus Report",
    period: "23 Sept 2026 – 22 Oct 2026",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "network-performance",
    name: "Network Performance Report",
    period: "01 Sept 2026 – 30 Sept 2026",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "compliance-verification",
    name: "Compliance & Verification Log",
    period: "23 Sept 2026 – 22 Oct 2026",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "onboarding-activation",
    name: "Onboarding & Activation Report",
    period: "23 Sept 2026 – 22 Oct 2026",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "account-settlement",
    name: "Account & Settlement Statement",
    period: "23 Sept 2026 – 22 Oct 2026",
    date: "May 19,2026 at 09:15am",
  },
];

export default function ReportHistory() {
  const [query, setQuery] = useState("");
  const [selectedReport, setSelectedReport] =
    useState<ReportHistoryItem | null>(null);
  const [generatedReport, setGeneratedReport] =
    useState<ReportHistoryItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [format, setFormat] = useState("pdf");
  const [segment, setSegment] = useState("all");

  const openReportModal = (report: ReportHistoryItem) => {
    setSelectedDate(undefined);
    setIsCalendarOpen(false);
    setFormat("pdf");
    setSegment("all");
    setSelectedReport(report);
  };

  const handleGenerate = () => {
    if (!selectedReport) return;

    setSelectedReport(null);
    setIsCalendarOpen(false);
    setGeneratedReport(selectedReport);
  };

  const filteredReports = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    if (!searchTerm) return REPORT_HISTORY;

    return REPORT_HISTORY.filter((report) =>
      [report.name, report.period, report.date].some((value) =>
        value.toLowerCase().includes(searchTerm),
      ),
    );
  }, [query]);

  const router = useRouter();

  return (
    <>
      <section className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
        <div className="space-y-[24px] border-b border-[#E5E7EB] p-[20px]">
          <div className="space-y-[8px]">
            <h2 className="font-[600] text-[16px] text-[#131313]">
              Report History
            </h2>
            <p className="font-[400] text-[12px] text-[#6C6C6C]">
              Click to preview a report before downloading
            </p>
          </div>

          <div className="relative w-full max-w-[604px] max-lg:max-w-full  overflow-hidden">
            <SearchInput value={query} onChange={setQuery} />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: "28%" }}>Report</TableHead>
                <TableHead style={{ width: "25%" }}>Period</TableHead>
                <TableHead style={{ width: "25%" }}>Date</TableHead>
                <TableHead aria-label="Actions" style={{ width: "22%" }} />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow
                    key={report.id}
                    onClick={() => openReportModal(report)}
                    onKeyDown={(event) => {
                      if (
                        event.target === event.currentTarget &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        openReportModal(report);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`Open ${report.name} details`}
                  >
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          router.push(`/aggregator/reports/${report.id}`);
                        }}
                        className="inline-flex items-center gap-[10px] font-[500] text-[14px] text-[#04907E] hover:text-[#037A6A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04907E] cursor-pointer"
                        aria-label={`Preview ${report.name}`}
                      >
                        Preview
                        <svg
                          aria-hidden="true"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 12H20M20 12L13 5M20 12L13 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    No reports match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <Modal
        open={selectedReport !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedReport(null);
            setIsCalendarOpen(false);
          }
        }}
        size="sm"
        className="!max-w-[810px] !rounded-[16px] !p-6 sm:!p-8"
      >
        {selectedReport && (
          <div className="space-y-[32px]">
            <div className="space-y-[12px] text-center">
              <h2 className="text-[24px] font-[600] text-[#131313]">
                {selectedReport.name}
              </h2>
              <p className="text-[16px] font-[400] text-[#363636]">
                The result will be added to the report history for you to
                preview and download
              </p>
            </div>

            <div className="space-y-[32px]">
              <div className="space-y-[8px]">
                <label className="block text-[12px] font-[600] text-[#131313]">
                  Date range
                </label>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Select report date"
                    aria-expanded={isCalendarOpen}
                    onClick={() => setIsCalendarOpen((open) => !open)}
                    className="flex h-[48px] w-full items-center gap-[10px] rounded-[6px] border border-[#E5E7EB] bg-[#F7F7F7] px-[16px] text-left text-[12px] text-[#8A8A8A]"
                  >
                    <CalendarIcon
                      className="h-[18px] w-[18px]"
                      color="#8A8A8A"
                    />
                    <span>
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Select date"}
                    </span>
                  </button>
                  {isCalendarOpen && (
                    <div className="absolute left-0 top-full z-[60] mt-2">
                      <Calendar
                        value={selectedDate}
                        onChange={(date) => {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Select
                label="Format"
                value={format}
                onValueChange={setFormat}
                className="w-full"
                options={[
                  { value: "pdf", label: "PDF" },
                  { value: "xlsx", label: "XLSX" },
                  { value: "csv", label: "CSV" },
                ]}
              />

              <Select
                label="Segment filter"
                value={segment}
                onValueChange={setSegment}
                className="w-full"
                options={[
                  { value: "all", label: "All segments" },
                  { value: "agents", label: "Agents" },
                  { value: "merchants", label: "Merchants" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-[16px] pt-[16px]">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSelectedReport(null)}
                className="!h-[52px] !w-full !rounded-[8px] !bg-[#F7F7F7] !text-[14px] !font-[600] !text-[#6C6C6C] hover:!bg-[#EEEEEE]"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleGenerate}
                className="!h-[52px] !w-full !rounded-[8px] !bg-[#00574D] !text-[14px] !font-[600] hover:!bg-[#00483F]"
              >
                Generate
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={generatedReport !== null}
        onOpenChange={(open) => {
          if (!open) setGeneratedReport(null);
        }}
        className="!rounded-[16px] !p-6 sm:!p-8"
      >
        {generatedReport && (
          <div className="flex flex-col items-center gap-[64px]">
            <div className="flex flex-col items-center gap-[24px]">
              <VerifyIcon color="#04907E" />
              <div className="flex flex-col items-center gap-[8px] text-center">
                <div className=" mx-auto">
                  <h2 className="text-[24px] font-[600] text-[#04907E] text-center">
                    {generatedReport.name} <br /> Generated Successfully!
                  </h2>
                </div>

                <p className="text-[16px] font-[400] text-[#363636]">
                  The report has been added in the report history
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => setGeneratedReport(null)}
              className="!h-[52px] !w-full !max-w-[362px] !rounded-[8px] !bg-[#00574D] !text-[14px] !font-[600] hover:!bg-[#00483F]"
            >
              Done
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
