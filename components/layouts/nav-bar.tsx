"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ProfileDropdown from "./profile-dropdown";
import {
  OverviewIcon,
  TransactionIcon,
  InventoryIcon,
  StaffIcon,
  OnionloopIcon,
  MessageIcon,
  NotificationIcon,
  ChevronDownIcon,
  OverviewActiveIcon,
  TransactionActiveIcon,
  InventoryActiveIcon,
  StaffActiveIcon,
  ProfileIcon,
  SettingsIcon,
  LogoutIcon,
  CopyIcon,
  SupportIcon,
  StaffIconSolid,
} from "../icons/svgs";
import NotificationDropdown from "../notifications/notification-dropdown";
import { useSubdomain } from "@/hooks/useSubdomain";
import { NavItem } from "@/utils/constant/navigation";

const ACTIVE_COLOR = "#6C6C6C";

interface DashboardNavProps {
  businessName: string;
  userName: string;
  avatarUrl?: string;
  messageCount?: number;
  notificationCount?: number;
  navItems?: NavItem[];
  showLogo?: boolean;
  productNav: {
    id: string;
    label: string;
    icon: React.ReactNode;
    isDestructive: boolean;
  }[];
}

export default function DashboardNav({
  businessName,
  userName,
  avatarUrl,
  messageCount = 1,
  notificationCount = 4,
  navItems = [],
  showLogo = true,
  productNav = [],
}: DashboardNavProps) {
  const subdomain = useSubdomain();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);
  const [notificationDropdown, setNotificationDropDown] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isMessagesActive = pathname.startsWith("/messages");
  const isNotificationsActive = pathname.startsWith("/notifications");

  const active = isMessagesActive
    ? "messages"
    : isNotificationsActive
      ? "notifications"
      : navItems.find((i) => pathname.startsWith(i.href))?.key;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (showMobileProfile) setShowMobileProfile(false);
  };

  const handleMobileProfileClick = () => {
    setShowMobileProfile(true);
    setIsMenuOpen(false);
  };

  const ROLES = [
    { label: "Cashier", value: "cashier", href: "/mega/cashier/dashboard" },
    {
      label: "Super Admin",
      value: "super-admin",
      href: "/mega/super-admin/dashboard",
    },
    {
      label: "Group Manager",
      value: "group-manager",
      href: "/mega/group-manager/dashboard",
    },
    {
      label: "Branch Manager",
      value: "branch-manager",
      href: "/mega/branch-manager/dashboard",
    },
  ];

  const currentRole =
    ROLES.find((role) => pathname.includes(role.value))?.value || "super-admin";

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sticky top-0 z-[10]">
        <div className="flex items-center h-16 md:h-18 px-4 md:px-7 max-w-360 mx-auto justify-between">
          <div className="flex items-center gap-6">
            {showLogo && (
              <Link
                href={`/${subdomain}`}
                className="flex items-center gap-2 no-underline shrink-0"
              >
                <OnionloopIcon />
              </Link>
            )}

            {subdomain === "mega" && (
              <div className="hidden lg:flex items-center bg-gray-50 p-1 rounded-lg border border-gray-100">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => router.push(role.href)}
                    className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-all ${currentRole === role.value
                        ? "bg-white text-[#024E44] shadow-sm border border-gray-100"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center justify-center gap-1 flex-1">
            {navItems.map((item) => {
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => router.push(item.href)}
                  className={[
                    "relative flex items-center px-4 py-3 gap-2",
                    "border-b-2 bg-transparent cursor-pointer",
                    "text-[14.5px] whitespace-nowrap transition-all duration-150",
                    isActive
                      ? "text-[#024E44] font-bold border-b-[#024E44]"
                      : "text-gray-500 font-normal border-b-transparent hover:text-gray-700",
                  ].join(" ")}
                >
                  {isActive ? item.activeIcon(ACTIVE_COLOR) : item.icon()}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            className={`${active === "messages" || active === "notifications" ? "text-[#024E44]" : "text-[#8A8A8A]"} hidden md:flex items-center gap-2 shrink-0`}
          >
            <div onClick={() => router.push(`/${subdomain}/messages`)}>
              <IconButton badge={messageCount} active={active === "messages"}>
                {active !== "messages" ? (
                  <MessageIcon color={ACTIVE_COLOR} />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 4H17C18.4234 4 19.5335 4.35572 20.2852 5.05371C21.0301 5.74547 21.5 6.84538 21.5 8.5V15.5C21.5 17.1546 21.0301 18.2545 20.2852 18.9463C19.5335 19.6443 18.4234 20 17 20H7C5.57665 20 4.46652 19.6443 3.71484 18.9463C2.96994 18.2545 2.5 17.1546 2.5 15.5V8.5C2.5 6.84538 2.96994 5.74547 3.71484 5.05371C4.46652 4.35572 5.57665 4 7 4ZM17.9668 8.21484C17.5387 7.66607 16.7458 7.59326 16.2178 8.01953L13.0879 10.5195L13.0869 10.5205C12.8116 10.7413 12.4159 10.8672 11.9951 10.8672C11.5744 10.8672 11.1786 10.7413 10.9033 10.5205L10.9023 10.5195L7.77246 8.01953C7.22753 7.57941 6.44601 7.69235 6.02148 8.21484L6.01562 8.22266C5.59988 8.75534 5.68162 9.54528 6.21484 9.97852L6.21777 9.98047L9.34375 12.4766V12.4775C10.0957 13.0907 11.0625 13.3799 12 13.3799C12.9395 13.3799 13.8933 13.0897 14.6523 12.4805L17.7822 9.98047L17.7852 9.97852C18.3148 9.54816 18.4001 8.76297 17.9775 8.22852H17.9785C17.9768 8.22621 17.9744 8.22397 17.9727 8.22168C17.9709 8.21952 17.9695 8.217 17.9678 8.21484H17.9668Z"
                      fill="#024E44"
                      stroke="#024E44"
                    />
                  </svg>
                )}
              </IconButton>
            </div>

            <div
              onMouseEnter={() => setNotificationDropDown(true)}
              onMouseLeave={() => setNotificationDropDown(false)}
            >
              <IconButton
                badge={notificationCount}
                active={active === "notifications"}
              >
                {active !== "notifications" ? (
                  <NotificationIcon color={ACTIVE_COLOR} />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0195 2.5498C15.3628 2.54997 18.0889 5.27563 18.0889 8.62988V10.5C18.0889 10.8024 18.1562 11.1686 18.249 11.501C18.3415 11.8318 18.4738 12.1779 18.6309 12.4365V12.4375L19.7607 14.3174C20.0935 14.8788 20.1562 15.5389 19.9316 16.1426C19.7325 16.6689 19.3416 17.095 18.8271 17.335L18.5996 17.4258C17.5437 17.7777 16.4606 18.0503 15.3701 18.2256L15.3594 18.2275C15.2458 18.2482 15.1581 18.2638 15.0742 18.2715L15.0557 18.2734L15.0371 18.2764L14.5244 18.3428L14.5117 18.3447C14.3059 18.3728 14.0879 18.3919 13.8555 18.4121H13.8506C13.2472 18.4705 12.6335 18.5 12.0195 18.5C11.3951 18.5 10.7702 18.4706 10.1562 18.4121L10.1465 18.4111L9.76758 18.376C9.64278 18.3617 9.51925 18.3442 9.39551 18.3252L9.38574 18.3242L8.9502 18.2646H8.94922C8.88858 18.2541 8.83027 18.2458 8.78223 18.2393L8.63867 18.2178L8.63379 18.2168L7.82129 18.0645C7.01325 17.8979 6.21702 17.6889 5.42773 17.4258L5.42383 17.4238L5.18359 17.332C4.64309 17.0891 4.24587 16.6626 4.05859 16.1562L4.05762 16.1543L3.99219 15.9395C3.86962 15.4274 3.96048 14.844 4.2793 14.3027L5.4082 12.4277L5.41113 12.4229C5.5613 12.1663 5.68995 11.8199 5.78125 11.4883C5.87233 11.1573 5.93939 10.7922 5.93945 10.4902V8.62988C5.93945 5.27763 8.66383 2.55963 12.0195 2.5498ZM11.9893 5.63965C11.2932 5.63965 10.7297 6.20345 10.7295 6.89941V10C10.7296 10.6961 11.2932 11.2598 11.9893 11.2598C12.6853 11.2597 13.2489 10.696 13.249 10V6.89941C13.2488 6.20346 12.6853 5.63967 11.9893 5.63965Z"
                      fill="#024E44"
                      stroke="#024E44"
                    />
                    <path
                      d="M10.2461 20.627V20.6279C10.8279 20.679 11.4226 20.71 12.0195 20.71C12.6067 20.71 13.1917 20.679 13.7637 20.6279H13.7676C13.8099 20.6239 13.8566 20.6192 13.9062 20.6152C13.4451 21.1563 12.7616 21.4999 12 21.5C11.3411 21.5 10.6919 21.2318 10.2393 20.7627L10.2217 20.7451L10.1299 20.6523C10.118 20.6395 10.1073 20.6255 10.0957 20.6123C10.1457 20.6172 10.1958 20.6227 10.2461 20.627Z"
                      fill="#024E44"
                      stroke="#024E44"
                    />
                  </svg>
                )}
              </IconButton>

              {notificationDropdown && (
                <div
                  className="relative translete-y-[20px] "
                  onMouseEnter={() => setNotificationDropDown(true)}
                >
                  <NotificationDropdown
                    setNotificationDropDown={setNotificationDropDown}
                  />
                </div>
              )}
            </div>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsDesktopProfileOpen(true)}
              onMouseLeave={() => setIsDesktopProfileOpen(false)}
            >
              <div className="flex items-center gap-2.5 ml-2 pl-1.5 pr-2.5 py-1.5 rounded-full border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors duration-150">
                <Avatar
                  businessName={businessName}
                  avatarUrl={avatarUrl}
                  userName={userName}
                />
                <div className="flex flex-col gap-[1px]">
                  <span className="text-[13px] font-bold text-gray-900 leading-tight whitespace-nowrap">
                    {businessName}
                  </span>
                  <span className="text-[11.5px] text-gray-400 leading-tight whitespace-nowrap">
                    {userName}
                  </span>
                </div>
                <ChevronDownIcon />
              </div>

              {isDesktopProfileOpen && (
                <ProfileDropdown
                  businessName={businessName}
                  userName={userName}
                  avatarUrl={avatarUrl || "https://i.pravatar.cc/150?u=12"}
                  productNav={productNav}
                />
              )}
            </div>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {showMobileProfile && (
          <div className="md:hidden bg-[#F9FAFB] min-h-[calc(100vh-64px)] p-4 animate-in slide-in-from-right duration-300 overflow-y-auto relative">
            <div
              className={`${"absolute top-[calc(0)] right-0 w-full md:w-96 bg-[#F9FAFB] md:bg-white rounded-xl md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:border border-gray-100 p-4 flex flex-col items-center z-100"}`}
            >
              <div
                className="text-left text-xs w-full py-2 text-[#6C6C6C] pointer"
                onClick={() => setShowMobileProfile(false)}
              >
                &larr;back
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full flex flex-col items-center mb-6 shadow-sm">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 shrink-0  shadow-sm">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#d6f0e6] flex items-center justify-center text-[24px] font-bold text-[#04907E]">
                      {businessName.charAt(0)}
                    </div>
                  )}
                </div>

                <span className="bg-[#F0FDF9] text-[#04907E] text-[11px] font-medium px-3 py-1 rounded-full mb-3">
                  Onion Crew Merchant
                </span>

                <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-1">
                  {businessName}
                </h3>

                <div className="flex items-center gap-2 text-[#666666]">
                  <span className="text-[13px] font-normal">
                    yettymamalounge.onionloopafrika.com
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <CopyIcon />
                  </button>
                </div>
              </div>

              <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {productNav?.map((item, idx) => (
                  <Link
                    href={`/${subdomain}/${item.id}`}
                    key={idx}
                    className={`flex items-center justify-between w-full p-2 transition-all hover:bg-gray-50 border-b border-gray-50 last:border-0 ${active === item.id ? "bg-gray-50" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl border border-gray-50 flex items-center justify-center shrink-0 ${item.isDestructive ? "text-[#D32F2F]" : "text-[#04907E]"}`}
                      >
                        {item.icon}
                      </div>
                      <span
                        className={`text-[14px] ${item.isDestructive ? "text-[#D32F2F] font-medium" : "text-[#363636] font-medium"}`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <div className="text-gray-400">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleMobileProfileClick}
              >
                <Avatar
                  businessName={businessName}
                  avatarUrl={avatarUrl}
                  userName={userName}
                  size="w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-900 leading-tight">
                    {businessName}
                  </span>
                  <span className="text-[12px] text-gray-500">{userName}</span>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-full border border-gray-100 text-gray-400"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M13 1L1 13M1 1L13 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
              {subdomain === "mega" && (
                <div className="px-4 py-2 space-y-2">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Switch Dashboard
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {ROLES.map((role) => (
                      <button
                        key={role.value}
                        onClick={() => {
                          router.push(role.href);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${currentRole === role.value
                            ? "bg-[#E6F0EE] text-[#024E44] font-bold"
                            : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                  <div className="h-px bg-gray-100 my-4" />
                </div>
              )}

              {navItems.map((item) => {
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      router.push(item.href);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14.5px] transition-colors ${isActive
                        ? "bg-[#E6F0EE] text-[#024E44] font-bold"
                        : "text-gray-500 hover:text-gray-700 font-normal"
                      }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      {isActive
                        ? item.activeIcon(ACTIVE_COLOR)
                        : item.icon("#6B7280")}
                    </div>
                    {item.label}
                  </button>
                );
              })}

              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14.5px] transition-colors ${active === "messages"
                    ? "bg-[#E6F0EE] text-[#024E44] font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => {
                  router.push(`/${subdomain}/messages`);
                  setIsMenuOpen(false);
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  {active !== "messages" ? (
                    <MessageIcon color={ACTIVE_COLOR} />
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 4H17C18.4234 4 19.5335 4.35572 20.2852 5.05371C21.0301 5.74547 21.5 6.84538 21.5 8.5V15.5C21.5 17.1546 21.0301 18.2545 20.2852 18.9463C19.5335 19.6443 18.4234 20 17 20H7C5.57665 20 4.46652 19.6443 3.71484 18.9463C2.96994 18.2545 2.5 17.1546 2.5 15.5V8.5C2.5 6.84538 2.96994 5.74547 3.71484 5.05371C4.46652 4.35572 5.57665 4 7 4ZM17.9668 8.21484C17.5387 7.66607 16.7458 7.59326 16.2178 8.01953L13.0879 10.5195L13.0869 10.5205C12.8116 10.7413 12.4159 10.8672 11.9951 10.8672C11.5744 10.8672 11.1786 10.7413 10.9033 10.5205L10.9023 10.5195L7.77246 8.01953C7.22753 7.57941 6.44601 7.69235 6.02148 8.21484L6.01562 8.22266C5.59988 8.75534 5.68162 9.54528 6.21484 9.97852L6.21777 9.98047L9.34375 12.4766V12.4775C10.0957 13.0907 11.0625 13.3799 12 13.3799C12.9395 13.3799 13.8933 13.0897 14.6523 12.4805L17.7822 9.98047L17.7852 9.97852C18.3148 9.54816 18.4001 8.76297 17.9775 8.22852H17.9785C17.9768 8.22621 17.9744 8.22397 17.9727 8.22168C17.9709 8.21952 17.9695 8.217 17.9678 8.21484H17.9668Z"
                        fill="#024E44"
                        stroke="#024E44"
                      />
                    </svg>
                  )}
                </div>
                Messages
              </button>

              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14.5px] transition-colors ${active === "notifications"
                    ? "bg-[#E6F0EE] text-[#024E44] font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => {
                  router.push(`/${subdomain}/notifications`);
                  setIsMenuOpen(false);
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  {active !== "notifications" ? (
                    <NotificationIcon color={ACTIVE_COLOR} />
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0195 2.5498C15.3628 2.54997 18.0889 5.27563 18.0889 8.62988V10.5C18.0889 10.8024 18.1562 11.1686 18.249 11.501C18.3415 11.8318 18.4738 12.1779 18.6309 12.4365V12.4375L19.7607 14.3174C20.0935 14.8788 20.1562 15.5389 19.9316 16.1426C19.7325 16.6689 19.3416 17.095 18.8271 17.335L18.5996 17.4258C17.5437 17.7777 16.4606 18.0503 15.3701 18.2256L15.3594 18.2275C15.2458 18.2482 15.1581 18.2638 15.0742 18.2715L15.0557 18.2734L15.0371 18.2764L14.5244 18.3428L14.5117 18.3447C14.3059 18.3728 14.0879 18.3919 13.8555 18.4121H13.8506C13.2472 18.4705 12.6335 18.5 12.0195 18.5C11.3951 18.5 10.7702 18.4706 10.1562 18.4121L10.1465 18.4111L9.76758 18.376C9.64278 18.3617 9.51925 18.3442 9.39551 18.3252L9.38574 18.3242L8.9502 18.2646H8.94922C8.88858 18.2541 8.83027 18.2458 8.78223 18.2393L8.63867 18.2178L8.63379 18.2168L7.82129 18.0645C7.01325 17.8979 6.21702 17.6889 5.42773 17.4258L5.42383 17.4238L5.18359 17.332C4.64309 17.0891 4.24587 16.6626 4.05859 16.1562L4.05762 16.1543L3.99219 15.9395C3.86962 15.4274 3.96048 14.844 4.2793 14.3027L5.4082 12.4277L5.41113 12.4229C5.5613 12.1663 5.68995 11.8199 5.78125 11.4883C5.87233 11.1573 5.93939 10.7922 5.93945 10.4902V8.62988C5.93945 5.27763 8.66383 2.55963 12.0195 2.5498ZM11.9893 5.63965C11.2932 5.63965 10.7297 6.20345 10.7295 6.89941V10C10.7296 10.6961 11.2932 11.2598 11.9893 11.2598C12.6853 11.2597 13.2489 10.696 13.249 10V6.89941C13.2488 6.20346 12.6853 5.63967 11.9893 5.63965Z"
                        fill="#024E44"
                        stroke="#024E44"
                      />
                      <path
                        d="M10.2461 20.627V20.6279C10.8279 20.679 11.4226 20.71 12.0195 20.71C12.6067 20.71 13.1917 20.679 13.7637 20.6279H13.7676C13.8099 20.6239 13.8566 20.6192 13.9062 20.6152C13.4451 21.1563 12.7616 21.4999 12 21.5C11.3411 21.5 10.6919 21.2318 10.2393 20.7627L10.2217 20.7451L10.1299 20.6523C10.118 20.6395 10.1073 20.6255 10.0957 20.6123C10.1457 20.6172 10.1958 20.6227 10.2461 20.627Z"
                        fill="#024E44"
                        stroke="#024E44"
                      />
                    </svg>
                  )}
                </div>
                Notifications
              </button>
            </div>

            <div className="p-4 border-t border-gray-100 mt-auto">
              <button className="flex items-center gap-3 text-red-600 font-semibold px-4 py-2 w-full">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </div>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Avatar({
  businessName,
  avatarUrl,
  userName,
  size = "w-8 h-8",
}: {
  businessName: string;
  avatarUrl?: string;
  userName: string;
  size?: string;
}) {
  return (
    <div
      className={`${size} rounded-full overflow-hidden shrink-0 border border-gray-100`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={userName}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#E6F0EE] flex items-center justify-center text-[13px] font-bold text-[#024E44]">
          {businessName.charAt(0)}
        </div>
      )}
    </div>
  );
}

function IconButton({
  children,
  badge,
  active,
}: {
  children: React.ReactNode;
  badge?: number;
  active?: boolean;
}) {
  return (
    <button
      className={`relative p-2 rounded-xl transition-all duration-150 border border-transparent ${active
          ? "bg-[#E6F0EE] text-[#024E44]"
          : "text-gray-500 hover:bg-gray-50"
        }`}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-1.5 right-1.5 w-[14px] h-[14px] bg-[#024E44] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
          {badge}
        </span>
      )}
    </button>
  );
}
