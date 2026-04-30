import {
  ChainlinkIcon,
  DangerIcon,
  ShopAddIcon,
} from "@/components/icons/svgs";
import {
  InventoryStatProps,
  Product,
  WarningProps,
} from "@/types/inventory/type";

export const initialProducts: Product[] = [];

export const warning: WarningProps[] = [
  {
    warning:
      "3 products are running low on stock — restock soon to avoid disruptions.The alert & notifications component",
  },

  {
    warning:
      "4 products will expire in the next 3 days. Review and take action!The alert & notifications component",
  },
];

export const inventoryStats: InventoryStatProps[] = [
  {
    icon: ShopAddIcon,
    figure: "8",
    desc: "Total products",
    action: "2 added this week",
  },

  {
    icon: ChainlinkIcon,
    figure: "3",
    desc: "Low stock items",
    action: "Need to restock",
  },

  {
    icon: DangerIcon,
    figure: "2",
    desc: "Out of stock",
    action: "Action Required",
  },
];
