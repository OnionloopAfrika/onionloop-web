import { AggregatorIcon, AggregatorRevenueIcon, AggregatorTransactionIcon, CalendarIcon, InventoryIcon, RevenueIcon, StaffIcon, TransactionIcon } from '@/components/icons/svgs'
import StatCard from '@/components/layouts/card-component'
import Header from '@/components/layouts/header'
import React from 'react'

const page = () => {
  return (
    <main>
          <div className=" flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
              <Header
                  heading="Dashboard"
                  subHeading="Manage and track all businesses under your aggregator network"
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
                  icon={<AggregatorRevenueIcon color="#04802E" />}
                  percentage="12.4"
                  value="₦2.41M"
                  label="Total Business"
                  footerText="₦267k vs last month"
                  showTrendIcon
                  changePercentage={12.4}
              />

              <StatCard
                  themeColor="green"
                  icon={<AggregatorTransactionIcon color="#0D5EBA" />}
                  percentage="8.4"
                  value="1,350"
                  label="Active Business"
                  footerText="98 vs last month"
                  showTrendIcon
                  changePercentage={8.4}
                  />

              <StatCard
                  themeColor="green"
                  icon={<AggregatorIcon color="#04802E" />}
                  percentage="12.4"
                  value="6"
                  label="New Business"
                  footerText="5.2 vs last month"
                  footerColor="green"
                  showTrendIcon
                  changePercentage={12.4}
              />

              <StatCard
                  themeColor="blue"
                  icon={<TransactionIcon color="#0D5EBA" />}
                  percentage="12.4"
                  value="120"
                  label="Products in Inventory"
                  footerText="5 out of stock"
                  footerColor="green"
                  showTrendIcon
                  changePercentage={12.4}
              />
          </div>
    </main>
  )
}

export default page