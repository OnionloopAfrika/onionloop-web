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
  defaultValue: string;
  children?: ReactNode;
}

function Tabs({ defaultValue, children, className, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

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
        isActive ? "bg-white text-primary-color" : "text-[#6C6C6C] bg-[#F7F7F7]"
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
      className={`h-[52px] py-[5px] px-[12px] transition-all whitespace-nowrap font-[500] text-[18px] rounded-[3px] shadow-[0_0_15px_rgba(0,0,0,0.15)] cursor-pointer ${
        isActive ? "bg-[#024E44] text-white" : "text-[#8A8A8A] bg-white"
      } ${className}`}
      {...props}
    >
      {children}
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
      className={`h-full  p-[12px] transition-all whitespace-nowrap font-[500] text-[14px]   cursor-pointer ${
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
      className={`px-3 h-[54px] overflow-x-auto truncate py-2 rounded-[8px] font-[500] text-[14px] transition-all whitespace-nowrap flex justify-center items-center gap-[8px]  ${
        isActive
          ? "bg-[#04907E] text-white"
          : "bg-[#F7F7F7] border border-[#C7C7C7] text-[#363636]"
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
};
