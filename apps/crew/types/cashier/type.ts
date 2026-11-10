import React from "react";

export interface CashierStatProps {
  icon: React.ElementType;
  figure: string;
  desc: string;
  action: string;
  percentage: string;
  color: "green" | "orange" | "blue";
}
