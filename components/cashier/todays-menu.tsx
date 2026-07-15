import React from "react";
import { ProfileHeader } from "../profile-header";
import { Toggle } from "../toggle";
import SearchBar from "../ui/search-bar";
import Button from "../ui/button";
import { ScanQrIcon } from "../icons/svgs";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TodaysMenuTabList,
  TodaysTrigger,
} from "../ui/tabs";
import AllMenus, { menuItems } from "./all-menus";

export function TodaysMenu() {
  const categories = ["Drinks", "Snacks", "Groceries"];

  return (
    <div className="space-y-[34px]">
      <ProfileHeader
        className="border-b-0 pb-[0px]"
        title="Today’s Menu"
        subtitle="Explore our selections"
      />

      <div className=" pr-[24px] grid grid-cols-[2fr_1fr] items-center   rounded-[16px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] bg-white">
        <SearchBar
          searchPlaceholder="Search  Products or Categories"
          statusPlaceholder="Sort by:"
          datePlaceholder="Filter by:"
          statusOptions={[
            { value: "all", label: "All Status" },
            { value: "In stock", label: "In stock" },
            { value: "Low stock", label: "Low stock" },
            { value: "Out of stock", label: "Out of stock" },
          ]}
          dateOptions={[
            { value: "Food", label: "Food" },
            { value: "Beverages", label: "Beverages" },
            { value: "Drinks", label: "Drinks" },
            { value: "Snacks", label: "Snacks" },
            { value: "Grocceries", label: "Grocceries" },
            { value: "Household", label: "Household" },
            { value: "Stationaries", label: "Stationaries" },
            { value: "Water", label: "Water" },
            { value: "Alcoholics", label: "Alcoholics" },
            { value: "Fruits", label: "Fruits" },
            { value: "Others", label: "Others" },
          ]}
          categories={categories}
          products={menuItems}
        />

        <Button className="ml-auto" variant="scan" size="scan">
          <ScanQrIcon /> Scan Item
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-[32px]">
        <TodaysMenuTabList>
          <TodaysTrigger value="all">All</TodaysTrigger>
          <TodaysTrigger value="drinks">Drinks</TodaysTrigger>
          <TodaysTrigger value="fruits">Fruits</TodaysTrigger>
          <TodaysTrigger value="snacks">Snacks</TodaysTrigger>
          <TodaysTrigger value="burger">Burger</TodaysTrigger>
          <TodaysTrigger value="french-fries">French Fries</TodaysTrigger>
          <TodaysTrigger value="salad">Salad</TodaysTrigger>
          <TodaysTrigger value="others">Others</TodaysTrigger>
        </TodaysMenuTabList>

        <TabsContent value="all">
          <AllMenus />
        </TabsContent>
        <TabsContent value="drinks">
          <AllMenus />
        </TabsContent>
        <TabsContent value="fruits">
          <AllMenus />
        </TabsContent>
        <TabsContent value="snacks">
          <AllMenus />
        </TabsContent>
        <TabsContent value="burger">
          <AllMenus />
        </TabsContent>
        <TabsContent value="french-fries">
          <AllMenus />
        </TabsContent>
        <TabsContent value="salad">
          <AllMenus />
        </TabsContent>
        <TabsContent value="others">
          <AllMenus />
        </TabsContent>
      </Tabs>
    </div>
  );
}
