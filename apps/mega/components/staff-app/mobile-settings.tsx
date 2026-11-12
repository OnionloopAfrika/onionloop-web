"use client";

import { useState } from "react";
import { MobileApp } from "../mobile-app";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import { Modal } from "../ui/modal";
import { SignOutIcon } from "../icons/svgs";

export function MobileSettings() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  return (
    <div className="p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[40px] bg-white">
      <ProfileHeader
        title="Mobile App Settings"
        subtitle="Control the staff app experience"
      />

      <div className="space-y-[24px]">
        <MobileApp
          avatar="/icons/avatar.svg"
          fullName="Titi Folarin"
          role="Cashier"
          btn={
            <Button onClick={openModal} variant="signout" size="md">
              Sign Out
            </Button>
          }
        />

        <MobileApp
          avatar="/icons/avatar.svg"
          fullName="Titi Folarin"
          role="Cashier"
          btn={
            <Button onClick={openModal} variant="signout" size="md">
              Sign Out
            </Button>
          }
        />

        <MobileApp
          className="border-b-0"
          avatar="/icons/avatar.svg"
          fullName="Titi Folarin"
          role="Cashier"
          btn={
            <Button onClick={openModal} variant="signout" size="md">
              Sign Out
            </Button>
          }
        />
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <div className=" space-y-[64px] ">
          <div className=" flex flex-col gap-[24px] items-center">
            <SignOutIcon className="text-danger" />

            <div className="space-y-[12px] text-center">
              <p className="font-[600] text-[24px] text-danger">
                Sign Out Staff Mobile Account?
              </p>
              <p className="font-[500] text-[16px] text-[#363636]">
                Are you sure you want to sign out this staff mobile as your
                staff member?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <Button variant="secondary">Cancel </Button>
            <Button variant="danger">Yes, Sign Out </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
