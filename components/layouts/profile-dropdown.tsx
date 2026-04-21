import React from 'react';
import { ProfileIcon, SettingsIcon, StaffIcon, LogoutIcon, CopyIcon, SupportIcon, StaffIconSolid } from '../icons/svgs';

interface ProfileDropdownProps {
    businessName: string;
    userName: string;
    avatarUrl?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ businessName, userName, avatarUrl }) => {
    const menuItems = [
        { label: "My Profile", icon: <ProfileIcon />, color: "text-[#04907E]" },
        { label: "Account Settings", icon: <SettingsIcon />, color: "text-[#04907E]" },
        { label: "Staff App Settings", icon: <StaffIconSolid />, color: "text-[#04907E]" },
        { label: "Help & Support", icon: <SupportIcon />, color: "text-[#04907E]" },
        { label: "Log Out", icon: <LogoutIcon />, color: "text-[#D32F2F]", isDestructive: true },
    ];

    return (
        <div className="absolute top-[calc(100%+1px)] right-0 w-85 bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-4 flex flex-col items-center z-50">
            <div className="flex flex-col items-center mb-6 px-6 w-full text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#d6f0e6] mb-3 shrink-0">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[20px] font-bold text-[#04907E]">
                            {businessName.charAt(0)}
                        </div>
                    )}
                </div>

                <span className="bg-[#F5FFFD] text-[#04907E] text-[10px] font-normal px-3 py-1 rounded-md mb-2">
                    Onion Crew Merchant
                </span>

                <h3 className="text-[14px] font-semibold text-[#363636] leading-tight">{businessName}</h3>
                <p className="text-[12px] text-[#6C6C6C]">{userName}</p>

                <div className="flex items-center gap-2 text-[#363636]">
                    <span className="text-[12px] font-medium">yettymamalounge.onionloopafrika.com</span>
                    <button className="text-gray-400 hover:text-[#363636]">
                        <CopyIcon />
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col">
                {menuItems.map((item, idx) => (
                    <button
                        key={idx}
                        className="flex items-center gap-2 w-full p-2 rounded-xl hover:bg-[#E7F6EC] transition-all group"
                    >
                        <div className={`w-10 h-10 rounded-lg border border-gray-100 flex items-center justify-center shrink-0 ${item.isDestructive ? 'text-[#D32F2F] bg-red-50' : 'text-[#04907E]'}`}>
                            {item.icon}
                        </div>
                        <span className={`text-[14px] font-normal ${item.isDestructive ? 'text-[#D32F2F]' : 'text-[#131313]'}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfileDropdown;