import React from "react";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import {
  ArrowRightIcon,
  HelpIcon,
  LocationIcon,
  LockIcon,
  LockShieldIcon,
  NextIcon,
  RightArrowIcon,
  RightIcon,
  SyncIcon,
  TicketHelpIcon,
  UploadIcon,
} from "../icons/svgs";
import Button from "../ui/button";

export default function TransactionIssue() {
  const instantMessages = [
    {
      icon: <SyncIcon className="text-[#0D5EBA] w-[16px] h-[16px]" />,
      bgColor: "#C6DDF7",
      msg: "How do I sync inventory with my staff mobile app?",
    },
    {
      icon: <LockIcon className="text-[#7C53FC] w-[16px] h-[16px]" />,
      bgColor: "#CFC2F7",
      msg: "How do I reset a staff member’s PIN?",
    },
    {
      icon: <LocationIcon className="text-[#DD900D] w-[16px] h-[16px]" />,
      bgColor: "#FBE2B7",
      msg: "Can I add multiple store location?",
    },
  ];

  return (
    <div className="space-y-[64px]">
      <div className="grid grid-cols-2 gap-[24px]">
        <div className="gap-[10px] flex flex-col">
          <div>
            <div>
              <span className="font-[600] text-[14px] text-[#131313]">
                Subject
              </span>{" "}
              <span className="text-[#CB1A14]">*</span>
              <p className="font-[500] text-[12px] text-[#6C6C6C]">
                Brief title for request
              </p>
            </div>
          </div>

          <Input placeholder="e.g App not syncing" />
        </div>

        <div className="gap-[10px] flex flex-col">
          <div>
            <div>
              <span className="font-[600] text-[14px] text-[#131313]">
                Subject
              </span>{" "}
              <span className="text-[#CB1A14]">*</span>
              <p className="font-[500] text-[12px] text-[#6C6C6C]">
                Brief title for request
              </p>
            </div>
          </div>

          <Input placeholder="e.g TXN123456789" />
        </div>
      </div>

      <div className="gap-[10px] flex flex-col">
        <div>
          <div>
            <span className="font-[600] text-[14px] text-[#131313]">
              Description
            </span>{" "}
            <span className="text-[#CB1A14]">*</span>
            <p className="font-[500] text-[12px] text-[#6C6C6C]">
              Include details such as date, amount, and what happened.
            </p>
          </div>
        </div>

        <Textarea
          className="placeholder:font-[400] placeholder:text-[12px] placeholder:text-[#6C6C6C]"
          placeholder="Please describe the issue in details..."
        />
      </div>

      <div className="gap-[10px] flex flex-col">
        <div>
          <div>
            <span className="font-[600] text-[14px] text-[#131313]">
              Attach a File(Optional)
            </span>{" "}
            <p className="font-[500] text-[12px] text-[#6C6C6C]">
              Upload a receipt, screenshot or supporting document.{" "}
            </p>
          </div>
        </div>
        <div className="w-full h-[221px] border border-dashed border-[#04907E] rounded-[6px] bg-[#E7F6EC] flex items-center justify-center p-4">
          <div className="flex flex-col gap-[10px] items-center">
            <div className="bg-[#B5E3C4] flex justify-center items-center p-[10px] rounded-[8px]">
              <UploadIcon className="text-[#04907E]" />
            </div>

            <div className="space-y-[7px] text-center">
              <p className="font-[500] text-[18px] text-[#131313]">
                Drag & drop your file here or{" "}
                <span className="text-[#04907E]">click to browse</span>
              </p>

              <p className="font-[500] text-[18px] text-[#6C6C6C]">
                PNG, JPG or PDF ~ Max size 10MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[88px]">
        <div className="p-[20px] flex flex-col gap-[20px] bg-[#E7F6EC]">
          <div className="flex justify-between items-center">
            <div className="flex items-start gap-[9px]">
              <TicketHelpIcon />
              <div>
                <p className="font-[600] text-[16px] text-[#131313]">
                  Suggested FAQs
                </p>

                <p className="font-[400] text-[14px] text-[#6C6C6C]">
                  These might help resolve your issue faster
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[5px]">
              <p className="font-[500] text-[15px] text-[#131313]">
                View all articles
              </p>

              <NextIcon />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[16px]">
            {instantMessages.map((item, index) => (
              <div
                key={index}
                className="bg-white p-[10px] rounded-[8px] flex justify-between items-center gap-[10px] border border-[#C7C7C7]"
              >
                <div className="flex items-start gap-[10px]">
                  <div
                    className="w-[20px] h-[20px] flex justify-center items-center rounded-[5px]"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <p className="font-[500] text-[14px] text-[#131313]">
                      {item.msg}
                    </p>
                  </div>
                </div>
                <RightIcon />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center  p-[20px]">
          <div className="flex flex-col items-center gap-[24px]">
            <Button variant="primary" size="newOrder">
              Submit Request to Support
            </Button>

            <p className="font-[600] text-[14px] text-[#6C6C6C] flex items-center gap-[5px]">
              <LockShieldIcon className="text-[#04802E]" /> Our support team
              will contact you via the chat with updates on your ticket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
