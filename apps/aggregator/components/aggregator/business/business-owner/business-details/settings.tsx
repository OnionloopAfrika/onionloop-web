"use client";

import { LogoutIcon, VerifyIcon } from "@/components/icons/svgs";
import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export function Settings() {
  const [resetLink, setResetLink] = useState(false);
  const [placepnd, setPlacepnd] = useState(false);
  const [suspend, setSuspend] = useState(false);
  const [suspended, setSuspended] = useState(false);
  const [reactivate, setReactivate] = useState(false);
  const [reactivated, setReactivated] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-[24px]">
        <div className="divide-y divide-[#E5E7EB]">
          <div className="flex justify-between items-center py-[20px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px] first:pt-0">
            <div className="space-y-[4px]">
              <p className="font-[600] text-[14px] text-[#131313]">
                Password Management
              </p>
              <p className="font-[400] text-[13px] text-[#6C6C6C]">
                Send a password reset link to this business
              </p>
            </div>
            <button
              onClick={() => setResetLink(true)}
              className="px-[16px] py-[10px] rounded-[8px] bg-[#04907E] text-white text-[14px] font-[500] hover:bg-[#037a6a] transition-colors whitespace-nowrap cursor-pointer"
            >
              Send password reset link
            </button>
          </div>

          <div className="flex justify-between items-center py-[20px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px]">
            <div className="space-y-[4px]">
              <p className="font-[600] text-[14px] text-[#131313]">
                Placed PND
              </p>
              <p className="font-[400] text-[13px] text-[#6C6C6C]">
                Place this business on PND(Post No Debit)
              </p>
            </div>
            <button
              onClick={() => setPlacepnd(true)}
              className="px-[16px] py-[10px] rounded-[8px] border border-[#C62828] text-[#C62828] text-[14px] font-[500] hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              Place PND
            </button>
          </div>

          <div className="flex justify-between items-center py-[20px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px]">
            <div className="space-y-[4px]">
              <p className="font-[600] text-[14px] text-[#131313]">
                Remove PND
              </p>
              <p className="font-[400] text-[13px] text-[#6C6C6C]">
                Remove PND restrictions and allow transactions
              </p>
            </div>
            <button className="px-[16px] py-[10px] rounded-[8px] border border-[#04907E] text-[#04907E] text-[14px] font-[500] hover:bg-[#E0F7F4] transition-colors whitespace-nowrap">
              Remove PND
            </button>
          </div>

          <div className="flex justify-between items-center py-[20px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px]">
            <div className="space-y-[4px]">
              <p className="font-[600] text-[14px] text-[#131313]">
                Suspend Business
              </p>
              <p className="font-[400] text-[13px] text-[#6C6C6C]">
                Temporarily suspend this business account
              </p>
            </div>
            <button
              onClick={() => setSuspend(true)}
              className="px-[16px] py-[10px] rounded-[8px] border border-[#C62828] text-[#C62828] text-[14px] font-[500] hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              Suspend
            </button>
          </div>

          <div className="flex justify-between items-center py-[20px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px]">
            <div className="space-y-[4px]">
              <p className="font-[600] text-[14px] text-[#131313]">
                Reactivate Business
              </p>
              <p className="font-[400] text-[13px] text-[#6C6C6C]">
                Reactivate this suspended account
              </p>
            </div>
            <button
              onClick={() => setReactivate(true)}
              className="px-[16px] py-[10px] rounded-[8px] border border-[#04907E] text-[#04907E] text-[14px] font-[500] hover:bg-[#E0F7F4] transition-colors whitespace-nowrap"
            >
              Reactivate
            </button>
          </div>

          <div className="flex justify-between items-center py-[20px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px] last:pb-0">
            <div className="space-y-[4px]">
              <p className="font-[600] text-[14px] text-[#131313]">Transfer</p>
              <p className="font-[400] text-[13px] text-[#6C6C6C]">
                Transfer this business from being a merchant to an agent
              </p>
            </div>
            <button className="px-[16px] py-[10px] rounded-[8px] border border-[#04907E] text-[#04907E] text-[14px] font-[500] hover:bg-[#E0F7F4] transition-colors whitespace-nowrap">
              Transfer Business
            </button>
          </div>
        </div>
      </div>

      <Modal open={resetLink} onOpenChange={setResetLink}>
        <div className="space-y-[40px]">
          <div className="space-y-[40px] ">
            <VerifyIcon className="mx-auto" color="#04907E" />

            <div className="space-y-[8px]">
              <p className="text-center font-[700] text-[24px] text-[#04907E]">
                Resent Link Successfully!
              </p>

              <p className="text-center font-[500] text-[14px] text-[#363636]">
                Password reset link has been sent to @De-light Superstores
              </p>
            </div>
          </div>

          <Button onClick={() => setResetLink(false)}>Done</Button>
        </div>
      </Modal>

      <Modal open={placepnd} onOpenChange={setPlacepnd}>
        <div className="space-y-[40px]">
          <div className="space-y-[40px] ">
            <VerifyIcon className="mx-auto" color="#04907E" />

            <div className="space-y-[8px]">
              <p className="text-center font-[700] text-[24px] text-[#04907E]">
                PND Placed
              </p>

              <p className="text-center font-[500] text-[14px] text-[#363636]">
                Post No Bill(PND) has been set for @De-light Superstores{" "}
              </p>
            </div>
          </div>

          <Button onClick={() => setPlacepnd(false)}>Done</Button>
        </div>
      </Modal>

      <Modal open={suspend} onOpenChange={setSuspend}>
        <div className="space-y-[64px]">
          <div className="flex flex-col items-center gap-[24px]">
            <LogoutIcon className="w-[64px] h-[64px]" color="#CB1A14" />

            <div className="flex flex-col items-center gap-[8px]">
              <p className="font-[600] text-[24px] text-[#CB1A14]">
                Suspend Account?
              </p>

              <p className="font-[400] text-[16px] text-[#363636] text-center">
                You're about to suspend the account of the business @De-light
                Superstores. You'll need to reactivate account for them to use
                their business account.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[16px]">
            <Button variant="secondary">Cancel</Button>
            <Button
              onClick={() => {
                (setSuspend(false), setSuspended(true));
              }}
              variant="danger"
            >
              Yes,Suspend
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={suspended} onOpenChange={setSuspended}>
        <div className="space-y-[40px]">
          <div className="space-y-[40px] ">
            <VerifyIcon className="mx-auto" color="#04907E" />

            <div className="space-y-[8px]">
              <p className="text-center font-[700] text-[24px] text-[#04907E]">
                Account Suspended Successfully!
              </p>

              <p className="text-center font-[500] text-[14px] text-[#363636]">
                Business account for @De-light Superstores has been suspended
              </p>
            </div>
          </div>

          <Button onClick={() => setSuspended(false)}>Done</Button>
        </div>
      </Modal>

      <Modal open={reactivate} onOpenChange={setReactivate}>
        <div className="space-y-[40px]">
          <div className="space-y-[40px] ">
            {/* <VerifyIcon className="mx-auto" color="#04907E" /> */}

            <div className="space-y-[8px]">
              <p className="text-center font-[700] text-[24px] text-[#04907E]">
                Reactivate Account?
              </p>

              <p className="text-center font-[500] text-[14px] text-[#363636]">
                You are about to reactivate the business account of @De-light
                Superstores. Once it is reactivated they will be able to access
                their account.{" "}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <Button variant="secondary" onClick={() => setReactivate(false)}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                (setReactivate(false), setReactivated(true));
              }}
            >
              Reactivate
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={reactivated} onOpenChange={setReactivated}>
        <div className="space-y-[40px]">
          <div className="space-y-[40px] ">
            <VerifyIcon className="mx-auto" color="#04907E" />

            <div className="space-y-[8px]">
              <p className="text-center font-[700] text-[24px] text-[#04907E]">
                Account Reactivated?{" "}
              </p>

              <p className="text-center font-[500] text-[14px] text-[#363636]">
                Business account for @De-light Superstores has been reactivated
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              setReactivated(false);
            }}
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
}
