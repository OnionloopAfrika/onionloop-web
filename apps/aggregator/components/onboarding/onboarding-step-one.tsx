"use client";

import { useEffect, useRef, useState } from "react";

import { EyeSlashIcon, OpenEyeIcon } from "@/components/icons/svgs";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

export default function OnboardingStepOne() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("1984");
  const [isDateOfBirthCalendarOpen, setIsDateOfBirthCalendarOpen] =
    useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    new Date(1984, 0, 1),
  );
  const dateOfBirthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateOfBirthRef.current &&
        !dateOfBirthRef.current.contains(event.target as Node)
      ) {
        setIsDateOfBirthCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const days = Array.from({ length: 31 }, (_, index) =>
    String(index + 1).padStart(2, "0"),
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) =>
    String(currentYear - index),
  );

  const updateDateFromSelect = (
    nextDay: string,
    nextMonth: string,
    nextYear: string,
  ) => {
    if (!nextMonth || !nextYear) return;

    const monthIndex = months.indexOf(nextMonth);
    const parsedYear = Number(nextYear);
    if (monthIndex < 0 || Number.isNaN(parsedYear)) return;

    const daysInSelectedMonth = new Date(
      parsedYear,
      monthIndex + 1,
      0,
    ).getDate();
    const parsedDay = Math.min(Number(nextDay), daysInSelectedMonth);
    setDateOfBirth(new Date(parsedYear, monthIndex, parsedDay));
  };

  const handleCalendarChange = (date: Date) => {
    setDateOfBirth(date);
    setDay(String(date.getDate()).padStart(2, "0"));
    setMonth(months[date.getMonth()]);
    setYear(String(date.getFullYear()));
    setIsDateOfBirthCalendarOpen(false);
  };

  return (
    <form
      className="mx-auto w-full max-w-[1006px] rounded-[14px]  !bg-white px-[16px] pb-[40px] pt-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:px-[32px]"
      style={{ backgroundColor: "#FFFFFF", opacity: 1 }}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="text-center space-y-[12px]">
        <h1 className="text-[24px] font-[700] text-[#04907E]">
          Create Your Account
        </h1>
        <p className=" text-[16px] text-[#6C6C6C] font-[400]">
          Enter your personal details
        </p>
      </div>

      <div className="mt-[32px] grid grid-cols-1 gap-[16px] md:grid-cols-2">
        <Input label="First Name" defaultValue="Adeganlola" />
        <Input label="Last Name" defaultValue="Ogundare" />

        <div className="md:col-span-2">
          <Input
            label="Email Address"
            type="email"
            defaultValue="josephnadubuchi@gmail.com"
          />
        </div>

        <PhoneInput placeholder="800 000 0000" />

        <Select
          label="Gender"
          placeholder="Select a gender"
          value={gender}
          onValueChange={setGender}
          className="w-full border !border-[#C7C7C7] !bg-[#F7F7F7] "
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "other", label: "Other" },
          ]}
        />

        <div className="md:col-span-2">
          <span className="mb-[8px] block text-[12px] font-[600] text-[#131313]">
            Date of Birth
          </span>
          <div
            ref={dateOfBirthRef}
            className="relative grid grid-cols-[82px_1fr_1fr] gap-[12px]"
          >
            <Select
              placeholder="Day"
              value={day}
              onTriggerClick={() =>
                setIsDateOfBirthCalendarOpen((open) => !open)
              }
              onValueChange={(value) => {
                setDay(value);
                updateDateFromSelect(value, month, year);
              }}
              className="w-full border !border-[#C7C7C7] !bg-[#F7F7F7] "
              options={days.map((value) => ({ value, label: value }))}
            />
            <Select
              placeholder="Month"
              value={month}
              onTriggerClick={() =>
                setIsDateOfBirthCalendarOpen((open) => !open)
              }
              onValueChange={(value) => {
                setMonth(value);
                updateDateFromSelect(day, value, year);
              }}
              className="w-full border !border-[#C7C7C7] !bg-[#F7F7F7] "
              options={months.map((monthName) => ({
                value: monthName,
                label: monthName,
              }))}
            />
            <Select
              placeholder="Year"
              value={year}
              onTriggerClick={() =>
                setIsDateOfBirthCalendarOpen((open) => !open)
              }
              onValueChange={(value) => {
                setYear(value);
                updateDateFromSelect(day, month, value);
              }}
              className="w-full border !border-[#C7C7C7] !bg-[#F7F7F7] "
              options={years.map((value) => ({ value, label: value }))}
            />
            {isDateOfBirthCalendarOpen && (
              <div className="absolute left-0 top-[56px] z-[60]">
                <Calendar value={dateOfBirth} onChange={handleCalendarChange} />
              </div>
            )}
          </div>
          <p className="mt-[8px] font-[400] text-[12px]  text-[#6C6C6C]">
            You must be 18 years and above to create an account
          </p>
        </div>

        <div className="md:col-span-2">
          <Input
            label="Password"
            defaultValue="Magaretade@001"
            type={showPassword ? "text" : "password"}
            icon={
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <OpenEyeIcon color="#8A8A8A" />
                ) : (
                  <EyeSlashIcon className="text-[#8A8A8A]" />
                )}
              </button>
            }
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Confirm Password"
            defaultValue="Magaretade@001"
            type={showConfirmPassword ? "text" : "password"}
            icon={
              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                {showConfirmPassword ? (
                  <OpenEyeIcon color="#8A8A8A" />
                ) : (
                  <EyeSlashIcon className="text-[#8A8A8A]" />
                )}
              </button>
            }
          />
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

      <AuthLink link="/signup" text="Sign up" />
    </form>
  );
}

type AuthProp = {
  text: string;
  link: string;
};

export const AuthLink = ({ link, text }: AuthProp) => {
  return (
    <p className="mt-[32px] font-[400]  text-center text-[14px] text-[#363636]">
      Already have an account?
      <Link
        href={link}
        type="button"
        className="font-[600] text-[14px] text-[#024E44] "
      >
        {text}
      </Link>
    </p>
  );
};
