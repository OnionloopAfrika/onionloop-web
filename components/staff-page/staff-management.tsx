"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { Modal } from "../ui/modal";
import Switch from "../ui/switch";
import Select from "../ui/select";
import { UserProfile, Search, MoreVertical, Edit3, AlertOctagon, Trash2, Mail, Phone, SquareProfile, MultiUser, TimerClock, SparkIcon, CheckIconGreen } from "./icon";
import Header from "../layouts/header";
import { useRouter } from "next/navigation";

interface Staff {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    salesToday: number;
    status: "Active" | "Deactivated";
    image: string;
}

const initialStaffs: Staff[] = [
    {
        id: "1",
        name: "Titi Folarin",
        role: "Cashier",
        email: "folarin@gmail.com",
        phone: "07053385252",
        salesToday: 24,
        status: "Active",
        image: "https://i.pravatar.cc/150?u=1",
    },
    {
        id: "2",
        name: "Mary Olarewaju",
        role: "Store Manager",
        email: "mary@gmail.com",
        phone: "08012345678",
        salesToday: 0,
        status: "Deactivated",
        image: "https://i.pravatar.cc/150?u=2",
    },
    {
        id: "3",
        name: "David Anigbobu",
        role: "Cashier",
        email: "david@gmail.com",
        phone: "09087654321",
        salesToday: 24,
        status: "Active",
        image: "https://i.pravatar.cc/150?u=3",
    },
];

const roleOptions = [
    { value: "cashier", label: "Cashier" },
    { value: "cleaner", label: "Cleaner" },
    { value: "sales_manager", label: "Sales Manager" },
    { value: "inventory_manager", label: "Inventory Manager" },
    { value: "custom", label: "Custom" },
];
const staffOption = [
    { value: "activate", label: "Activate" },
    { value: "deactivate", label: "Deactivated" },
];

