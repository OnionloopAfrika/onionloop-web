"use client";

import React from "react";
import { SearchInput } from "./search-input";
import Select from "./select";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  stock: string;
  image: string;
  isAdded: boolean;
}

interface SearchBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  statusOptions?: { value: string; label: string }[];
  statusValue?: string;
  statusPlaceholder?: string;
  onStatusChange?: (value: string) => void;
  dateOptions?: { value: string; label: string }[];
  dateValue?: string;
  datePlaceholder?: string;
  onDateChange?: (value: string) => void;
  showingText?: string;
  categories?: string[];
  products?: MenuItem[];
  onProductClick?: (product: MenuItem) => void;
  onCategoryClick?: (category: string) => void;
}

export default function SearchBar({
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  statusOptions = [{ value: "All Status", label: "All Status" }],
  statusValue,
  statusPlaceholder = "Select an option",
  onStatusChange,
  dateOptions = [{ value: "This Month", label: "This Month" }],
  dateValue,
  datePlaceholder = "Select an option",
  onDateChange,
  showingText,
  categories,
  products,
  onProductClick,
  onCategoryClick,
}: SearchBarProps) {
  return (
    <div className="p-[24px] flex flex-col md:flex-row justify-between items-start md:items-center gap-[9px] border-b border-gray-100 w-full">
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between items-start gap-[16px]  ">
        <div className="w-full">
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            categories={categories}
            products={products}
            onProductClick={onProductClick}
            onCategoryClick={onCategoryClick}
            className="rounded-[12px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-[12px] w-full max-lg:grid-cols-1">
          <Select
            options={statusOptions}
            value={statusValue}
            placeholder={statusPlaceholder}
            onValueChange={onStatusChange}
          />
          <Select
            options={dateOptions}
            value={dateValue}
            placeholder={datePlaceholder}
            onValueChange={onDateChange}
          />
        </div>
      </div>

      {showingText && (
        <div className="font-[500] text-[14px] text-[#6C6C6C]">
          {showingText}
        </div>
      )}
    </div>
  );
}
