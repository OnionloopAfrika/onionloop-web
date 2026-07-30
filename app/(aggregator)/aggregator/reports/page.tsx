import { DashboardOverview } from '@/components/aggregator/earning/reports-table';
import { CalendarIcon } from '@/components/icons/svgs'
import StatCard from '@/components/layouts/card-component'
import Header from '@/components/layouts/header'
import DonutBreakdown from '@/components/ui/charts/donut-chart';
import TrendChart, { ChartDataPoint } from '@/components/ui/charts/trend-chart';
const revenueData: ChartDataPoint[] = [
    { label: 'Mon', volume: 1200 },
    { label: 'Tue', volume: 1800 },
    { label: 'Wed', volume: 1500 },
    { label: 'Thu', volume: 2100 },
    { label: 'Fri', volume: 1950 },
    { label: 'Sat', volume: 2400 },
    { label: 'Sun', volume: 2600 },
];

function RevenueCard() {
    return (
        <TrendChart
        title="Transaction Volume Trend "
        subtitle="Daily transaction count across businesses"
            data={revenueData}
            series={[{ dataKey: 'volume', name: 'Volume', color: '#04907E', showArea: true }]}
        />
    );
}
function EarningsBreakdownCard() {
  return (
    <DonutBreakdown
      title="Earnings Breakdown"
      currencySymbol="₦"
      totalLabel="Total this month"
      total={450000}
      dropdownOptions={['This month', 'Last month', 'This year']}
      data={[
        { label: 'Revenue Earnings', value: 2500000, color: '#0f9d78' },
        { label: 'Bonus Earnings', value: 200000, color: '#f2c200' },
      ]}
    />
  );
}
const page = () => {
  return (
    <main>
      <div className=" flex flex-col md:flex-row gap-4 justify-between items-start mb-4">
        <Header
          heading="Reports"
          subHeading="Access detailed reports to monitor performance, identify trends, and make informed decisions."
        />
        <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
            <CalendarIcon />
            Mar 2026
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 gap-2 py-4">
        <StatCard
          themeColor="blue"
          icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.33398 14.6667H14.6673" stroke="#0D5EBA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.5 2.66665V14.6666H9.5V2.66665C9.5 1.93331 9.2 1.33331 8.3 1.33331H7.7C6.8 1.33331 6.5 1.93331 6.5 2.66665Z" stroke="#0D5EBA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 6.66665V14.6666H4.66667V6.66665C4.66667 5.93331 4.4 5.33331 3.6 5.33331H3.06667C2.26667 5.33331 2 5.93331 2 6.66665Z" stroke="#0D5EBA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.334 10V14.6667H14.0007V10C14.0007 9.26669 13.734 8.66669 12.934 8.66669H12.4007C11.6007 8.66669 11.334 9.26669 11.334 10Z" stroke="#0D5EBA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
}
          percentage="12.4"
          value="₦2.41M"
          label="Transaction Volume"
          footerText=""
          changePercentage={12.4}
        />

        <StatCard
          themeColor="lemon"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4.66602 7.15997V9.29331" stroke="#668113" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 6V10.4533" stroke="#668113" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.334 7.15997V9.29331" stroke="#668113" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99998V5.99998C14.6673 2.66665 13.334 1.33331 10.0007 1.33331H6.00065C2.66732 1.33331 1.33398 2.66665 1.33398 5.99998V9.99998C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" stroke="#668113" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>}
          percentage="8.4"
          value="200"
          label="Total Transactions"
          footerText=""         
          changePercentage={8.4}
        />

        <StatCard
          themeColor="purple"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8.66732 14.6666H3.33398C2.00065 14.6666 1.33398 14 1.33398 12.6666V7.33331C1.33398 5.99998 2.00065 5.33331 3.33398 5.33331H6.66732V12.6666C6.66732 14 7.33398 14.6666 8.66732 14.6666Z" stroke="#7C53FC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.74064 2.66669C6.68731 2.86669 6.66732 3.08669 6.66732 3.33335V5.33335H3.33398V4.00002C3.33398 3.26669 3.93398 2.66669 4.66732 2.66669H6.74064Z" stroke="#7C53FC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.33398 5.33331V8.66665" stroke="#7C53FC" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 5.33331V8.66665" stroke="#7C53FC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.334 11.3333H10.0007C9.63398 11.3333 9.33398 11.6333 9.33398 12V14.6666H12.0007V12C12.0007 11.6333 11.7007 11.3333 11.334 11.3333Z" stroke="#7C53FC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 8.66669V11.3334" stroke="#7C53FC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.66602 12.6666V3.33331C6.66602 1.99998 7.33268 1.33331 8.66602 1.33331H12.666C13.9993 1.33331 14.666 1.99998 14.666 3.33331V12.6666C14.666 14 13.9993 14.6666 12.666 14.6666H8.66602C7.33268 14.6666 6.66602 14 6.66602 12.6666Z" stroke="#7C53FC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          }
          percentage="12.4"
          value="10"
          label="Total Businesses"
          footerText=""
          footerColor="purple"
          changePercentage={12.4}
        />

        <StatCard
          themeColor="green"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12.0007 4.77332C11.9607 4.76665 11.914 4.76665 11.874 4.77332C10.954 4.73998 10.2207 3.98665 10.2207 3.05331C10.2207 2.09998 10.9874 1.33331 11.9407 1.33331C12.894 1.33331 13.6607 2.10665 13.6607 3.05331C13.654 3.98665 12.9207 4.73998 12.0007 4.77332Z" stroke="#04802E" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.3149 9.62663C12.2283 9.77997 13.2349 9.61996 13.9416 9.14663C14.8816 8.51996 14.8816 7.4933 13.9416 6.86663C13.2283 6.3933 12.2083 6.23329 11.2949 6.39329" stroke="#04802E" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3.98031 4.77332C4.02031 4.76665 4.06698 4.76665 4.10698 4.77332C5.02698 4.73998 5.76031 3.98665 5.76031 3.05331C5.76031 2.09998 4.99365 1.33331 4.04031 1.33331C3.08698 1.33331 2.32031 2.10665 2.32031 3.05331C2.32698 3.98665 3.06031 4.73998 3.98031 4.77332Z" stroke="#04802E" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4.6676 9.62663C3.75427 9.77997 2.7476 9.61996 2.04094 9.14663C1.10094 8.51996 1.10094 7.4933 2.04094 6.86663C2.75427 6.3933 3.77427 6.23329 4.6876 6.39329" stroke="#04802E" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.0007 9.75336C7.9607 9.74669 7.91404 9.74669 7.87404 9.75336C6.95404 9.72002 6.2207 8.96669 6.2207 8.03336C6.2207 7.08002 6.98737 6.31335 7.9407 6.31335C8.89403 6.31335 9.6607 7.08669 9.6607 8.03336C9.65404 8.96669 8.9207 9.72669 8.0007 9.75336Z" stroke="#04802E" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.06047 11.8534C5.12047 12.48 5.12047 13.5067 6.06047 14.1334C7.12714 14.8467 8.8738 14.8467 9.94047 14.1334C10.8805 13.5067 10.8805 12.48 9.94047 11.8534C8.88047 11.1467 7.12714 11.1467 6.06047 11.8534Z" stroke="#04802E" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          percentage="12.4"
          value="120"
          label="Active Merchants"
          footerText=""
          footerColor="green"
          changePercentage={12.4}
        />
        <StatCard
          themeColor="orange"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.99935 7.99998C9.8403 7.99998 11.3327 6.5076 11.3327 4.66665C11.3327 2.8257 9.8403 1.33331 7.99935 1.33331C6.1584 1.33331 4.66602 2.8257 4.66602 4.66665C4.66602 6.5076 6.1584 7.99998 7.99935 7.99998Z" stroke="#DD900D" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.7268 14.6667C13.7268 12.0867 11.1601 10 8.0001 10C4.8401 10 2.27344 12.0867 2.27344 14.6667" stroke="#DD900D" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          percentage="12.4"
          value="22"
          label="Active Agents"
          footerText=""
          footerColor="green"
          changePercentage={12.4}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 w-full">
        <div className="w-full md:col-span-3 h-full">
          <RevenueCard />
        </div>
        <div className="w-full md:col-span-2 h-full">
          <EarningsBreakdownCard />
        </div>
      </div>
      <DashboardOverview />
    </main>
  )
}

export default page