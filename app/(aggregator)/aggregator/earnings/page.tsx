import EarningsTableSection from '@/components/aggregator/earning/earning-table'
import { CalendarIcon, AggregatorRevenueIcon, AggregatorTransactionIcon, AggregatorIcon, TransactionIcon } from '@/components/icons/svgs'
import StatCard from '@/components/layouts/card-component'
import Header from '@/components/layouts/header'
import React from 'react'

const page = () => {
  return (
      <main>
          <div className=" flex flex-col md:flex-row gap-4 justify-between items-start mb-4">
              <Header
                  heading="Earnings"
                  subHeading="Track your earnings, commissions, and payout activity all in one place."
              />
              <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
                  <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
                      <CalendarIcon />
                      Mar 2026
                  </button>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 py-4">
              <StatCard
                  themeColor="purple"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8.66699 6H4.66699" stroke="#7C53FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M14.6665 7.31333V8.68671C14.6665 9.05337 14.3731 9.35335 13.9998 9.36668H12.6931C11.9731 9.36668 11.3132 8.84002 11.2532 8.12002C11.2132 7.70002 11.3731 7.30668 11.6531 7.03335C11.8998 6.78001 12.2398 6.63336 12.6131 6.63336H13.9998C14.3731 6.6467 14.6665 6.94667 14.6665 7.31333Z" stroke="#7C53FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M11.653 7.0333C11.373 7.30664 11.213 7.69997 11.253 8.11997C11.313 8.83997 11.973 9.36664 12.693 9.36664H13.9997V10.3333C13.9997 12.3333 12.6663 13.6666 10.6663 13.6666H4.66634C2.66634 13.6666 1.33301 12.3333 1.33301 10.3333V5.66665C1.33301 3.85331 2.42634 2.58664 4.12634 2.37331C4.29968 2.34664 4.47967 2.33331 4.66634 2.33331H10.6663C10.8397 2.33331 11.0063 2.33997 11.1663 2.36664C12.8863 2.56664 13.9997 3.83998 13.9997 5.66665V6.63332H12.613C12.2397 6.63332 11.8997 6.77997 11.653 7.0333Z" stroke="#7C53FC" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>}
                  percentage="12.4"
                  value="₦2.41M"
                  label="Available Balance"
                  footerText="₦267k vs last month"
                  showTrendIcon
                  changePercentage={12.4}
              />

              <StatCard
                  themeColor="green"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5.78125 9.55325C5.78125 10.4132 6.44125 11.1066 7.26125 11.1066H8.93458C9.64792 11.1066 10.2279 10.4999 10.2279 9.75325C10.2279 8.93992 9.87458 8.65325 9.34792 8.46658L6.66125 7.53325C6.13458 7.34658 5.78125 7.05992 5.78125 6.24658C5.78125 5.49992 6.36125 4.89325 7.07458 4.89325H8.74792C9.56792 4.89325 10.2279 5.58658 10.2279 6.44658" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8 4V12" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9.99967 14.6666H5.99967C2.66634 14.6666 1.33301 13.3333 1.33301 9.99998V5.99998C1.33301 2.66665 2.66634 1.33331 5.99967 1.33331H9.99967C13.333 1.33331 14.6663 2.66665 14.6663 5.99998V9.99998C14.6663 13.3333 13.333 14.6666 9.99967 14.6666Z" stroke="#04802E" stroke-linecap="round" stroke-linejoin="round" />
              </svg>}
                  percentage="8.4"
                  value="1,350"
                  label="Payout Today"
                  footerText="98 vs last month"
                  showTrendIcon
                  changePercentage={8.4}
              />

              <StatCard
                  themeColor="blue"
                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.75" y="0.75" width="14.5" height="14.5" fill="#C6DDF7" />
                      <rect x="0.75" y="0.75" width="14.5" height="14.5" stroke="#C6DDF7" stroke-width="1.5" />
                      <path d="M7.66667 14.3333C11.3333 14.3333 14.3333 11.3333 14.3333 7.66667C14.3333 4 11.3333 1 7.66667 1C4 1 1 4 1 7.66667C1 11.3333 4 14.3333 7.66667 14.3333Z" fill="#C6DDF7" stroke="#0D5EBA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5.16699 8.00001L7.05366 9.88668L10.8337 6.11334" fill="#C6DDF7" />
                      <path d="M5.16699 8.00001L7.05366 9.88668L10.8337 6.11334" stroke="#0D5EBA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
}
                  percentage="12.4"
                  value="6"
                  label="Paid Earnings"
                  footerText="5.2 vs last month"
                  footerColor="blue"
                  showTrendIcon
                  changePercentage={12.4}
              />

              <StatCard
                  themeColor="orange"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14.6673 7.99998C14.6673 11.68 11.6807 14.6666 8.00065 14.6666C4.32065 14.6666 1.33398 11.68 1.33398 7.99998C1.33398 4.31998 4.32065 1.33331 8.00065 1.33331C11.6807 1.33331 14.6673 4.31998 14.6673 7.99998Z" stroke="#DD900D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10.4739 10.12L8.40724 8.88665C8.04724 8.67332 7.75391 8.15999 7.75391 7.73999V5.00665" stroke="#DD900D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>}
                  percentage="12.4"
                  value="120"
                  label="Pending Earnings"
                  footerText="5 out of stock"
                  footerColor="green"
                  showTrendIcon
                  changePercentage={12.4}
              />
          </div>
          <EarningsTableSection />
      </main>
  )
}

export default page