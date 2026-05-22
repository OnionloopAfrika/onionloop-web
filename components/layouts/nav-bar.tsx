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
} from "../icons/svgs";
import {
  ProfileIcon,
  SettingsIcon,
  LogoutIcon,
  CopyIcon,
  SupportIcon,
  StaffIconSolid,
} from "../icons/svgs";
import NotificationDropdown from "../notifications/notification-dropdown";

const ACTIVE_COLOR = "#024E44";

type NavItem = {
  key: string;
  label: string;
  icon: (color?: string) => React.ReactNode;
  activeIcon: (color?: string) => React.ReactNode;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    key: "overview",
    href: "/overview",
    label: "Overview",
    icon: (color) => <OverviewIcon color={color} />,
    activeIcon: (color) => <OverviewActiveIcon color={color} />,
  },
  {
    key: "transactions",
    href: "/transactions",
    label: "Transactions",
    icon: (color) => <TransactionIcon color={color} />,
    activeIcon: (color) => <TransactionActiveIcon color={color} />,
  },
  {
    key: "inventory",
    href: "/inventory",
    label: "Inventory",
    icon: (color) => <InventoryIcon color={color} />,
    activeIcon: (color) => <InventoryActiveIcon color={color} />,
  },
  {
    key: "staffs",
    href: "/staffs",
    label: "Staffs",
    icon: (color) => <StaffIcon color={color} />,
    activeIcon: (color) => <StaffActiveIcon color={color} />,
  },
];

interface DashboardNavProps {
  businessName: string;
  userName: string;
  avatarUrl?: string;
  messageCount?: number;
  notificationCount?: number;
  activeKey?: string;
}

export default function DashboardNav({
  businessName,
  userName,
  avatarUrl,
  messageCount = 1,
  notificationCount = 4,
}: DashboardNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);
  const [notificationDropdown, setNotificationDropDown] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const active =
    NAV_ITEMS.find((i) => pathname.startsWith(i.href))?.key;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (showMobileProfile) setShowMobileProfile(false);
  };

  const handleMobileProfileClick = () => {
    setShowMobileProfile(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sticky top-0 z-[60]">
        <div className="flex items-center h-16 md:h-18 px-4 md:px-7 max-w-360 mx-auto justify-between">
          <Link
            href="/overview"
            className="flex items-center gap-2 no-underline shrink-0"
          >
            <OnionloopIcon />
          </Link>

          <div className="hidden md:flex items-center justify-center gap-1 flex-1">
            {NAV_ITEMS.map((item) => {
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

          <div className={`${active === "messages" ? "text-[#024E44]" : "text-[#8A8A8A]"} hidden md:flex items-center gap-2 shrink-0`}>
            <div onClick={() => router.push("/messages")}>
              <IconButton badge={messageCount}>
                <MessageIcon />
              </IconButton>
            </div>

            <div
              onMouseEnter={() => setNotificationDropDown(true)}
              onMouseLeave={() => setNotificationDropDown(false)}
            >
              <IconButton badge={notificationCount}>
                <NotificationIcon />
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
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 shrink-0 border-2 border-white shadow-sm">
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
                {[
                  {
                    id: "my-profile",
                    label: "My Profile",
                    icon: <ProfileIcon />,
                    isDestructive: false,
                  },
                  {
                    id: "account-settings",
                    label: "Account Settings",
                    icon: <SettingsIcon />,
                    isDestructive: false,
                  },
                  {
                    id: "staff-app-settings",
                    label: "Staff App Settings",
                    icon: <StaffIconSolid />,
                    isDestructive: false,
                  },
                  {
                    id: "help-and-support",
                    label: "Help & Support",
                    icon: <SupportIcon />,
                    isDestructive: false,
                  },
                  {
                    id: "logout",
                    label: "Log Out",
                    icon: <LogoutIcon />,
                    isDestructive: true,
                  },
                ].map((item, idx) => (
                  <Link
                    href={`/profile/${item.id}`}
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
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      router.push(item.href);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14.5px] transition-colors ${
                      isActive
                        ? "bg-[#E6F0EE] text-[#024E44] font-bold"
                        : "text-gray-600 hover:bg-gray-50"
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

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => router.push('/messages')}>
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <MessageIcon color="#6B7280" />
                </div>
                Messages
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => router.push('/notifications')}>
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <NotificationIcon color="#6B7280" />
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
  size = "w-9 h-9",
}: {
  businessName: string;
  avatarUrl?: string;
  userName: string;
  size?: string;
}) {
  return (
    <div
      className={`${size} rounded-full overflow-hidden shrink-0 bg-[#d6f0e6] flex items-center justify-center border border-gray-100`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={userName}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[13px] font-bold text-[#04907E]">
          {businessName.charAt(0)}
        </span>
      )}
    </div>
  );
}

function IconButton({
  children,
  badge,
}: {
  children: React.ReactNode;
  badge?: number;
}) {
  return (
    <button className="relative flex items-center justify-center w-9.5 h-9.5 rounded-full border border-gray-200 bg-white cursor-pointer shrink-0 hover:border-gray-300 transition-colors duration-150">
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-0.5 right-0.5 min-w-4 h-4 rounded-full bg-red-500 text-white text-[9.5px] font-bold flex items-center justify-center px-[3px] leading-none">
          {badge}
        </span>
      )}
    </button>
  );
}
