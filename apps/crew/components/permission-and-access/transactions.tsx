"use client";
import React from "react";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import SwitchToggle from "../ui/switch-toggle";

export function Transactions() {
  const [toggleStates, setToggleStates] = useState({
    viewTransactions: true,
    exportTransactions: true,
    refundTransactions: true,
    viewWalletBalance: true,
  });

  const handleToggleChange = (
    key: keyof typeof toggleStates,
    checked: boolean,
  ) => {
    setToggleStates((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="rounded-[12px] p-[16px] min-h-[216px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white space-y-[24px]">
      {" "}
      <PermissionsHeader title="Transactions" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="view transactions"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.viewTransactions}
              onCheckedChange={(checked) =>
                handleToggleChange("viewTransactions", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="Export transactions"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.exportTransactions}
              onCheckedChange={(checked) =>
                handleToggleChange("exportTransactions", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="Refund transactions"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.refundTransactions}
              onCheckedChange={(checked) =>
                handleToggleChange("refundTransactions", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="view wallet balance"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.viewWalletBalance}
              onCheckedChange={(checked) =>
                handleToggleChange("viewWalletBalance", checked)
              }
            />
          }
        />
      </div>
    </div>
  );
}
