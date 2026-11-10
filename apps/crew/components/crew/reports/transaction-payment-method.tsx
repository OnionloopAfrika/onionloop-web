"use client";

import { useState, useEffect } from "react";
import Select from "../../ui/select";

interface PaymentMethodData {
  name: string;
  value: number;
  color: string;
  bgColor: string;
}

const paymentData: PaymentMethodData[] = [
  { name: "QR Payment", value: 1200, color: "#04802E", bgColor: "#E6F4E9" },
  { name: "Bank Transfer", value: 770, color: "#0D5EBA", bgColor: "#E6F0FC" },
  { name: "Cash", value: 30, color: "#DD900D", bgColor: "#FFF4E6" },
];

export default function TransactionPaymentMethod() {
  const [timeFilter, setTimeFilter] = useState("This week");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const total = paymentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Transactions By Payment Method
        </h2>

        <div className="w-[160px]">
          <Select
            value={timeFilter}
            onValueChange={setTimeFilter}
            options={[{ value: "This week", label: "This week" }]}
            placeholder="This week"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">
            Total Transactions:
          </span>
          <span className="text-xl font-semibold text-gray-900">
            {total.toLocaleString()}
          </span>
        </div>

        {paymentData.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {item.name}
                </span>
                <span className="text-sm text-gray-500">
                  {item.value.toLocaleString()} ({percentage}%)
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full"
                style={{ backgroundColor: item.bgColor }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
