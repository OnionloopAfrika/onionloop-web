"use client";

import { SearchInput } from "../../ui/search-input";
import { ChevronLeftIcon, RightArrowIcon } from "../../icons/svgs";

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  staff: string;
  sales: number;
  time: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    orderId: "ORD-000123",
    customer: "Adaeze Nwosu",
    staff: "Adaeze Nwosu",
    sales: 45000,
    time: "May 19,2026 at 09:15am",
  },
  {
    id: "2",
    orderId: "ORD-000123",
    customer: "Emeka Eze",
    staff: "Emeka Eze",
    sales: 12800,
    time: "May 19,2026 at 09:15am",
  },
  {
    id: "3",
    orderId: "ORD-000123",
    customer: "Emeka Eze",
    staff: "Emeka Eze",
    sales: 26500,
    time: "May 19,2026 at 09:15am",
  },
  {
    id: "4",
    orderId: "ORD-000123",
    customer: "Chidinma Obi",
    staff: "Chidinma Obi",
    sales: 3200,
    time: "May 19,2026 at 09:15am",
  },
  {
    id: "5",
    orderId: "ORD-000123",
    customer: "Femi Adeyemi",
    staff: "Femi Adeyemi",
    sales: 28400,
    time: "May 19,2026 at 09:15am",
  },
];

