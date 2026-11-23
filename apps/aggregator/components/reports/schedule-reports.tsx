"use client";

import React, { useState } from "react";
import { CalendarIcon, DeleteIcon, EditIcon, VerifyIcon } from "../icons/svgs";
import Button from "../ui/button";
import Input from "../ui/input";
import { Modal } from "../ui/modal";
import Select from "../ui/select";

const SCHEDULED_REPORTS = [
  {
    title: "Daily Ops Summary",
    details: "Weekly. Mon 8am-adaeze.ceo@onionloop.afrika",
  },
  {
    title: "KYC Approval Log Summary",
    details: "Monthly. adaeze.ceo@onionloop.afrika",
  },
];

export default function ScheduleReports() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isScheduleSuccessOpen, setIsScheduleSuccessOpen] = useState(false);
  const [reportTemplate, setReportTemplate] = useState("executive-summary");
  const [frequency, setFrequency] = useState("");

  const handleSaveSchedule = () => {
    setIsScheduleModalOpen(false);
    setIsScheduleSuccessOpen(true);
  };

  const selectedTemplate =
    SCHEDULED_REPORTS.find((report) => report.title === reportTemplate)
      ?.title ??
    {
      "executive-summary": "Executive Summary",
      "daily-ops-summary": "Daily Ops Summary",
      "kyc-approval-log": "KYC Approval Log",
      "merchant-onboarding": "Merchant Onboarding Report",
      "agent-float-payout": "Agent Float & Payout Report",
      "aggregator-commission": "Aggregator Commission Report",
      "dispute-resolution": "Dispute Resolution Log",
    }[reportTemplate] ??
    "Report";

  return (
    <section className="space-y-[24px] rounded-[12px] border border-[#E5E7EB] bg-white p-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-[16px]">
        <div className="space-y-[16px]">
          <h2 className="font-[600] text-[16px] text-[#131313]">
            Scheduled Reports
          </h2>
          <p className="font-[400] text-[12px] text-[#6C6C6C]">
            These reports generate automatically and are emailed to the listed
            recipient below
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsScheduleModalOpen(true)}
          className="inline-flex h-[40px] items-center gap-[12px] rounded-[8px] bg-[#00574D] px-[16px] font-[500] text-[14px] text-white"
        >
          <span aria-hidden="true" className="text-[20px] leading-none">
            +
          </span>
          Schedule recurring report
        </button>
      </div>

      <div>
        {SCHEDULED_REPORTS.map((report) => (
          <div
            key={report.title}
            className="flex min-h-[62px] items-center justify-between gap-[16px] border-b border-[#C7C7C7] py-[12px] last:border-b-0 last:pb-0 max-lg:flex-col"
          >
            <p className="min-w-0 font-[400] text-[14px] text-[#6C6C6C]">
              <span className="font-[500] text-[#131313]">{report.title}</span>
              {" - "}
              {report.details}
            </p>

            <div className="flex shrink-0 items-center gap-[20px]">
              <button
                type="button"
                aria-label={`Edit ${report.title} schedule`}
                className="text-[22px] leading-none text-[#04907E]"
              >
                <EditIcon color="#04907E" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${report.title} schedule`}
                className="text-[#CB1A14]"
              >
                <DeleteIcon className="h-[24px] w-[24px]" color="#CB1A14" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        size="lg"
        className="!max-w-[810px]"
      >
        <div className="space-y-[28px]">
          <div className="space-y-[12px] text-center">
            <h2 className="font-[600] text-[24px] text-[#131313]">
              Schedule Recurring Report
            </h2>
            <p className="mx-auto max-w-[470px] font-[400] text-[16px] leading-[24px] text-[#333333]">
              This will run automatically on a repeating schedule and emails the
              report to the recipient(s) below
            </p>
          </div>

          <div className="space-y-[32px]">
            <Select
              label="Report template"
              value={reportTemplate}
              onValueChange={setReportTemplate}
              className="w-full"
              options={[
                { value: "executive-summary", label: "Executive Summary" },
                { value: "daily-ops-summary", label: "Daily Ops Summary" },
                { value: "kyc-approval-log", label: "KYC Approval Log" },
                {
                  value: "merchant-onboarding",
                  label: "Merchant Onboarding Report",
                },
                {
                  value: "agent-float-payout",
                  label: "Agent Float & Payout Report",
                },
                {
                  value: "aggregator-commission",
                  label: "Aggregator Commission Report",
                },
                {
                  value: "dispute-resolution",
                  label: "Dispute Resolution Log",
                },
              ]}
            />

            <Select
              label="Frequency"
              placeholder="Select date"
              value={frequency}
              onValueChange={setFrequency}
              className="w-full"
              icon={<CalendarIcon />}
              iconPosition="start"
              options={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
            />

            <Input
              label="Recipient email"
              type="email"
              placeholder="adaeze.ceo@onionloop.afrika"
              className="border !bg-[#f7f7f7] border-[#E5E7EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-[16px] pt-[16px]">
            <Button
              onClick={() => setIsScheduleModalOpen(false)}
              variant="secondary"
              size="md"
              className="h-[52px] bg-[#F7F7F7] text-[#6C6C6C]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveSchedule}
              variant="primary"
              size="md"
              className="h-[52px] bg-[#00574D]"
            >
              Save schedule
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={isScheduleSuccessOpen}
        onOpenChange={setIsScheduleSuccessOpen}
        className="!rounded-[16px] !p-6 sm:!p-8"
      >
        <div className="flex flex-col items-center gap-[64px]">
          <div className="flex flex-col items-center gap-[24px] text-center">
            <VerifyIcon color="#04907E" />
            <div className="flex flex-col items-center gap-[8px]">
              <h2 className="text-[24px] font-[600] text-[#04907E]">
                {selectedTemplate} Scheduled Successfully!
              </h2>
              <p className="text-[16px] font-[400] text-[#363636]">
                Your recurring report schedule has been saved successfully
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsScheduleSuccessOpen(false)}
            className="h-[52px] w-full max-w-[362px] bg-[#00574D]"
          >
            Done
          </Button>
        </div>
      </Modal>
    </section>
  );
}
