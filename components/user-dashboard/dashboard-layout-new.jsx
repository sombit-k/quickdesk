"use client";

import { DashboardHeader } from "./dashboard-header-new";
import { DashboardChart } from "./dashboard-chart-new";

export function DashboardLayoutNew() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-30">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 ">

        {/* Main Chart/Content Area */}
        <div className="mb-8">
          <DashboardChart />
        </div>
      </div>
    </div>
  );
}
