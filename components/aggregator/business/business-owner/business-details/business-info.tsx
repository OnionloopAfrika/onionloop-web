import React from "react";
import { BusinessDetails } from "./business-details";
import { PersonalDetails } from "./personal-details";
import { VerificationDetails } from "./verification-details";
import { AddressDetails } from "./address-details";

export function BusinessInfo() {
  return (
    <div className="grid grid-cols-2 gap-[24px]">
      <BusinessDetails />
      <PersonalDetails />
      <VerificationDetails />
      <AddressDetails />
    </div>
  );
}
