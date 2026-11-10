import { ProfileHeader } from "@/components/profile-header";
import React from "react";
import StatCard from "@/components/layouts/card-component";
import {
  CautionIcon,
  WarningIcon,
  TickIcon,
  TimerIcon,
  ResolvedIcon,
} from "@/components/icons/svgs";
import Notifications from "@/components/super-admin/notifications/notifications";
import {
  MessageTrigger,
  Tabs,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="space-y-[24px]">
      <ProfileHeader
        className="border-b-0 pb-[0px]"
        title="Alerts & Notifications"
        subtitle="Real-time operational alerts across all branches"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
        <StatCard
          icon={<CautionIcon className="w-[16px] h-[16px]" />}
          value="3"
          label="Critical Alerts"
          footerText=""
          themeColor="red"
        />
        <StatCard
          icon={<WarningIcon className="w-[16px] h-[16px]" />}
          value="3"
          label="Warning Alerts"
          footerText=""
          themeColor="orange"
        />
        <StatCard
          icon={<ResolvedIcon className="w-[16px] h-[16px]" />}
          value="3"
          label="Resolved Today"
          footerText=""
          themeColor="green"
        />
        <StatCard
          icon={<TimerIcon className="w-[16px] h-[16px]" />}
          value="18"
          label="Avg. Response Time"
          footerText=""
          themeColor="blue"
        />
      </div>

      <div className="rounded-[16px] bg-white py-[24px] px-[16px]">
        <Tabs className="space-y-[16px]" defaultValue="all">
          <TabsList className="w-full flex items-center gap-1 bg-[#F7F7F7] p-[4px] w-fit rounded-full overflow-hidden">
            <MessageTrigger value="all">All</MessageTrigger>
            <MessageTrigger value="critical">Critical(3)</MessageTrigger>
            <MessageTrigger value="warning">Warning(3)</MessageTrigger>
            <MessageTrigger value="resolved">Resolved(3)</MessageTrigger>
          </TabsList>

          <TabsContent value="all">
            <Notifications />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
