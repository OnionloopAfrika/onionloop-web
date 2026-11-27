"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { OnionloopIcon, SidebarTrigger } from "../icons/svgs";
import { NavItem, NavSection } from "@/utils/constant/navigation";

interface MegaSidebarProps {
  navItems?: NavItem[];
  navSections?: NavSection[];
}

export default function MegaSidebar({
  navItems,
  navSections,
}: MegaSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const nextState = !prev;
      localStorage.setItem("sidebar-collapsed", JSON.stringify(nextState));
      return nextState;
    });
  };

  const renderItem = (item: NavItem) => {
    const isActive = pathname.startsWith(item.href);
    return (
      <div
        key={item.key}
        onClick={() => router.push(item.href)}
        className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
          isActive
            ? "bg-[#B5E3C4] text-[#024E44] font-[600] text-[16px]"
            : "text-[#8A8A8A] hover:bg-gray-50 font-[500] text-[16px]"
        }`}
      >
        <div className="flex items-center gap-[8px]">
          <div
            className={`transition-colors duration-200 ${isActive ? "text-[#024E44]" : "text-gray-400 group-hover:text-gray-600"} relative`}
          >
            {isActive ? item.activeIcon("#024E44") : item.icon("#9CA3AF")}
            {isCollapsed && item.badge && (
              <span className="absolute -top-2 -right-2 bg-[#D32F2F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {item.badge}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-[16px] whitespace-nowrap">{item.label}</span>
          )}
        </div>
        {!isCollapsed && item.badge && (
          <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`hidden md:flex flex-col ${isCollapsed ? "w-20" : "w-72"} bg-white border-r border-gray-100 h-screen sticky top-0 overflow-y-auto transition-all duration-300`}
    >
      <div
        className={`p-6 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}
      >
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2 no-underline">
            <OnionloopIcon />
          </Link>
        )}
        <button
          onClick={handleToggleCollapse}
          className="p-1.5 rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"
        >
          <SidebarTrigger />
        </button>
      </div>

      <div className="flex-1 py-6 px-4 space-y-6 ">
        {navSections ? (
          navSections.map((section, idx) => (
            <div key={idx} className="space-y-[8px] ">
              {!isCollapsed && (
                <p className="px-4 text-[12px] font-semibold text-[#8A8A8A] uppercase tracking-[0.02em] mb-3">
                  {section.label}
                </p>
              )}
              <div className="space-y-[8px] ">
                {section.items.map((item) => renderItem(item))}
              </div>
              {idx < navSections.length - 1 && !isCollapsed && (
                <div className="mx-4 h-px bg-gray-100 mt-6" />
              )}
            </div>
          ))
        ) : (
          <div className="space-y-[16px] ">
            {navItems?.map((item) => renderItem(item))}
          </div>
        )}
      </div>
    </aside>
  );
}
