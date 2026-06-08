import React from 'react'

const GroupManagerDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Group Manager Dashboard</h1>
        <p className="text-sm text-gray-500 font-medium">Manage and monitor your assigned group of locations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Group Revenue</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">₦0.00</span>
            <span className="text-xs font-medium text-emerald-500">+5.2%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Group Locations</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Group Staff</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-sm font-bold text-gray-900">Pending Approvals</h3>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-900">All caught up!</p>
            <p className="text-xs text-gray-500 font-medium">No pending staff requests or inventory approvals.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupManagerDashboard
