"use client";

import Image from "next/image";
import Button from "../../components/ui/button";
import Switch from "../../components/ui/switch";
import { useState } from "react";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select";

import {
  EyeSlashIcon,
  ChartIcon,
  InventoryIcon,
  StaffIcon,
  SmsIcon,
  NotificationIcon,
  HomeIcon,
  CalendarIcon,
  DownloadIcon,
  RevenueIcon,
  CautionIcon,
  WarningIcon,
  ShieldIcon,
  Warning2Icon,
  ReceiptEditIcon,
  ProfileIcon,
  SettingsIcon,
  HelpIcon,
  CopyIconIcon,
  DiagramIcon,
  PermissionIcon,
  LogoutIcon,
  SignOutIcon,
  LiveChatIcon,
  InboxIcon,
  CallIcon,
  SyncIcon,
  LockIcon,
  LocationIcon,
  TransactionIcon,
  PaymentIcon,
  CardProblemIcon,
  AppSyncIcon,
  OthersIcon,
  UploadIcon,
  ArrowRightIcon,
  SecuritySafeIcon,
  RecordCircleIcon,
  MicrophoneIcon,
  EndCallIcon,
  BarIcon,
  UnlimitedTransactionIcon,
  BriefcaseIcon,
  MoneySendIcon,
  StarIcon,
  CardIcon,
  BankIcon,
  MultiplyIcon,
  VerifyIcon,
  OnionIcon,
  NoProductsIcon,
  UploadImageIcon,
  MarkIcon,
  AddIcon,
  ShopAddIcon,
  ChainlinkIcon,
  DangerIcon,
  EditIcon,
  DeleteIcon,
  SearchIcon,
  TimerIcon,
  WaveIcon,
  PhoneNumberIcon,
  RoleIcon,
} from "@/components/icons/svgs";

