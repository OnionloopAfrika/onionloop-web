import { PermissionMenuIcon } from "../icons/svgs";
import { Customers } from "./customers";
import { Dashboard } from "./dashboard";
import { Disputes } from "./disputes";
import { Locations } from "./location";
import { Reports } from "./reports";
import { Settlements } from "./settlements";
import { StaffManagement } from "./staff-management";
import { SystemControl } from "./system-control";
import { Transactions } from "./transactions";

export default function Controls() {
  return (
    <div className="grid grid-cols-3 gap-[16px]">
      <Dashboard />
      <Transactions />
      <Reports />
      <Locations />
      <StaffManagement />
      <Customers />
      <Disputes />
      <Settlements />
      <SystemControl />
    </div>
  );
}

type HeaderProps = {
  title: string;
};

export const PermissionsHeader = ({ title }: HeaderProps) => {
  return (
    <div className="flex items-center gap-[12px]">
      <PermissionMenuIcon className="text-[#04907E]" />{" "}
      <span className="font-[600] text-[16px] text-[#242424]">{title}</span>
    </div>
  );
};

type DetailsProps = {
  action: string;
  toggle: React.ReactNode;
};

export const PermissionsControls = ({ action, toggle }: DetailsProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-[500] text-[14px] text-[#363636]">{action}</p>
      {toggle}
    </div>
  );
};
