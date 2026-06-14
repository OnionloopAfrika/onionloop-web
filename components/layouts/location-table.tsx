import { LocationItem } from '@/types/types';
import React from 'react'


const LocationList = ({filteredData}: {filteredData: LocationItem[]}) => {
    const getStatusStyles = (status: LocationItem["status"]) => {
        switch (status) {
            case "Healthy":
                return {
                    badge: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]",
                    bar: "bg-[#04802E]",
                };
            case "Warning":
                return {
                    badge: "bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]",
                    bar: "bg-[#DD900D]",
                };
            case "Critical":
                return {
                    badge: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]",
                    bar: "bg-[#CB1A14]",
                };
        }
    };
  return (
      <div className="w-full overflow-x-auto bg-white border border-gray-100 shadow-sm">
          <table className="w-full text-left border-collapse table-auto">
              <thead>
                  <tr className="border-b border-gray-100 bg-[#F7F7F7]">
                      <th className="px-4 py-3 text-[15px] font-semibold text-[#6C6C6C] whitespace-nowrap">Groups</th>
                      <th className="px-4 py-3 text-[15px] font-semibold text-[#6C6C6C] whitespace-nowrap">Location</th>
                      <th className="px-4 py-3 text-[15px] font-semibold text-[#6C6C6C] whitespace-nowrap">Manager</th>
                      <th className="px-4 py-3 text-[15px] font-semibold text-[#6C6C6C] whitespace-nowrap">Revenue</th>
                      <th className="px-4 py-3 text-[15px] font-semibold text-[#6C6C6C] whitespace-nowrap">Transactions</th>
                      <th className="px-4 py-3 text-[15px] font-semibold text-[#6C6C6C] whitespace-nowrap">Perf. Score</th>
                      <th className="px-4 py-3 text-[15px] font-semibold text-[#6C6C6C] whitespace-nowrap">Status</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {filteredData?.map((loc) => {
                      const styles = getStatusStyles(loc.status);
                      return (
                          <tr key={loc.id} className="hover:bg-gray-30/50 transition-colors">
                              <td className="px-4 py-3 text-[15px] text-[#6C6C6C] font-medium whitespace-nowrap">
                                  {loc.group}
                              </td>
                              <td className="px-4 py-3 text-[15px] text-[#6C6C6C] font-normal whitespace-nowrap">
                                  {loc.name}
                              </td>
                              <td className="px-4 py-3 text-[15px] text-[#6C6C6C] font-normal whitespace-nowrap">
                                  {loc.manager}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex flex-col">
                                      <span className="text-[15px] font-normal text-[#6C6C6C]">{loc.revenue}</span>
                                      <span className={`text-xs font-normal flex items-center gap-0.5 ${loc.isTrendUp ? 'text-green-600' : 'text-red-600'}`}>
                                          {loc.isTrendUp ? "↑" : "↓"}{loc.trend}
                                      </span>
                                  </div>
                              </td>
                              <td className="px-4 py-3 text-[15px] text-[#6C6C6C] font-normal whitespace-nowrap">
                                  {loc.transactions}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap w-[180px]">
                                  <div className="flex items-center gap-3">
                                      <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                                          <div className={`h-full ${styles.bar}`} style={{ width: `${loc.perfScore}%` }} />
                                      </div>
                                      <span className="text-xs font-normal text-[#6C6C6C]">{loc.perfScore}</span>
                                  </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`px-4 py-1 border rounded-full text-xs font-normal ${styles.badge}`}>
                                      {loc.status}
                                  </span>
                              </td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
      </div>
  )
}

export default LocationList