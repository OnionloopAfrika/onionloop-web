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
import { Calendar } from "@/components/ui/calendar";

const page = () => {
  const clickBtn = () => {
    alert("Button is Clickable");
  };
  const [selectedRole, setSelectedRole] = useState("");

  const [checked, setChecked] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  // const events = {
  //   "2026-04-22": true,
  //   "2026-04-25": true,
  //   "2026-04-28": true,
  // };

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
          prefixicon={
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
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">1</span>
          <EyeSlashIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">2</span>
          <ChartIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">3</span>
          <InventoryIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">4</span>
          <StaffIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">5</span>
          <SmsIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">6</span>
          <NotificationIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">7</span>
          <HomeIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">8</span>
          <CalendarIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">9</span>
          <DownloadIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">10</span>
          <RevenueIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">11</span>
          <CautionIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">12</span>
          <WarningIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">13</span>
          <ShieldIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">14</span>
          <Warning2Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">15</span>
          <ReceiptEditIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">16</span>
          <ProfileIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">17</span>
          <SettingsIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">18</span>
          <HelpIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">19</span>
          <CopyIconIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">20</span>
          <DiagramIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">21</span>
          <PermissionIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">22</span>
          <LogoutIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">23</span>
          <SignOutIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">24</span>
          <LiveChatIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">25</span>
          <InboxIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">26</span>
          <CallIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">27</span>
          <SyncIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">28</span>
          <LockIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">29</span>
          <LocationIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">30</span>
          <TransactionIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">31</span>
          <PaymentIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">32</span>
          <CardProblemIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">33</span>
          <AppSyncIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">34</span>
          <OthersIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">35</span>
          <UploadIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">36</span>
          <ArrowRightIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">37</span>
          <SecuritySafeIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">38</span>
          <RecordCircleIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">39</span>
          <MicrophoneIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">40</span>
          <EndCallIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">41</span>
          <BarIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">42</span>
          <UnlimitedTransactionIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">43</span>
          <BriefcaseIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">44</span>
          <MoneySendIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">45</span>
          <StarIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">46</span>
          <CardIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">47</span>
          <BankIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">48</span>
          <MultiplyIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">49</span>
          <VerifyIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">50</span>
          <OnionIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">51</span>
          <NoProductsIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">52</span>
          <UploadImageIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">53</span>
          <MarkIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">54</span>
          <AddIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">55</span>
          <ShopAddIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">56</span>
          <ChainlinkIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">57</span>
          <DangerIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">58</span>
          <EditIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">59</span>
          <DeleteIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">60</span>
          <SearchIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">61</span>
          <TimerIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">62</span>
          <WaveIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">63</span>
          <PhoneNumberIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <span className="text-sm font-bold text-black">64</span>
          <RoleIcon className="w-8 h-8 text-[#04907e]" />
        </div>
      </div>
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        // events={events}
      />
    </div>
  );
};

export default page;
