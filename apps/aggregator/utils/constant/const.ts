export const DATE = new Date();
export const TODAY = DATE.toISOString().split("T")[0];

export const DAY_NAMES: readonly string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
export const MONTH_NAMES: readonly string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const ROLE = "CASHIER" as
  | "CASHIER"
  | "GROUP_MANAGER"
  | "SUPER_ADMIN"
  | "BRANCH_MANAGER"
  | string;

export const ROLES = [
  {
    label: "Cashier",
    initials: "C.A",
    value: "cashier",
    href: "/mega/cashier/dashboard",
  },
  {
    label: "Super Admin",
    initials: "S.A",
    value: "super-admin",
    href: "/mega/super-admin/dashboard",
  },
  {
    label: "Group Manager",
    initials: "G.M",
    value: "group-manager",
    href: "/mega/group-manager/dashboard",
  },
  {
    label: "Branch Manager",
    initials: "B.M",
    value: "branch-manager",
    href: "/mega/branch-manager/dashboard",
  },
];
