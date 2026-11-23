import Header from "@/components/layouts/header";
import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import React from "react";
import All from "./all";

export default function NotificationsDashboard() {
  return (
    <div className="space-y-[24px]">
      <Header
        heading="Notifications"
        subHeading="Keep track of important notifications "
      />

      <div>
        <Tabs defaultValue="All">
          <div className=" p-[16px] rounded-[16px] bg-white border border-[#E5E7EB] mb-[12px]">
            <NavTabsList className=" w-fit">
              <NavTabsTrigger value="All">All</NavTabsTrigger>
              <NavTabsTrigger value="Read">Read</NavTabsTrigger>
              <NavTabsTrigger value="Unread">Unread</NavTabsTrigger>
            </NavTabsList>
          </div>

          <TabsContent value="All">
            <All />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
