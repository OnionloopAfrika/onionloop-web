"use client";

import React, { useState, useEffect } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { Modal } from "../ui/modal";
import Switch from "../ui/switch";
import Select from "../ui/select";
import { UserProfile, Search, MoreVertical, Edit3, AlertOctagon, Trash2, Mail, Phone, SquareProfile, MultiUser, TimerClock, SparkIcon, CheckIconGreen } from "./icon";
import Header from "../layouts/header";
import { useRouter } from "next/navigation";
import { useSubdomain } from "@/hooks/useSubdomain";

interface Staff {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    salesToday: number;
    status: "Active" | "Deactivated";
    image: string;
    groupAssigned: string;
}

const initialStaffs: Staff[] = [
    {
        id: "1",
        name: "Titi Folarin",
        role: "Group Manager",
        email: "titifolarin@gmail.com",
        phone: "07053385252",
        salesToday: 24,
        status: "Active",
        image: "https://i.pravatar.cc/150?u=1",
        groupAssigned: "Group 1",
    },
    {
        id: "2",
        name: "Mary Olarewaju",
        role: "Cashier",
        email: "mary@gmail.com",
        phone: "08012345678",
        salesToday: 0,
        status: "Active",
        image: "https://i.pravatar.cc/150?u=2",
        groupAssigned: "Group 1",
    },
    {
        id: "3",
        name: "David Anigbobu",
        role: "Sales Manager",
        email: "david@gmail.com",
        phone: "09087654321",
        salesToday: 24,
        status: "Deactivated",
        image: "https://i.pravatar.cc/150?u=3",
        groupAssigned: "Group 2",
    },
    {
        id: "4",
        name: "Sarah Olarewaju",
        role: "Customer Attendant",
        email: "sarah@gmail.com",
        phone: "08123456789",
        salesToday: 12,
        status: "Active",
        image: "https://i.pravatar.cc/150?u=4",
        groupAssigned: "Group 1",
    },
    {
        id: "5",
        name: "Adanma Dappa",
        role: "Senior Staff",
        email: "adanma@gmail.com",
        phone: "08098765432",
        salesToday: 40,
        status: "Active",
        image: "https://i.pravatar.cc/150?u=5",
        groupAssigned: "Group 3",
    },
    {
        id: "6",
        name: "Kemi Saidu",
        role: "Cleaner",
        email: "kemi@gmail.com",
        phone: "07011223344",
        salesToday: 0,
        status: "Deactivated",
        image: "https://i.pravatar.cc/150?u=6",
        groupAssigned: "Group 2",
    },
];

const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "Group Manager", label: "Group Manager" },
    { value: "State Manager", label: "State Manager" },
    { value: "Branch/Location Manager", label: "Branch/Location Manager" },
    { value: "Cashier", label: "Cashier" },
    { value: "Custom", label: "Custom" },
];

const staffOption = [
    { value: "activate", label: "Activate" },
    { value: "deactivate", label: "Deactivated" },
];

const groupOptions = [
    { value: "group-1", label: "Group 1 - Tunde Obi (manager)" },
    { value: "group-2", label: "Group 2 - Sarah Alao (manager)" },
];

const branchOptions = [
    { value: "ikeja", label: "Ikeja - Mall Branch" },
    { value: "vi", label: "Victoria Island Branch" },
];

const mockLocations = Array(20).fill({
    name: "Ikeja",
    address: "Ikeja city mall, 2nd floor, Ikeja Lgaos.",
});