export default function StaffManagement() {
    const router = useRouter();
    const [staffs, setStaffs] = useState<Staff[]>(initialStaffs);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [modalType, setModalType] = useState<"profile" | "edit" | "deactivate" | "remove" | "invite" | "success" | null>(null);
    const [permissions, setPermissions] = useState<Record<string, boolean>>({
        "Process Sales": true,
        "View Reports": true,
        "Issue Refunds": true,
        "Edit Inventory": true,
    });
    const [selectedStaffOption, setSelectedStaffOption] = useState<string | null>("activate");
    const [isSaving, setIsSaving] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
    };

    const togglePermission = (key: string) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isReactivating = selectedStaff?.status === "Deactivated";

    return (
        <div className=" min-h-screen">
            <div className="flex-col md:flex-row gap-4 justify-between items-start mb-2 md:mb-6">
                <Header
                    heading="Staff management"
                    subHeading="Manage your team, role, and app access"
                />
                <div className="flex gap-3 w-full justify-end">
                    <button onClick={() => router.push('/staffs/leave-request')} className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-semibold text-gray-700">
                        View Leave Request
                    </button>
                    <button
                        onClick={() => setModalType("invite")}
                        className="flex items-center gap-2 px-2 py-2 bg-[#044E49] text-white rounded-lg text-[14px] font-semibold"
                    >
                        Invite New Staff
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                {[
                    { label: "Total Staff", count: 6, sub: "All active", color: "bg-[#EDE8FC] text-[#7C53FC]", icon: <MultiUser /> },
                    { label: "Online now", count: 4, sub: "Using staff app", color: "bg-green-100 text-[#04802E]", icon: <TimerClock /> },
                    { label: "Sales today", count: 100, sub: "By staff", color: "bg-blue-100 text-[#0D5EBA]", icon: <SparkIcon /> },
                ].map((stat, i) => (
                    <div key={i} className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className={`w-10 h-10 rounded mb-4 flex items-center justify-center ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-[28px] font-semibold">{stat.count}</h3>
                        <p className="text-gray-500 text-sm font-normal">{stat.label}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full mt-2 inline-block ${stat.color} bg-opacity-20 font-semibold`}>{stat.sub}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white p-4 rounded-xl mb-6 flex items-center justify-between border border-gray-100">
                <div className="w-1/3 flex gap-2 items-center">
                    <Input
                        prefixicon={<Search />}
                        placeholder="Search"
                        className="!bg-[#F7F7F7] border-none rounded-lg shadow-sm"
                    />
                    <div className="w-[150px] bg-white">
                        <Select
                            options={staffOption}
                            value={selectedStaffOption!}
                            onValueChange={setSelectedStaffOption}
                            placeholder="All Staff"
                        />
                    </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">All staff</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            <div className="relative" ref={activeMenu === staff.id ? menuRef : null}>
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

            <Modal open={modalType === "invite"} onOpenChange={closeModal} className="max-w-[600px]">
                <div className="max-h-[85vh] overflow-y-auto px-1">
                    <div className="text-center mb-8">
                        <h2 className="text-[24px] font-bold text-[#131313] mb-2">Invite New Staff</h2>
                        <p className="text-[#6C6C6C] text-[14px]">They will receive an invite to download the onionloop staff app</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input label="First Name" placeholder="Enter First Name" />
                        <Input label="Last Name" placeholder="Enter Last Name" />
                    </div>

                    <div className="mb-4">
                        <Input label="Email Address" placeholder="Enter Address" />
                    </div>

                    <div className="mb-4">
                        <Input label="Phone Number" placeholder="Enter Phone Number" />
                    </div>

                    <div className="mb-6">
                        <Select
                            label="Role"
                            placeholder="Select Role"
                            options={roleOptions}
                        />
                    </div>

                    <p className="font-bold text-[14px] text-[#131313] mb-4">App Permissions</p>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {Object.keys(permissions).map((perm) => (
                            <div key={perm} className="flex justify-between items-center p-4 bg-[#F7F7F7] rounded-xl border border-gray-50">
                                <span className="text-[14px] text-[#6C6C6C] font-medium">{perm}</span>
                                <Switch
                                    checked={permissions[perm]}
                                    onCheckedChange={() => togglePermission(perm)}
                                    size="sm"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Button variant="secondary" className="flex-1 !bg-[#F7F7F7] !py-4" onClick={closeModal}>Cancel</Button>
                        <Button
                            variant="primary"
                            className="flex-1 !bg-[#044E49] !py-4"
                            isLoading={isSaving}
                            onClick={handleSendInvite}
                        >
                            {isSaving ? "Sending..." : "Send Invite"}
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

            <Modal open={modalType === "profile"} onOpenChange={closeModal} className="text-center">
                <div className="max-h-[85vh] overflow-y-auto px-1">
                    <h2 className="text-[20px] font-bold mb-6">Staff Profile</h2>
                    <div className="flex flex-col items-center mb-8">
                        <img src={selectedStaff?.image} className="w-24 h-24 rounded-full mb-3 border-4 border-white shadow-sm" />
                        <span className={`text-white text-[10px] px-4 py-1 rounded-full font-bold ${selectedStaff?.status === 'Active' ? 'bg-[#00634B]' : 'bg-[#98A2B3]'}`}>
                            {selectedStaff?.status}
                        </span>
                    </div>
                    <div className="space-y-2 text-left">
                        {[
                            { icon: <UserProfile />, label: "Full name", value: selectedStaff?.name },
                            { icon: <Mail />, label: "Email", value: selectedStaff?.email },
                            { icon: <Phone />, label: "Phone number", value: selectedStaff?.phone },
                            { icon: <SquareProfile />, label: "Role", value: selectedStaff?.role },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-[#FFF] shadow-sm rounded-lg">{item.icon}</div>
                                    <span className="text-[#6C6C6C] text-[14px]">{item.label}</span>
                                </div>
                                <span className="font-semibold text-[#131313] text-[14px]">{item.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 mt-10">
                        <Button
                            variant="secondary"
                            className="flex-1 !bg-[#F7F7F7]"
                            onClick={() => selectedStaff && setModalType("edit")}
                        >
                            Edit role
                        </Button>
                        <Button variant="primary" className="flex-1 !bg-[#004D3C]">Send message</Button>
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
                    <Button variant="danger" className="flex-1 !bg-[#CB1A14]">Remove Account</Button>
                </div>
            </Modal>
        </div>
    );
}