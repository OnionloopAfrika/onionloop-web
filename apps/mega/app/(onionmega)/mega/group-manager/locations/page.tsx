"use client";

import Header from '@/components/layouts/header'
import LocationManagement from '@/components/layouts/location-data'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSubdomain } from '@/hooks/useSubdomain'
import { Modal } from '@/components/ui/modal'
import Select from '@/components/ui/select'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import PerformanceMetricDashboard from '@/components/layouts/performance-metrics';

const branchGroupOptions = [
  { value: "all", label: "All Branches" },
  { value: "SW Region", label: "SW Region" },
  { value: "SE Region", label: "SE Region" },
];

const dateRangeOptions = [
  { value: "this-week", label: "This Week" },
  { value: "30-days", label: "30 Days" },
  { value: "90-days", label: "90 Days" },
];

const revenueOptions = [
  { value: "0", label: "₦0" },
  { value: "5000000", label: "₦5M" },
  { value: "10000000", label: "₦10M" },
];

const maxRevenueOptions = [
  { value: "no-limit", label: "No limit" },
  { value: "5000000", label: "₦5M" },
  { value: "10000000", label: "₦10M" },
  { value: "15000000", label: "₦15M" },
];

const scoreOptions = [
  { value: "all", label: "All" },
  { value: "90", label: "Above 90" },
  { value: "70", label: "Above 70" },
];

const alertOptions = [
  { value: "all", label: "All" },
  { value: "Healthy", label: "Healthy" },
  { value: "Warning", label: "Warning" },
  { value: "Critical", label: "Critical" },
];

const managerOptions = [
  { value: "ebipade", label: "Ebipade Goinbo" },
  { value: "tunde", label: "Tunde Obi" },
];

const groupOptions = [
  { value: "group-1", label: "Group 1 - Tunde Obi (manager)" },
  { value: "group-2", label: "Group 2 - Sarah Alao (manager)" },
];

