"use client";

import { SignOutIcon } from "@/components/icons/svgs";
import { Modal } from "@/components/ui/modal";

interface LogoutConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function LogoutConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="!rounded-[16px] !p-6 sm:!p-10"
    >
      <div className="flex flex-col items-center gap-[56px]">
        <div className="flex flex-col items-center gap-[24px]">
          <SignOutIcon className="h-16 w-16 text-[#D51A15]" />
          <div className="flex flex-col items-center gap-[8px]">
            <h2 className="text-center text-[24px] font-[600] text-[#CB1A14]">
              Sign Out Staff Mobile Account?
            </h2>
            <p className="text-center text-[16px] font-[500] text-[#363636]">
              Are you sure you want to sign out this staff mobile as your staff
              member?
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-[52px] rounded-[8px] bg-[#F5F5F5] text-[14px] font-[600] text-[#6C6C6C] hover:bg-[#EEEEEE]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-[52px] rounded-[8px] bg-[#D51A15] text-[14px] font-[600] text-white hover:bg-[#BF1712]"
          >
            Yes, Sign out
          </button>
        </div>
      </div>
    </Modal>
  );
}