export default function StaffManagement() {
    const router = useRouter();
    const subdomain = useSubdomain();
    const [staffs, setStaffs] = useState<Staff[]>(initialStaffs);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [modalType, setModalType] = useState<"profile" | "all-locations" | "edit" | "deactivate" | "remove" | "invite" | "success" | null>(null);
    const [permissions, setPermissions] = useState<Record<string, boolean>>({
        "Process Sales": true,
        "View Reports": true,
        "Issue Refunds": true,
        "Edit Inventory": true,
    });
    const [selectedStaffOption, setSelectedStaffOption] = useState<string | null>("activate");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest("[data-menu-container]")) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleAction = (type: "profile" | "edit" | "deactivate" | "remove", staff: Staff) => {
        setSelectedStaff(staff);
        setModalType(type);
        setActiveMenu(null);
    };

    const handleSaveChanges = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            closeModal();
        }, 1500);
    };

    const handleSendInvite = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setModalType("success");
        }, 1500);
    };

    const handleToggleStatus = () => {
        if (!selectedStaff) return;
        const newStatus: Staff["status"] =
            selectedStaff.status === "Active" ? "Deactivated" : "Active";
        setStaffs(prev =>
            prev.map(s => (s.id === selectedStaff.id ? { ...s, status: newStatus } : s))
        );
        closeModal();
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedStaff(null);
        setSelectedRole("");
        setSelectedGroup("");
        setSelectedBranch("");
    };

    const togglePermission = (key: string) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isReactivating = selectedStaff?.status === "Deactivated";

    return (
        <div className="min-h-screen">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
                <Header
                    heading="Staff Management"
                    subHeading="Manage your team, role, and app access"
                />
                <div className="flex gap-3 w-full md:w-auto justify-end">
                    <button onClick={() => router.push(`/${subdomain}/super-admin/staff/leave-request`)} className="inline-flex items-center justify-center gap-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-[14px] font-semibold text-gray-700 whitespace-nowrap shadow-sm">
                        View Leave Request
                    </button>
                    <button
                        onClick={() => setModalType("invite")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#044E49] text-white rounded-lg text-[14px] font-semibold whitespace-nowrap shadow-sm"
                    >
                        Invite New Staff
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2 py-4">
                {[
                    { label: "Total Staffs", count: 6, sub: "All active", color: "bg-[#EDE8FC] text-[#7C53FC]", icon: <MultiUser />, className: "col-span-2 md:col-span-1" },
                    { label: "Online now", count: 4, sub: "Using staff app", color: "bg-green-100 text-[#04802E]", icon: <TimerClock />, className: "col-span-1" },
                    { label: "Sales so far today", count: 100, sub: "By staff", color: "bg-blue-100 text-[#0D5EBA]", icon: <SparkIcon />, className: "col-span-1" },
                ].map((stat, i) => (
                    <div key={i} className={`bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm ${stat.className}`}>
                        <div className={`w-10 h-10 rounded mb-4 flex items-center justify-center ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-[16px] md:text-[28px] font-semibold">{stat.count}</h3>
                        <p className="text-gray-500 text-sm font-normal">{stat.label}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full mt-2 inline-block ${stat.color} bg-opacity-20 font-medium`}>{stat.sub}</span>
                    </div>
                ))}
            </div>

            <div className="my-0 md:my-6">
                <h3 className="text-[14px] font-normal text-[#131313] mb-2 md:hidden">All Staffs</h3>
                <div className="bg-white p-4 md:rounded-xl rounded-t-xl flex flex-row-reverse md:flex-row items-center justify-between border border-gray-100 gap-4">
                    <div className="w-full md:w-1/3 flex gap-2 items-center">
                        <div className="flex-1">
                            <Input
                                prefixicon={<Search />}
                                placeholder="Search staff..."
                                className="!bg-[#F7F7F7] border-none rounded-lg shadow-sm w-full"
                            />
                        </div>
                        <div className="w-[120px] md:w-[150px] bg-white">
                            <Select
                                options={staffOption}
                                value={selectedStaffOption!}
                                onValueChange={setSelectedStaffOption}
                                placeholder="Status: "
                            />
                        </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 hidden md:inline">All staff</span>
                </div>
            </div>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                {staffs.map((staff) => (
                    <div key={staff.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <div className="relative">
                                    <img src={staff.image} alt={staff.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${staff.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#131313]">{staff.name}</h4>
                                    <p className="text-xs text-gray-500">{staff.role}</p>
                                </div>
                            </div>
                            <div className="relative" data-menu-container>
                                <button
                                    onClick={() => setActiveMenu(activeMenu === staff.id ? null : staff.id)}
                                    className="text-gray-400 hover:text-black"
                                >
                                    <MoreVertical color="#A8A8A8" />
                                </button>

                                {activeMenu === staff.id && (
                                    <div className="absolute right-0 top-8 w-56 bg-white border border-gray-100 shadow-xl rounded-lg z-20 overflow-hidden">
                                        <button onClick={() => handleAction("profile", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-[#6C6C6C] text-[14px] border-b border-gray-50">
                                            <UserProfile size={20} color="#8A8A8A" /> View Staff Profile
                                        </button>
                                        <button onClick={() => handleAction("edit", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-[#6C6C6C] text-[14px] border-b border-gray-50">
                                            <Edit3 size={18} color="#8A8A8A" /> Edit Role
                                        </button>
                                        <button onClick={() => handleAction("deactivate", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-[#6C6C6C] text-[14px] border-b border-gray-50">
                                            <AlertOctagon size={18} color="#8A8A8A" />
                                            {staff.status === "Active" ? "Deactivate Staff" : "Activate Staff"}
                                        </button>
                                        <button onClick={() => handleAction("remove", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-red-600 text-[14px]">
                                            <Trash2 size={18} color="#CB1A14" /> Remove Staff
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-[#F7F7F7] p-4 rounded-lg flex justify-between items-center mb-4">
                            <div>
                                <p className="text-[20px] font-bold">{staff.salesToday.toString().padStart(2, '0')}</p>
                                <p className="text-[10px] text-[#6C6C6C] tracking-wider">Sales Today</p>
                            </div>
                            <span className={`text-[10px] px-3 py-1 rounded-full font-semibold ${staff.status === 'Active' ? 'bg-[#04802E] text-white' : 'bg-[#98A2B3] text-white'}`}>
                                {staff.status}
                            </span>
                        </div>

                        <Button variant="primary" className="!bg-[#00634B] w-full">Send message</Button>
                    </div>
                ))}
            </div>

            <div className="block md:hidden bg-white rounded-b-xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[480px]">
                        <thead>
                            <tr className="border-b border-gray-100 bg-[#F9FAFB]">
                                <th className="p-4 text-sm font-semibold text-gray-500 text-left w-1/2"></th>
                                <th className="p-4 text-sm font-semibold text-gray-500 text-left w-1/2">Name</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 text-left w-1/4">Role</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 text-left w-1/5">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 text-right w-[40px]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.map((staff) => (
                                <tr key={staff.id} className="border-b border-gray-100 last:border-none align-middle">
                                    <td className="p-4 pr-2">
                                        <img
                                            src={staff.image}
                                            alt={staff.name}
                                            className="w-10 h-10 min-w-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="p-4 pr-2">
                                        <div className="flex items-center gap-3">
                                            <span className="font-normal text-sm text-[#6C6C6C] truncate max-w-[140px]">{staff.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 px-2 text-sm text-[#6C6C6C] text-left whitespace-nowrap">
                                        {staff.role}
                                    </td>
                                    <td className="p-4 px-2 text-left">
                                        <span className={`text-[12px] px-3 py-1 rounded-full font-medium inline-block text-center min-w-[80px] ${staff.status === 'Active' ? 'bg-[#04802E] text-[#ffffff]' : 'bg-[#98A2B3] text-[#F9FAFB]'}`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pl-2 text-right relative" data-menu-container>
                                        <button
                                            onClick={() => setActiveMenu(activeMenu === staff.id ? null : staff.id)}
                                            className="text-gray-400 hover:text-black p-1 inline-block"
                                        >
                                            <MoreVertical color="#A8A8A8" />
                                        </button>

                                        {activeMenu === staff.id && (
                                            <div className="absolute right-4 top-12 w-56 bg-white border border-gray-100 shadow-xl rounded-lg z-20 overflow-hidden text-left">
                                                <button onClick={() => handleAction("profile", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-[#6C6C6C] text-[14px] border-b border-gray-50">
                                                    <UserProfile size={20} color="#8A8A8A" /> View Staff Profile
                                                </button>
                                                <button onClick={() => handleAction("edit", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-[#6C6C6C] text-[14px] border-b border-gray-50">
                                                    <Edit3 size={18} color="#8A8A8A" /> Edit Role
                                                </button>
                                                <button onClick={() => handleAction("deactivate", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-[#6C6C6C] text-[14px] border-b border-gray-50">
                                                    <AlertOctagon size={18} color="#8A8A8A" />
                                                    {staff.status === "Active" ? "Deactivate Staff" : "Activate Staff"}
                                                </button>
                                                <button onClick={() => handleAction("remove", staff)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-red-600 text-[14px]">
                                                    <Trash2 size={18} color="#CB1A14" /> Remove Staff
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal open={modalType === "invite"} onOpenChange={closeModal} className="max-w-[600px]">
                <div className="max-h-[85vh] overflow-y-auto px-1 font-sans">
                    <div className="text-center mb-8">
                        <h2 className="text-[28px] font-bold text-gray-900 mb-2">Invite New Staff</h2>
                        <p className="text-gray-500 text-[15px] font-medium">They will receive an invite to download the onionloop staff app</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <Input label="First Name" placeholder="Tunde" />
                        <Input label="Last Name" placeholder="Obi" />
                    </div>

                    <div className="mb-5">
                        <Input label="Email Address" placeholder="tundeobi@gmail.com" />
                    </div>

                    <div className="mb-5">
                        <Input label="Phone Number" placeholder="0902 9485 221" />
                    </div>

                    <div className="mb-5">
                        <Select
                            label="Role"
                            placeholder="Select Role"
                            options={roleOptions}
                            value={selectedRole}
                            onValueChange={setSelectedRole}
                        />
                    </div>

                    {selectedRole === "Group Manager" && (
                        <div className="mb-5">
                            <Select
                                label="Assign Group"
                                placeholder="Select group"
                                options={groupOptions}
                                value={selectedGroup}
                                onValueChange={setSelectedGroup}
                            />
                            <button className="text-[14px] font-bold text-[#044E49] mt-2 block hover:opacity-80 transition-opacity">
                                Create new group
                            </button>
                        </div>
                    )}

                    {selectedRole === "Branch/Location Manager" && (
                        <div className="mb-5">
                            <Select
                                label="Assign Branch/Location"
                                placeholder="Select branch/location"
                                options={branchOptions}
                                value={selectedBranch}
                                onValueChange={setSelectedBranch}
                            />
                            <button className="text-[14px] font-bold text-[#044E49] mt-2 block hover:opacity-80 transition-opacity">
                                Create new branch/location
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button onClick={closeModal} className="w-full py-4 bg-[#F7F7F7] text-gray-700 font-bold rounded-xl text-[15px] hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <Button
                            variant="primary"
                            className="w-full !bg-[#044E49] !py-4 font-bold text-[15px] shadow-sm"
                            isLoading={isSaving}
                            onClick={handleSendInvite}
                        >
                            Send Invite
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal open={modalType === "success"} onOpenChange={closeModal} className="text-center">
                <div className="py-6">
                    <div className="flex justify-center mb-6">
                        <CheckIconGreen />
                    </div>
                    <h2 className="text-[24px] font-bold text-[#04907E] mb-2">Invite sent successfully!</h2>
                    <p className="text-[#6C6C6C] text-[14px] mb-10">The invite has been sent to the provided email address</p>
                    <Button variant="primary" className="w-full !bg-[#044E49] !py-4" onClick={closeModal}>Done</Button>
                </div>
            </Modal>

            <Modal open={modalType === "profile"} onOpenChange={closeModal} className="max-w-[580px]"
            footer={
                <div className="grid grid-cols-2 gap-4 w-full">
                    <button
                        className="w-full py-4 bg-[#F7F7F7] text-gray-700 font-semibold rounded-xl text-[14px] hover:bg-gray-100 transition-colors"
                        onClick={() => selectedStaff && setModalType("edit")}
                    >
                        Edit role
                    </button>
                    <button className="w-full py-4 bg-[#044E49] text-white font-semibold rounded-xl text-[14px] hover:opacity-90 transition-opacity">
                        Send message
                    </button>
                </div>
            }
            >
                <div className="max-h-[65vh] overflow-y-auto px-1 font-sans relative">
                    <div className="absolute top-0 left-0">
                        <button className="text-gray-400 hover:text-black">
                            <MoreVertical size={20} color="#A8A8A8" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-[22px] font-bold text-gray-900 mb-4">Staff Profile</h2>
                        <div className="relative">
                            <img src={selectedStaff?.image} className="w-20 h-20 rounded-full object-cover border border-gray-100" />
                            <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 pb-6 border-b border-gray-100 text-[14px]">
                        <div>
                            <span className="text-gray-400 block mb-1">Full Name:</span>
                            <span className="font-bold text-gray-900">{selectedStaff?.name}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-400 block mb-1">Status:</span>
                            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#04802E] text-white">
                                {selectedStaff?.status}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400 block mb-1">Phone Number:</span>
                            <span className="font-bold text-gray-900">{selectedStaff?.phone}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-400 block mb-1">Email Address:</span>
                            <span className="font-bold text-gray-900 truncate block">{selectedStaff?.email}</span>
                        </div>
                        <div>
                            <span className="text-gray-400 block mb-1">Role:</span>
                            <span className="font-bold text-gray-900">{selectedStaff?.role}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-400 block mb-1">Group Assigned:</span>
                            <span className="font-bold text-gray-900">{selectedStaff?.groupAssigned}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[14px] font-medium text-gray-500">Branches/Locations(20)</span>
                            <button
                                onClick={() => setModalType("all-locations")}
                                className="text-[14px] font-bold text-[#044E49] hover:opacity-80 transition-opacity"
                            >
                                View All Locations
                            </button>
                        </div>

                        <div className="space-y-3">
                            {mockLocations.slice(0, 5).map((loc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-1 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#EDE8FC] text-[#7C53FC] font-semibold text-sm flex items-center justify-center flex-shrink-0">
                                            IK
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 text-[14px]">{loc.name}</span>
                                            <span className="text-gray-400 text-xs flex items-center gap-1">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                {loc.address}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-gray-400">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal open={modalType === "all-locations"} onOpenChange={() => setModalType("profile")} className="max-w-[580px]">
                <div className="max-h-[85vh] overflow-y-auto px-1 font-sans text-center">
                    <h2 className="text-[22px] font-bold text-gray-900 mb-2">All Assigned Locations</h2>
                    <p className="text-[#6C6C6C] text-[14px] mb-6">They will receive an invite to download the onionloop staff app</p>

                    <div className="space-y-3 text-left">
                        {mockLocations.map((loc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-1 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#EDE8FC] text-[#7C53FC] font-semibold text-sm flex items-center justify-center flex-shrink-0">
                                        IK
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 text-[14px]">{loc.name}</span>
                                        <span className="text-gray-400 text-xs flex items-center gap-1">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            {loc.address}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            <Modal open={modalType === "edit"} onOpenChange={closeModal}
                footer={
                    <Button
                        variant="primary"
                        size="sm"
                        className="!bg-[#004D3C] !py-4"
                        isLoading={isSaving}
                        onClick={handleSaveChanges}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                }
                title="Edit Staff Role"
            >
                <div className="max-h-[70vh] overflow-y-auto px-1">
                    <h2 className="text-[20px] font-bold text-center mb-6"></h2>
                    <div className="flex justify-center mb-8">
                        <img src={selectedStaff?.image} className="w-20 h-20 rounded-full border-2 border-white shadow-md" />
                    </div>
                    <div className="grid grid-cols-2 gap-y-6 mb-8 text-[13px]">
                        <div><p className="text-[#6C6C6C]">Full Name:</p><p className="font-bold text-[#131313]">{selectedStaff?.name}</p></div>
                        <div className="text-right">
                            <p className="text-[#6C6C6C]">Status:</p>
                            <span className={`text-[#fff] font-bold px-3 py-0.5 rounded-full ${selectedStaff?.status === 'Active' ? 'bg-[#04802E]' : 'bg-[#98A2B3]'}`}>
                                {selectedStaff?.status}
                            </span>
                        </div>
                        <div><p className="text-[#6C6C6C]">Phone Number:</p><p className="font-bold text-[#131313]">{selectedStaff?.phone}</p></div>
                        <div className="text-right"><p className="text-[#6C6C6C]">Email Address:</p><p className="font-bold text-[#131313] truncate">{selectedStaff?.email}</p></div>
                    </div>
                    <hr className="mb-8 border-gray-100" />
                    <Input label="Old Role" value="Senior Staff" readOnly className="mb-4" />
                    <Input label="Current Role" placeholder="Head of Staff" className="mb-8" />
                    <p className="font-bold text-[14px] text-[#131313] mb-4">App Permissions</p>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {Object.keys(permissions).map((perm) => (
                            <div key={perm} className="flex justify-between items-center p-4 bg-[#F7F7F7] rounded-xl border border-gray-50">
                                <span className="text-[14px] text-[#6C6C6C]">{perm}</span>
                                <Switch
                                    checked={permissions[perm]}
                                    onCheckedChange={() => togglePermission(perm)}
                                    size="sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            <Modal open={modalType === "deactivate"} onOpenChange={closeModal} className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="rounded-2xl">
                        <AlertOctagon size={60} color={isReactivating ? "#024E44" : "#DD900D"} />
                    </div>
                </div>
                <h2 className={`text-[20px] font-bold mb-3 ${isReactivating ? 'text-[#04802E]' : 'text-[#DD900D]'}`}>
                    {isReactivating ? "Activate Staff Account?" : "Deactivate Staff Account?"}
                </h2>
                <p className="text-[#6C6C6C] text-[14px] max-w-[400px] mx-auto mb-10">
                    {isReactivating
                        ? "You are about to reactivate a staff member. Are you sure you want to activate this staff member?"
                        : "You are about to deactivate a staff member. Are you sure you want to deactivate this staff member?"}
                </p>
                <div className="flex gap-4">
                    <Button variant="secondary" className="flex-1 !bg-[#F7F7F7]" onClick={closeModal}>Cancel</Button>
                    <Button
                        variant={isReactivating ? "primary" : "danger"}
                        className={`flex-1 ${isReactivating ? '!bg-[#024E44]' : '!bg-[#CB1A14]'}`}
                        onClick={handleToggleStatus}
                    >
                        {isReactivating ? "Activate Account" : "Deactivate Account"}
                    </Button>
                </div>
            </Modal>

            <Modal open={modalType === "remove"} onOpenChange={closeModal} className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-50 p-5 rounded-2xl">
                        <Trash2 size={48} color="#CB1A14" />
                    </div>
                </div>
                <h2 className="text-[20px] font-bold text-[#CB1A14] mb-3">Remove Staff Account?</h2>
                <p className="text-[#6C6C6C] text-[14px] mb-10">Are you sure you want to remove this staff as your staff member?</p>
                <div className="flex gap-4">
                    <Button variant="secondary" className="flex-1 !bg-[#F7F7F7]" onClick={closeModal}>Cancel</Button>
                    <Button variant="danger" className="flex-1 !bg-[#CB1A14]" onClick={handleToggleStatus}>Remove Account</Button>
                </div>
            </Modal>
        </div>
    );
}