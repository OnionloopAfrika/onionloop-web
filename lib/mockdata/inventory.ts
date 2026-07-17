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

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Tomatoes",
    category: "Vegetables",
    unit: "kg",
    price: 500,
    quantity: 20,
    lowStock: 5,
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Milk",
    category: "Dairy",
    unit: "litre",
    price: 1200,
    quantity: 0,
    lowStock: 3,
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Bread",
    category: "Bakery",
    unit: "loaf",
    price: 300,
    quantity: 2,
    lowStock: 5,
    expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Eggs",
    category: "Protein",
    unit: "crates",
    price: 2500,
    quantity: 5,
    lowStock: 2,
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Rice",
    category: "Grains",
    unit: "bag",
    price: 35000,
    quantity: 0,
    lowStock: 1,
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const warning: WarningProps[] = [
  {
    warning:
      "1 product is running low on stock — restock soon to avoid disruptions.The alert & notifications component",
  },

  {
    warning:
      "1 product will expire in the next 3 days. Review and take action!The alert & notifications component",
  },
];

export const inventoryStats: InventoryStatProps[] = [
  {
    icon: ShopAddIcon,
    figure: "5",
    desc: "Total products",
    action: "2 added this week",
  },

  {
    icon: ChainlinkIcon,
    figure: "1",
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