const page = () => {
  const router = useRouter()
  const subdomain = useSubdomain()

  const [modalType, setModalType] = useState<"filter" | "add-location" | null>(null);

  const [branchGroup, setBranchGroup] = useState("all");
  const [dateRange, setDateRange] = useState("this-week");
  const [minRevenue, setMinRevenue] = useState("0");
  const [maxRevenue, setMaxRevenue] = useState("no-limit");
  const [perfScore, setPerfScore] = useState("all");
  const [alertStatus, setAlertStatus] = useState("all");

  const [activeFilters, setActiveFilters] = useState({
    branchGroup: "all",
    minRevenue: "0",
    maxRevenue: "no-limit",
    perfScore: "all",
    alertStatus: "all",
  });

  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [assignedManager, setAssignedManager] = useState("");
  const [assignedGroup, setAssignedGroup] = useState("");
  const [customManagerName, setCustomManagerName] = useState("");
  const [customGroupName, setCustomGroup] = useState("");

  const [showCustomManagerInput, setShowCustomManagerInput] = useState(false);
  const [showCustomGroupInput, setShowCustomGroupInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const closeModal = () => {
    setModalType(null);
    setLocationName("");
    setLocationAddress("");
    setAssignedManager("");
    setAssignedGroup("");
    setCustomManagerName("");
    setCustomGroup("");
    setShowCustomManagerInput(false);
    setShowCustomGroupInput(false);
  };

  const handleApplyFilters = () => {
    setActiveFilters({
      branchGroup,
      minRevenue,
      maxRevenue,
      perfScore,
      alertStatus,
    });
    setModalType(null);
  };

  const handleResetFilters = () => {
    setBranchGroup("all");
    setDateRange("this-week");
    setMinRevenue("0");
    setMaxRevenue("no-limit");
    setPerfScore("all");
    setAlertStatus("all");
    setActiveFilters({
      branchGroup: "all",
      minRevenue: "0",
      maxRevenue: "no-limit",
      perfScore: "all",
      alertStatus: "all",
    });
  };

  const handleCreateLocation = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      closeModal();
    }, 1200);
  };

  return (
    <div className='space-y-6'>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
        <Header
          heading="Locations"
          subHeading="6 regions with 12 branches in Nigeria"
        />
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="inline-flex items-center justify-center gap-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-[14px] font-semibold text-gray-700 whitespace-nowrap shadow-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99967 6.66699V1.66699L8.33301 3.33366" stroke="#292D32" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 1.66699L11.6667 3.33366" stroke="#292D32" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.83333 10C2.5 10 2.5 11.4917 2.5 13.3333V14.1667C2.5 16.4667 2.5 18.3333 6.66667 18.3333H13.3333C16.6667 18.3333 17.5 16.4667 17.5 14.1667V13.3333C17.5 11.4917 17.5 10 14.1667 10C13.3333 10 13.1 10.175 12.6667 10.5L11.8167 11.4" stroke="#292D32" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.16699 9.99987V8.3332C4.16699 6.6582 4.16699 5.27487 6.66699 5.0332" stroke="#292D32" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.833 9.99987V8.3332C15.833 6.6582 15.833 5.27487 13.333 5.0332" stroke="#292D32" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Export
          </button>
          <button
            onClick={() => setModalType("filter")}
            className="inline-flex items-center justify-center gap-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-[14px] font-semibold text-gray-700 whitespace-nowrap shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.49967 1.75H15.4997C16.4163 1.75 17.1663 2.5 17.1663 3.41667V5.25C17.1663 5.91667 16.7497 6.75 16.333 7.16667L12.7497 10.3333C12.2497 10.75 11.9163 11.5833 11.9163 12.25V15.8333C11.9163 16.3333 11.583 17 11.1663 17.25L9.99967 18C8.91634 18.6667 7.41634 17.9167 7.41634 16.5833V12.1667C7.41634 11.5833 7.08301 10.8333 6.74967 10.4167L3.58301 7.08333C3.16634 6.66667 2.83301 5.91667 2.83301 5.41667V3.5C2.83301 2.5 3.58301 1.75 4.49967 1.75Z" stroke="#292D32" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.10833 1.75L5 8.33333" stroke="#292D32" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Filter
          </button>
          <button
            onClick={() => setModalType("add-location")}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#044E49] text-white rounded-lg text-[14px] font-semibold whitespace-nowrap shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10H15" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 15V5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Add New Location
          </button>
        </div>
      </div>
      <PerformanceMetricDashboard />

      <LocationManagement
        selectedGroupFilter={activeFilters.branchGroup}
        minRevenueFilter={activeFilters.minRevenue}
        maxRevenueFilter={activeFilters.maxRevenue}
        perfScoreFilter={activeFilters.perfScore}
        statusAlertFilter={activeFilters.alertStatus}
      />

      <Modal open={modalType === "filter"} onOpenChange={closeModal} className="max-w-[650px]">
        <div className="font-sans px-1">
          <div className="text-center mb-8">
            <h2 className="text-[26px] font-bold text-gray-900 mb-2">Filter Dashboard</h2>
            <p className="text-gray-500 text-[15px] font-medium">Narrow down by branch, time, and metrics</p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-6 mb-10">
            <div>
              <Select
                label="Branch Group"
                placeholder="All Branches"
                options={branchGroupOptions}
                value={branchGroup}
                onValueChange={setBranchGroup}
              />
            </div>
            <div>
              <Select
                label="Date Range"
                placeholder="This Week"
                options={dateRangeOptions}
                value={dateRange}
                onValueChange={setDateRange}
              />
            </div>
            <div>
              <Select
                label="Min Revenue"
                placeholder="#0"
                options={revenueOptions}
                value={minRevenue}
                onValueChange={setMinRevenue}
              />
            </div>
            <div>
              <Select
                label="Max Revenue"
                placeholder="No limit"
                options={maxRevenueOptions}
                value={maxRevenue}
                onValueChange={setMaxRevenue}
              />
            </div>
            <div>
              <Select
                label="Performance Score"
                placeholder="All"
                options={scoreOptions}
                value={perfScore}
                onValueChange={setPerfScore}
              />
            </div>
            <div>
              <Select
                label="Alert Status"
                placeholder="All"
                options={alertOptions}
                value={alertStatus}
                onValueChange={setAlertStatus}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleResetFilters}
              className="w-full py-4 bg-[#F7F7F7] text-gray-500 font-bold rounded-xl text-[15px] hover:bg-gray-100 transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={handleApplyFilters}
              className="w-full py-4 bg-[#044E49] text-white font-bold rounded-xl text-[15px] hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={modalType === "add-location"} onOpenChange={closeModal} className="max-w-[600px]">
        <div className="max-h-[85vh] overflow-y-auto px-1 font-sans">
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-bold text-gray-900 mb-2">Add New Location</h2>
            <p className="text-gray-500 text-[15px] font-medium">They will receive an invite to download the onionloop staff app</p>
          </div>

          <div className="mb-5">
            <Input
              label="Location Name"
              placeholder="Okota"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <Input
              label="Location Address"
              placeholder="12, anuoluwapo street, Okota, Lagos, Nigeria"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
            />
          </div>

          <div className="mb-1">
            {showCustomManagerInput ? (
              <Input
                label="Assign Branch/Location Manager"
                placeholder="Enter branch manager"
                value={customManagerName}
                onChange={(e) => setCustomManagerName(e.target.value)}
              />
            ) : (
              <Select
                label="Assign Branch/Location Manager"
                placeholder="Select branch manager"
                options={managerOptions}
                value={assignedManager}
                onValueChange={setAssignedManager}
              />
            )}
          </div>
          <div className="mb-5">
            <button
              onClick={() => {
                setShowCustomManagerInput(!showCustomManagerInput);
                setAssignedManager("");
                setCustomManagerName("");
              }}
              className="text-[14px] font-semibold text-[#044E49] hover:opacity-80 transition-opacity"
            >
              Invite branch/location manager
            </button>
          </div>

          <div className="mb-1">
            {showCustomGroupInput ? (
              <Input
                label="Group Branch/Location(Optional)"
                placeholder="Enter group name"
                value={customGroupName}
                onChange={(e) => setCustomGroup(e.target.value)}
              />
            ) : (
              <Select
                label="Assign Group"
                placeholder="Select group"
                options={groupOptions}
                value={assignedGroup}
                onValueChange={setAssignedGroup}
              />
            )}
          </div>
          <div className="mb-5">
            <button
              onClick={() => {
                setShowCustomGroupInput(!showCustomGroupInput);
                setAssignedGroup("");
                setCustomGroup("");
              }}
              className="text-[14px] font-semibold text-[#044E49] hover:opacity-80 transition-opacity"
            >
              {showCustomGroupInput ? "Assign to existing group" : "Create new group"}
            </button>
            {showCustomGroupInput && (
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                Create a group name if you would like to categorize branches/locations based on regions, state or however you would like
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button onClick={closeModal} className="w-full py-4 bg-[#F7F7F7] text-gray-700 font-bold rounded-xl text-[15px] hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <Button
              variant="primary"
              className="w-full !bg-[#044E49] !py-4 font-bold text-[15px] shadow-sm"
              isLoading={isSaving}
              onClick={handleCreateLocation}
            >
              Create Location
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default page