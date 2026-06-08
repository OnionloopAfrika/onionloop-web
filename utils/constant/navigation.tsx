import {
  OverviewIcon,
  TransactionIcon,
  InventoryIcon,
  StaffIcon,
  OverviewActiveIcon,
  TransactionActiveIcon,
  InventoryActiveIcon,
  StaffActiveIcon,
  NotificationIcon,
  SettingsIcon,
  ReceiptEditIcon,
  LocationIcon,
  Dashboard,
  NewOrder,
  OrderDetails,
  DashboardSettings,
} from "@/components/icons/svgs";

export type NavItem = {
  key: string;
  label: string;
  icon: (color?: string) => React.ReactNode;
  activeIcon: (color?: string) => React.ReactNode;
  href: string;
  badge?: number;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const CASHIER_NAV_ITEMS: NavItem[] = [
  {
    key: "dashboard",
    href: "/mega/cashier/dashboard",
    label: "Dashboard",
    icon: (color) => <Dashboard color={color} />,
    activeIcon: (color) => <Dashboard color={color} />,
  },
  {
    key: "new-order",
    href: "/mega/cashier/new-order",
    label: "New Order",
    icon: (color) => <NewOrder color={color} />,
    activeIcon: (color) => <NewOrder color={color} />,
  },
  {
    key: "order-details",
    href: "/mega/cashier/order-details",
    label: "Order Details",
    icon: (color) => <OrderDetails color={color} />,
    activeIcon: (color) => <OrderDetails color={color} />,
  },
  {
    key: "alert",
    href: "/mega/cashier/alert",
    label: "Alert",
    icon: (color) => <NotificationIcon color={color} />,
    activeIcon: (color) => <NotificationIcon color={color} />,
    badge: 4,
  },
  {
    key: "settings",
    href: "/mega/cashier/settings",
    label: "Settings",
    icon: (color) => <DashboardSettings color={color} />,
    activeIcon: (color) => <DashboardSettings color={color} />,
  },
];

export const SUPER_ADMIN_NAV_SECTIONS: NavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      {
        key: "dashboard",
        href: "/mega/super-admin/dashboard",
        label: "Dashboard",
        icon: (color) => <Dashboard color={color} />,
        activeIcon: (color) => <Dashboard color={color} />,
      },
      {
        key: "locations",
        href: "/mega/super-admin/locations",
        label: "Locations",
        icon: (color) => <LocationIcon color={color} />,
        activeIcon: (color) => <LocationIcon color={color} />,
      },
      {
        key: "transactions",
        href: "/mega/super-admin/transactions",
        label: "Transactions",
        icon: (color) => <TransactionIcon color={color} />,
        activeIcon: (color) => <TransactionActiveIcon color={color} />,
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        key: "staff",
        href: "/mega/super-admin/staff",
        label: "Staff",
        icon: (color) => <StaffIcon color={color} />,
        activeIcon: (color) => <StaffActiveIcon color={color} />,
      },
      {
        key: "reports",
        href: "/mega/super-admin/reports",
        label: "Reports",
        icon: (color) => <ReceiptEditIcon color={color} />,
        activeIcon: (color) => <ReceiptEditIcon color={color} />,
      },
    ],
  },
];

export const GROUP_MANAGER_NAV_SECTIONS: NavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      {
        key: "dashboard",
        href: "/mega/group-manager/dashboard",
        label: "Dashboard",
        icon: (color) => <Dashboard color={color} />,
        activeIcon: (color) => <Dashboard color={color} />,
      },
      {
        key: "locations",
        href: "/mega/group-manager/locations",
        label: "Locations",
        icon: (color) => <LocationIcon color={color} />,
        activeIcon: (color) => <LocationIcon color={color} />,
      },
      {
        key: "transactions",
        href: "/mega/group-manager/transactions",
        label: "Transactions",
        icon: (color) => <TransactionIcon color={color} />,
        activeIcon: (color) => <TransactionActiveIcon color={color} />,
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        key: "staff",
        href: "/mega/group-manager/staff",
        label: "Staff",
        icon: (color) => <StaffIcon color={color} />,
        activeIcon: (color) => <StaffActiveIcon color={color} />,
      },
      {
        key: "reports",
        href: "/mega/group-manager/reports",
        label: "Reports",
        icon: (color) => <ReceiptEditIcon color={color} />,
        activeIcon: (color) => <ReceiptEditIcon color={color} />,
      },
    ],
  },
];

export const CREW_NAV_ITEMS: NavItem[] = [
  {
    key: "overview",
    href: `/crew/overview`,
    label: "Overview",
    icon: (color) => <OverviewIcon color={color} />,
    activeIcon: (color) => <OverviewActiveIcon color={color} />,
  },
  {
    key: "transactions",
    href: `/crew/transactions`,
    label: "Transactions",
    icon: (color) => <TransactionIcon color={color} />,
    activeIcon: (color) => <TransactionActiveIcon color={color} />,
  },
  {
    key: "inventory",
    href: `/crew/inventory`,
    label: "Inventory",
    icon: (color) => <InventoryIcon color={color} />,
    activeIcon: (color) => <InventoryActiveIcon color={color} />,
  },
  {
    key: "staffs",
    href: `/crew/staffs`,
    label: "Staffs",
    icon: (color) => <StaffIcon color={color} />,
    activeIcon: (color) => <StaffActiveIcon color={color} />,
  },
];
