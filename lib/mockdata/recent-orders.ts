export interface RecentOrder {
  orderNumber: string;
  customerName: string;
  customerNos: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
  date: string;
}

export const recentOrders: RecentOrder[] = [
  {
    orderNumber: "#0011",
    customerName: "John Chika",
    customerNos: "09045678921",
    amount: "+₦12,500",
    status: "Success",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0023",
    customerName: "Favour Ike",
    customerNos: "09045678921",
    amount: "+₦52,500",
    status: "Success",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0031",
    customerName: "Blessing Eze",
    customerNos: "09045678921",
    amount: "+₦10,500",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0041",
    customerName: "Tolu Oba",
    customerNos: "09045678921",
    amount: "+₦120,500",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0041",
    customerName: "Mary Bose",
    customerNos: "09045678921",
    amount: "+₦19,100",
    status: "Failed",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0061",
    customerName: "Mary Bose",
    customerNos: "09045678921",
    amount: "+₦19,100",
    status: "Failed",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0051",
    customerName: "Mary Bose",
    customerNos: "09045678921",
    amount: "+₦19,100",
    status: "Failed",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0071",
    customerName: "Mary Bose",
    customerNos: "09045678921",
    amount: "+₦19,100",
    status: "Failed",
    date: "2025-03-24 09:12",
  },
  {
    orderNumber: "#0081",
    customerName: "Mary Bose",
    customerNos: "09045678921",
    amount: "+₦19,100",
    status: "Failed",
    date: "2025-03-24 09:12",
  },
];
