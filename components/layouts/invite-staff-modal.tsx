"use client";

import React, { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { Modal } from "../ui/modal";
import Select from "../ui/select";

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "Group Manager", label: "Group Manager" },
    { value: "State Manager", label: "State Manager" },
    { value: "Branch/Location Manager", label: "Branch/Location Manager" },
    { value: "Cashier", label: "Cashier" },
    { value: "Custom", label: "Custom" },
];

const groupOptions = [
    { value: "group-1", label: "Group 1 - Tunde Obi (manager)" },
    { value: "group-2", label: "Group 2 - Sarah Alao (manager)" },
];

const branchOptions = [
    { value: "ikeja", label: "Ikeja - Mall Branch" },
    { value: "vi", label: "Victoria Island Branch" },
];

export default function InviteStaffModal({ isOpen, onClose }: InviteModalProps) {
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSendInvite = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose} className="max-w-[600px]">
            <div className="max-h-[85vh] overflow-y-auto px-1 font-sans">
                <div className="text-center mb-8">
                    <h2 className="text-[28px] font-bold text-gray-900 mb-2">Invite New Staff</h2>
                    <p className="text-gray-500 text-[15px] font-medium">
                        They will receive an invite to download the onionloop staff app
                    </p>
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
                    <div className="mb-5 animate-fadeIn">
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
                    <div className="mb-5 animate-fadeIn">
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
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-[#F7F7F7] text-gray-700 font-bold rounded-xl text-[15px] hover:bg-gray-100 transition-colors"
                    >
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
    );
}