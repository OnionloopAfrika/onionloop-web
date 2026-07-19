"use client";

import { Modal } from "@/components/ui/modal";
import ProfileLayout from "../Shell";
import { useState, useRef, useEffect } from "react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { CalendarIcon, VerifyIcon } from "@/components/icons/svgs";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Page = () => {
  const [open, setOpen] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);

  const leaveOptions = [
    { value: "annual", label: "Annual Leave" },
    { value: "sick", label: "Sick Leave" },
    { value: "personal", label: "Personal Leave" },
    { value: "unpaid", label: "Unpaid Leave" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ leaveType, startDate, endDate, reason });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startCalendarRef.current &&
        !startCalendarRef.current.contains(event.target as Node)
      ) {
        setIsStartCalendarOpen(false);
      }
      if (
        endCalendarRef.current &&
        !endCalendarRef.current.contains(event.target as Node)
      ) {
        setIsEndCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ProfileLayout
      active="/cashier/settings/request-leave"
      heading="Request Leave"
      subheading="Submit a request to take time off"
    >
      <Modal
        open={open}
        onOpenChange={setOpen}
        footer={
          <div className="grid grid-cols-2 gap-[10px]">
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={() => {
                (setOpen(false), setOpenSuccess(true));
              }}
              variant="primary"
            >
              Submit Request
            </Button>{" "}
          </div>
        }
      >
        <div className="flex flex-col gap-[34px]">
          <div className="space-y-[12px] text-center">
            <p className="font-[600] text-[24px] text-[#131313]">
              Leave Request Form
            </p>
            <p className="font-[400] text-[16px] text-[#363636]">
              Fill in the request form by providing a reason for the leave while
              you wait for an approval
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
            <Select
              label="Leave Type"
              placeholder="Select Leave Type"
              value={leaveType}
              onValueChange={setLeaveType}
              options={leaveOptions}
            />

            <div className="grid grid-cols-2 gap-[16px]">
              <div ref={startCalendarRef} className="relative">
                <Input
                  label="Start Date"
                  type="text"
                  value={startDate}
                  readOnly
                  placeholder="YYYY-MM-DD"
                  prefixicon={
                    <button
                      type="button"
                      onClick={() =>
                        setIsStartCalendarOpen(!isStartCalendarOpen)
                      }
                    >
                      <CalendarIcon />
                    </button>
                  }
                />
                {isStartCalendarOpen && (
                  <div className="absolute z-50 top-full left-0 mt-2">
                    <CalendarComponent
                      value={startDate ? new Date(startDate) : undefined}
                      onChange={(date) => {
                        setStartDate(formatDate(date));
                        setIsStartCalendarOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div ref={endCalendarRef} className="relative">
                <Input
                  label="End Date"
                  type="text"
                  value={endDate}
                  readOnly
                  placeholder="YYYY-MM-DD"
                  prefixicon={
                    <button
                      type="button"
                      onClick={() => setIsEndCalendarOpen(!isEndCalendarOpen)}
                    >
                      <CalendarIcon />
                    </button>
                  }
                />
                {isEndCalendarOpen && (
                  <div className="absolute z-50 top-full left-0 mt-2">
                    <CalendarComponent
                      value={endDate ? new Date(endDate) : undefined}
                      onChange={(date) => {
                        setEndDate(formatDate(date));
                        setIsEndCalendarOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <Textarea
              label="Reason"
              placeholder="State your reason for the leave here"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px]"
            />
          </form>
        </div>
      </Modal>

      <Modal open={openSuccess} onOpenChange={setOpenSuccess}>
        <div className="flex flex-col gap-[64px] items-center">
          <div className="space-y-[40px] flex flex-col items-center">
            <VerifyIcon className="text-[#04907E]" />

            <div className="space-y-[8px] text-center">
              <p className="font-[600] text-[24px] text-[#04907E]">
                Request Submitted
              </p>

              <p className="font-[500] text-[16px] text-[#363636]">
                Your Request form has been submitted
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpenSuccess(false)}
            variant="primary"
            className="max-w-[70%]"
          >
            Done
          </Button>
        </div>
      </Modal>
    </ProfileLayout>
  );
};

export default Page;
