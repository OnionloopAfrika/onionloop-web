"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}

function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [internalActiveTab, internalSetActiveTab] = useState(
    defaultValue || "",
  );
  const activeTab = value !== undefined ? value : internalActiveTab;

  const setActiveTab = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      internalSetActiveTab(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div className={`flex gap-[16px] overflow-x-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

function TodaysMenuTabList({ children, className, ...props }: TabsListProps) {
  return (
    <div className={`flex gap-[8px] overflow-x-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

function NavTabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div
      className={`flex gap-[8px] rounded-[12px] p-[4px] bg-[#F7F7F7] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function NavTabsTrigger({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`h-[44px] py-[8px] px-[16px] transition-all whitespace-nowrap font-[500] text-[16px] rounded-[8px]  cursor-pointer ${
        isActive
          ? "bg-white text-primary-color font-[700]"
          : "text-[#6C6C6C] bg-[#F7F7F7]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function TodaysTrigger({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`h-[52px] py-[5px] px-[12px] transition-all whitespace-nowrap font-[500] text-[18px] rounded-[3px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer ${
        isActive ? "bg-[#024E44] text-white" : "text-[#8A8A8A] bg-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface OnboardingTriggerProps extends TabsTriggerProps {
  label?: ReactNode;
}

function OnboardingProgressLine({
  beforeStep,
  className,
}: {
  beforeStep: number;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const activeStepNumber = Number(context.activeTab.split("_")[1]);

  return (
    <hr
      className={`flex-1 border-0 border-t-[4px] transition-colors ${
        activeStepNumber > beforeStep ? "border-[#04802E]" : "border-[#A8A8A8]"
      } ${className ?? ""}`}
    />
  );
}

function OnboardingTrigger({
  value,
  children,
  label,
  className,
  ...props
}: OnboardingTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;
  const stepNumber = Number(children);
  const activeStepNumber = Number(context.activeTab.split("_")[1]);
  const isCompleted = stepNumber < activeStepNumber;
  const showCheck = isCompleted;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`flex  shrink-0 flex-col items-center gap-[12px] bg-transparent p-0 text-center cursor-pointer ${className ?? ""}`}
      {...props}
    >
      <span
        className={`flex h-[70px] w-[70px] items-center justify-center rounded-full font-[500] text-[24px] text-white transition-colors ${
          isActive
            ? "bg-[#04907E]"
            : isCompleted
              ? "bg-[#04802E]"
              : "bg-[#A8A8A8]"
        }`}
      >
        {showCheck ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 14L11.5 19.5L22 9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          children
        )}
      </span>
      {label && (
        <span
          className={`whitespace-normal text-[14px] font-[500] ${
            isActive
              ? "text-[#04907E]"
              : isCompleted
                ? "text-[#04802E]"
                : "text-[#A8A8A8]"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

function PaymentTrigger({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`h-full  p-[12px] transition-all whitespace-nowrap font-[500] text-[14px] max-lg:text-[12px]   cursor-pointer ${
        isActive
          ? "bg-[#F7F7F7] text-primary-color rounded-full"
          : "text-[#6C6C6C] bg-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children?: ReactNode;
}

function TabsTrigger({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`px-[32px] py-[16px] rounded-[8px] font-[600] text-[16px] transition-all whitespace-nowrap ${
        isActive ? "bg-[#004D40] text-white" : "bg-[#F7F7F7] text-[#6C6C6C]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function TicketsTrigger({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TicketsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;
  const iconColor = isActive ? "#FFFFFF" : "#363636";

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`px-[16px]  overflow-x-auto truncate py-2 rounded-[8px] font-[500] cursor-pointer text-[14px] transition-all whitespace-nowrap flex justify-center items-center gap-[8px]  ${
        isActive
          ? "bg-[#04907E] text-white"
          : "bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-[#363636]"
      } ${className || ""}`}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (typeof child.type === "function" || child.type === "svg") {
            return React.cloneElement(child, {
              color: iconColor,
              className: `${(child.props as { className?: string }).className || ""} ${
                isActive ? "text-white" : "text-[#363636]"
              }`,
            } as any);
          }
        }
        return child;
      })}
    </button>
  );
}

function MessageTrigger({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`h-[44px] py-[5px] px-2 transition-all whitespace-nowrap font-[500] text-[12px] sm:text-[16px] rounded-full  cursor-pointer ${
        isActive ? "bg-white text-[#024E44]" : "text-[#6C6C6C] bg-[#F7F7F7]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

function TabsContent({
  value,
  children,
  className,
  ...props
}: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.activeTab !== value) return null;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  NavTabsList,
  TabsContent,
  TodaysMenuTabList,
  TodaysTrigger,
  PaymentTrigger,
  NavTabsTrigger,
  TicketsTrigger,
  MessageTrigger,
  OnboardingTrigger,
  OnboardingProgressLine,
};