export default function CrewSales() {
  return (
    <div className="space-y-[16px]">
      <p className="font-[600] text-[18px] text-[#131313]">Sales</p>

      <div className="flex-col md:flex-row flex items-start gap-3 justify-between bg-white rounded-tl-[16px] rounded-tr-[16px] p-[16px] ">
        <div className="sm:w-[50%] w-full grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-[9px]">
          <div className="w-full">
            <SearchInput
              placeholder="Search by ref or amount..."
              className="rounded-[12px]"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-3 w-fit">
            <span className="text-[#6C6C6C] font-[500]">08-05-2026</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9572 2.96699V1.66699C13.9572 1.32533 13.6739 1.04199 13.3322 1.04199C12.9906 1.04199 12.7072 1.32533 12.7072 1.66699V2.91699H7.29056V1.66699C7.29056 1.32533 7.00722 1.04199 6.66556 1.04199C6.32389 1.04199 6.04056 1.32533 6.04056 1.66699V2.96699C3.79056 3.17533 2.69889 4.51699 2.53222 6.50866C2.51556 6.75033 2.71556 6.95033 2.94889 6.95033H17.0489C17.2906 6.95033 17.4906 6.74199 17.4656 6.50866C17.2989 4.51699 16.2072 3.17533 13.9572 2.96699Z"
                fill="#8A8A8A"
              />
              <path
                d="M16.6667 8.2002H3.33333C2.875 8.2002 2.5 8.5752 2.5 9.03353V14.1669C2.5 16.6669 3.75 18.3335 6.66667 18.3335H13.3333C16.25 18.3335 17.5 16.6669 17.5 14.1669V9.03353C17.5 8.5752 17.125 8.2002 16.6667 8.2002ZM7.675 15.1752C7.63333 15.2085 7.59167 15.2502 7.55 15.2752C7.5 15.3085 7.45 15.3335 7.4 15.3502C7.35 15.3752 7.3 15.3919 7.25 15.4002C7.19167 15.4085 7.14167 15.4169 7.08333 15.4169C6.975 15.4169 6.86667 15.3919 6.76667 15.3502C6.65833 15.3085 6.575 15.2502 6.49167 15.1752C6.34167 15.0169 6.25 14.8002 6.25 14.5835C6.25 14.3669 6.34167 14.1502 6.49167 13.9919C6.575 13.9169 6.65833 13.8585 6.76667 13.8169C6.91667 13.7502 7.08333 13.7335 7.25 13.7669C7.3 13.7752 7.35 13.7919 7.4 13.8169C7.45 13.8335 7.5 13.8585 7.55 13.8919C7.59167 13.9252 7.63333 13.9585 7.675 13.9919C7.825 14.1502 7.91667 14.3669 7.91667 14.5835C7.91667 14.8002 7.825 15.0169 7.675 15.1752ZM7.675 12.2585C7.51667 12.4085 7.3 12.5002 7.08333 12.5002C6.86667 12.5002 6.65 12.4085 6.49167 12.2585C6.34167 12.1002 6.25 11.8835 6.25 11.6669C6.25 11.4502 6.34167 11.2335 6.49167 11.0752C6.725 10.8419 7.09167 10.7669 7.4 10.9002C7.50833 10.9419 7.6 11.0002 7.675 11.0752C7.825 11.2335 7.91667 11.4502 7.91667 11.6669C7.91667 11.8835 7.825 12.1002 7.675 12.2585ZM10.5917 15.1752C10.4333 15.3252 10.2167 15.4169 10 15.4169C9.78333 15.4169 9.56667 15.3252 9.40833 15.1752C9.25833 15.0169 9.16667 14.8002 9.16667 14.5835C9.16667 14.3669 9.25833 14.1502 9.40833 13.9919C9.71667 13.6835 10.2833 13.6835 10.5917 13.9919C10.7417 14.1502 10.8333 14.3669 10.8333 14.5835C10.8333 14.8002 10.7417 15.0169 10.5917 15.1752ZM10.5917 12.2585C10.55 12.2919 10.5083 12.3252 10.4667 12.3585C10.4167 12.3919 10.3667 12.4169 10.3167 12.4335C10.2667 12.4585 10.2167 12.4752 10.1667 12.4835C10.1083 12.4919 10.0583 12.5002 10 12.5002C9.78333 12.5002 9.56667 12.4085 9.40833 12.2585C9.25833 12.1002 9.16667 11.8835 9.16667 11.6669C9.16667 11.4502 9.25833 11.2335 9.40833 11.0752C9.48333 11.0002 9.575 10.9419 9.68333 10.9002C9.99167 10.7669 10.3583 10.8419 10.5917 11.0752C10.7417 11.2335 10.8333 11.4502 10.8333 11.6669C10.8333 11.8835 10.7417 12.1002 10.5917 12.2585ZM13.5083 15.1752C13.35 15.3252 13.1333 15.4169 12.9167 15.4169C12.7 15.4169 12.4833 15.3252 12.325 15.1752C12.175 15.0169 12.0833 14.8002 12.0833 14.5835C12.0833 14.3669 12.175 14.1502 12.325 13.9919C12.6333 13.6835 13.2 13.6835 13.5083 13.9919C13.6583 14.1502 13.75 14.3669 13.75 14.5835C13.75 14.8002 13.6583 15.0169 13.5083 15.1752ZM13.5083 12.2585C13.4667 12.2919 13.425 12.3252 13.3833 12.3585C13.3333 12.3919 13.2833 12.4169 13.2333 12.4335C13.1833 12.4585 13.1333 12.4752 13.0833 12.4835C13.025 12.4919 12.9667 12.5002 12.9167 12.5002C12.7 12.5002 12.4833 12.4085 12.325 12.2585C12.175 12.1002 12.0833 11.8835 12.0833 11.6669C12.0833 11.4502 12.175 11.2335 12.325 11.0752C12.4083 11.0002 12.4917 10.9419 12.6 10.9002C12.75 10.8335 12.9167 10.8169 13.0833 10.8502C13.1333 10.8585 13.1833 10.8752 13.2333 10.9002C13.2833 10.9169 13.3333 10.9419 13.3833 10.9752C13.425 11.0085 13.4667 11.0419 13.5083 11.0752C13.6583 11.2335 13.75 11.4502 13.75 11.6669C13.75 11.8835 13.6583 12.1002 13.5083 12.2585Z"
                fill="#8A8A8A"
              />
            </svg>
          </div>
        </div>
        <div className="font-[500] text-[16px] text-[#6C6C6C]">
          Showing 10 transactions
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto select-none">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Order ID
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Customer
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Staff
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Sales
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Time
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {mockTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300"
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <p className="text-[14px] text-[#6C6C6C]">
                      {transaction.orderId}
                    </p>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <p className="text-[14px] font-medium text-[#6C6C6C]">
                      {transaction.customer}
                    </p>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <p className="text-[14px] font-medium text-[#6C6C6C]">
                      {transaction.staff}
                    </p>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap text-start font-medium text-[#04802E] text-[14px]">
                    +₦{transaction.sales.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap text-start text-[#6C6C6C] text-[14px]">
                    {transaction.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100">
          <div className="text-[14px] text-gray-500">
            Showing 1 to 10 of 70 order sales
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <ChevronLeftIcon className="w-5 h-5 text-[#6C6C6C]" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-[#04802E] text-white font-medium">
              1
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 text-[#6C6C6C] font-medium hover:bg-gray-50">
              2
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 text-[#6C6C6C] font-medium hover:bg-gray-50">
              3
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 text-[#6C6C6C] font-medium hover:bg-gray-50">
              4
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 text-[#6C6C6C] font-medium hover:bg-gray-50">
              ...
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 text-[#6C6C6C] font-medium hover:bg-gray-50">
              16
            </button>
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <RightArrowIcon className="w-5 h-5 text-[#6C6C6C]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
