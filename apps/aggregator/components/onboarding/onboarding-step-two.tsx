"use client";

import { useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

export default function OnboardingStepTwo() {
  const [businessType, setBusinessType] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  return (
    <form
      className="mx-auto w-full max-w-[1006px] rounded-[14px] bg-white px-[16px] pb-[40px] pt-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:px-[32px]"
      style={{ backgroundColor: "#FFFFFF", opacity: 1 }}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-[12px] text-center">
        <h1 className="text-[24px] font-[700] text-[#04907E]">
          Create Your Account
        </h1>
        <p className="text-[16px] font-[400] text-[#6C6C6C]">
          Enter your business details
        </p>
      </div>

      <div className="mt-[32px] grid grid-cols-1 gap-[16px] md:grid-cols-2">
        <Input label="Business Name" defaultValue="Adegoriola" />

        <Select
          label="Business Type"
          placeholder="Select type"
          value={businessType}
          onValueChange={setBusinessType}
          className="w-full border !border-[#C7C7C7] !bg-[#F7F7F7]"
          options={[
            { value: "merchant", label: "Merchant" },
            { value: "agent", label: "Agent" },
            { value: "company", label: "Company" },
          ]}
        />

        <Input label="Business Location" defaultValue="653, Allen adekunle" />

        <Select
          label="City"
          placeholder="Select city"
          value={city}
          onValueChange={setCity}
          className="w-full border !border-[#C7C7C7] !bg-[#F7F7F7]"
          options={[
            { value: "ikeja", label: "Ikeja" },
            { value: "lagos", label: "Lagos" },
            { value: "lekki", label: "Lekki" },
            { value: "surulere", label: "Surulere" },
          ]}
        />

        <Select
          label="State"
          placeholder="Select state"
          value={state}
          onValueChange={setState}
          className="w-full border !border-[#C7C7C7] !bg-[#F7F7F7]"
          options={[
            { value: "lagos", label: "Lagos" },
            { value: "abia", label: "Abia" },
            { value: "fct", label: "FCT" },
            { value: "ogun", label: "Ogun" },
          ]}
        />

        <div>
          <span className="mb-[8px] block text-[12px] font-[600] text-[#131313]">
            Country
          </span>
          <Input defaultValue="Nigeria" readOnly />
        </div>

        <div className="md:col-span-2">
          <Input label="CAC Number" defaultValue="RCC1234567" />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="sm"
        className="mt-[28px] h-[52px] !bg-[#044E49] !py-0 text-[14px]"
      >
        Next
      </Button>

      <p className="mt-[32px] text-center text-[14px] font-[400] text-[#363636]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-[14px] font-[600] text-[#024E44]"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
