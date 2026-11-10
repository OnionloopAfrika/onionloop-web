"use client";

import React, { useState } from "react";
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

interface MenuItem {
  id: string;
  name: string;
  price: string;
  stock: string;
  image: string;
  isAdded: boolean;
  category: string;
}

export function TodaysMenu() {
  const categories = ["Drinks", "Snacks", "Groceries"];
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("Food");
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const stockLower = item.stock.toLowerCase();
    let matchesStatus = true;
    if (statusFilter !== "all") {
      if (statusFilter === "In stock") {
        matchesStatus =
          stockLower.includes("in stock") && !stockLower.includes("low");
      } else if (statusFilter === "Low stock") {
        matchesStatus = stockLower.includes("low");
      } else if (statusFilter === "Out of stock") {
        matchesStatus = stockLower.includes("out of stock");
      }
    }

    let matchesDate = true;
    if (dateFilter !== "Food") {
      matchesDate = item.category.toLowerCase() === dateFilter.toLowerCase();
    }

    let matchesTab = true;
    if (activeTab !== "all") {
      matchesTab =
        item.category.toLowerCase() === activeTab.toLowerCase() ||
        item.name.toLowerCase().includes(activeTab.toLowerCase());
    }

    return matchesSearch && matchesStatus && matchesDate && matchesTab;
  });

  return (
    <div className="space-y-[34px]">
      <ProfileHeader
        className="border-b-0 pb-[0px]"
        title="Today’s Menu"
        subtitle="Explore our selections"
      />

      <div className="w-full flex md:pr-[24px] max-lg:flex-col max-lg:pb-[24px] max-lg:pr-[0px] justify-between items-center  rounded-[8px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] bg-white">
        <SearchBar
          searchPlaceholder="Search  Products or Categories"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          statusPlaceholder="Sort by:"
          statusValue={statusFilter}
          onStatusChange={setStatusFilter}
          datePlaceholder="Filter by:"
          dateValue={dateFilter}
          onDateChange={setDateFilter}
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

        <div className="w-50 flex justify-end max-lg:px-[24px]">
          <Button className="max-lg:w-full" variant="scan" size="scan">
            <ScanQrIcon /> Scan Item
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-[32px]"
        value={activeTab}
        onValueChange={setActiveTab}
      >
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
          <AllMenus items={filteredItems} />
        </TabsContent>
        <TabsContent value="drinks">
          <AllMenus items={filteredItems} />
        </TabsContent>
        <TabsContent value="fruits">
          <AllMenus items={filteredItems} />
        </TabsContent>
        <TabsContent value="snacks">
          <AllMenus items={filteredItems} />
        </TabsContent>
        <TabsContent value="burger">
          <AllMenus items={filteredItems} />
        </TabsContent>
        <TabsContent value="french-fries">
          <AllMenus items={filteredItems} />
        </TabsContent>
        <TabsContent value="salad">
          <AllMenus items={filteredItems} />
        </TabsContent>
        <TabsContent value="others">
          <AllMenus items={filteredItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