const page = () => {
  const clickBtn = () => {
    alert("Button is Clickable");
  };
  const [selectedRole, setSelectedRole] = useState("");

  const [checked, setChecked] = useState(true);

  return (
    <div className="w-full max-w-150 mx-auto p-6">
      Playground for this application. In this page return all custom ui
      components only. e.g Buttons, Input field, singleSelect and
      multipleSelect. Modal, date picker, switch, day picker etc.
      <br />
      <br />
      All components should have default variant as well as variant when
      specific variant props are passed to it. All components should have
      default size e.g lg, md, sm. and different style for different variant
      <br />
      UI Documentation & Component Playground1.
      <br />
      <br />
      1.Design System Overview: They follow a strict size and variant hierarchy
      to ensure consistency across the admin dashboard.SizeUsagesmTables, tight
      sidebars, or condensed forms.mdStandard UI interactions
      (Default).lgFeatured actions, Login/Auth pages, or Hero sections.
      <br />
      <br />
      2. Actions Buttons The primary interaction element. Supports multiple
      visual priorities.Props:variant: "primary" | "secondary" | "outline" |
      "ghost" | "danger"size: "sm" | "md" | "lg"isLoading: boolean, Disables
      interaction and shows a spinner
      <br />
      <br />
      3. Form Inputs Used for data entry. Includes standard text inputs and
      specialized pickers.
      <br />
      Text & Select Inputs Standard: Default border and focus states.
      <br />
      Error State: Applied via the error prop or a status="error" variant.
      <br />
      Disabled: Standard gray-out with not-allowed cursor.
      <br />
      Multi-Select & Single-Select These custom components extend the native
      select functionality with searchability and tag-based selection.
      <br />
      SingleSelect: Replaces native select with a custom searchable dropdown.
      <br />
      MultipleSelect: Allows "Chip" or "Tag" selection with a clearable "X"
      icon.
      <br />
      <br />
      <br />
      4. Overlays & Modals Components that sit above the main UI layer.
      <br />
      Modal: Center-aligned, requires an isOpen state and an onClose callback.
      Supports initialFocus for accessibility.
      <br />
      Popover: Used for settings menus or small contextual tooltips.
      <br />
      DatePicker: A popover containing a calendar grid for selecting specific
      dates.
      <br />
      <br />
      5. Control Toggles Small utility components for binary choices.
      <br />
      Switch: A high-visibility replacement for checkboxes, ideal for
      "Active/Inactive" settings.
      <br />
      DayPicker: A multi-select grid used specifically for selecting days of the
      week (common in scheduling logic).
      <br />
      <br />
      6. Playground Live Preview Use the section below to verify component
      behavior in real-time. <br /> <br />
      {/* COMPONENTS EXAMPLES */}
      <p>Primary Button</p>
      <Button
        variant="primary"
        size="sm"
        children="Primary Button"
      /> <br /> <br />
      <p>
        Outline button with icon..... we can also use an icon like lucide-icons
      </p>
      <div className="bg-white p-5">
        <Button
          icon={
            <Image src={"/icons/calendar.svg"} width={20} height={20} alt="" />
          }
          variant="outline"
          size="sm"
          children="Outline Button"
        />
      </div>
      <br />
      <br />
      <p>this button is used in the profile settings screens</p>
      <Button variant="save" size="save" children="Save Settings" /> <br />{" "}
      <br />
      <br />
      <p>the two buttons below are used in modals</p>
      <Button
        variant="secondary"
        size="sm"
        children="Save Settings"
      /> <br /> <br />
      <Button variant="danger" size="sm" children="Delete Item" /> <br />
      <br />
      <p>button used on staff cards</p>
      <Button
        onClick={clickBtn}
        variant="msg"
        size="msg"
        children="Send Message"
      />{" "}
      <br />
      <br />
      <Switch checked={checked} onCheckedChange={setChecked} /> <br />
      <br />
      <p>input and select fields</p>
      <div className="bg-white p-[20px] rounded-[20px] space-y-[50px]">
        <Input
          label="Current Password"
          placeholder="00000000"
          icon={
            <Image
              src={"/icons/calendar.svg"}
              width={20}
              height={20}
              alt="hdhd"
            />
          }
        />

        <Select
          label="Role"
          placeholder="Select your role"
          value={selectedRole}
          onValueChange={setSelectedRole}
          options={[
            { value: "admin", label: "Administrator" },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
          ]}
        />
      </div>
      <div className="grid grid-cols-10 bg-yellow-300">
        <EyeSlashIcon className="w-8 h-8 text-white" />
        <ChartIcon className="w-8 h-8 text-white" />
        <InventoryIcon className="w-8 h-8 text-white" />
        <StaffIcon className="w-8 h-8 text-white" />
        <SmsIcon className="w-8 h-8 text-white" />
        <NotificationIcon className="w-8 h-8 text-white" />
        <HomeIcon className="w-8 h-8 text-white" />
        <CalendarIcon className="w-8 h-8 text-white" />

        <DownloadIcon className="w-8 h-8 text-white" />
        <RevenueIcon className="w-8 h-8 text-white" />
        <CautionIcon className="w-8 h-8 text-white" />
        <WarningIcon className="w-8 h-8 text-white" />
        <ShieldIcon className="w-8 h-8 text-white" />
        <Warning2Icon className="w-8 h-8 text-white" />
        <ReceiptEditIcon className="w-8 h-8 text-white" />
        <ProfileIcon className="w-8 h-8 text-white" />
        <SettingsIcon className="w-8 h-8 text-white" />
        <HelpIcon className="w-8 h-8 text-white" />
        <CopyIconIcon className="w-8 h-8 text-white" />
        <DiagramIcon className="w-8 h-8 text-white" />
        <PermissionIcon className="w-8 h-8 text-white" />
        <LogoutIcon className="w-8 h-8 text-white" />
        <SignOutIcon className="w-8 h-8 text-white" />
        <LiveChatIcon className="w-8 h-8 text-white" />
        <InboxIcon className="w-8 h-8 text-white" />
        <CallIcon className="w-8 h-8 text-white" />
        <SyncIcon className="w-8 h-8 text-white" />
        <LockIcon className="w-8 h-8 text-white" />
        <LocationIcon className="w-8 h-8 text-white" />
        <TransactionIcon className="w-8 h-8 text-white" />
        <PaymentIcon className="w-8 h-8 text-white" />
        <CardProblemIcon className="w-8 h-8 text-white" />
        <AppSyncIcon className="w-8 h-8 text-white" />
        <OthersIcon className="w-8 h-8 text-white" />
        <UploadIcon className="w-8 h-8 text-white" />
        <ArrowRightIcon className="w-8 h-8 text-white" />
        <SecuritySafeIcon className="w-8 h-8 text-white" />
        <RecordCircleIcon className="w-8 h-8 text-white" />
        <MicrophoneIcon className="w-8 h-8 text-white" />
        <EndCallIcon className="w-8 h-8 text-white" />
        <BarIcon className="w-8 h-8 text-white" />
        <UnlimitedTransactionIcon className="w-8 h-8 text-white" />
        <BriefcaseIcon className="w-8 h-8 text-white" />
        <MoneySendIcon className="w-8 h-8 text-white" />
        <StarIcon className="w-8 h-8 text-white" />
        <CardIcon className="w-8 h-8 text-white" />
        <BankIcon className="w-8 h-8 text-white" />
        <MultiplyIcon className="w-8 h-8 text-white" />
        <VerifyIcon className="w-8 h-8 text-white" />
        <OnionIcon className="w-8 h-8 text-white" />
        <NoProductsIcon className="w-8 h-8 text-white" />
        <UploadImageIcon className="w-8 h-8 text-white" />
        <MarkIcon className="w-8 h-8 text-white" />
        <AddIcon className="w-8 h-8 text-white" />
        <ShopAddIcon className="w-8 h-8 text-white" />
        <ChainlinkIcon className="w-8 h-8 text-white" />
        <DangerIcon className="w-8 h-8 text-white" />
        <EditIcon className="w-8 h-8 text-white" />
        <DeleteIcon className="w-8 h-8 text-white" />
        <SearchIcon className="w-8 h-8 text-white" />
        <TimerIcon className="w-8 h-8 text-white" />
        <WaveIcon className="w-8 h-8 text-white" />
        <PhoneNumberIcon className="w-8 h-8 text-white" />
        <RoleIcon className="w-8 h-8 text-[#04907e]" />
      </div>
    </div>
  );
};

export default page;
