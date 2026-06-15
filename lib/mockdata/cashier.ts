import {
  ChainlinkIcon,
  BarIcon,
  RevenueIcon,
  TransactionIcon,
} from "@/components/icons/svgs";
import { CashierStatProps } from "@/types/cashier/type";

export const cashierStats: CashierStatProps[] = [
  {
    icon: RevenueIcon,
    figure: "₦75,000",
    desc: "Todays Total Sales",
    action: "₦267K vs last month",
    percentage: "+12.4%",
    color: "green",
  },
  {
    icon: ChainlinkIcon,
    figure: "1500",
    desc: "Products in Inventory",
    action: "10 Out of Stock",
    percentage: "",
    color: "orange",
  },
  {
    icon: TransactionIcon,
    figure: "30",
    desc: "Todays Total Orders",
    action: "98 vs last month",
    percentage: "+8.4%",
    color: "blue",
  },
];
