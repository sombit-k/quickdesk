"use client";

import { DashboardHeader } from "./dashboard-header-new";
import { DashboardChart } from "./dashboard-chart-new";

export function DashboardLayoutNew() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">▷</span>
            Dashboard
          </h1>
        </div>

        {/* Main Chart/Content Area */}
        <div className="mb-8">
          <DashboardChart />
        </div>
      </div>
    </div>
  );
}
