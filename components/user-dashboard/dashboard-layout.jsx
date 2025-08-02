"use client";

import { DashboardHeader } from "./dashboard-header";
import { DashboardChart } from "./dashboard-chart";
import { StatsCard } from "./stats-card";
import { 
  HelpCircle, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Ticket,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export function DashboardLayout() {
  return (
    <div className=" bg-gray-50 mt-20">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content with proper margins */}
      <div className="p-6 space-y-6 my-8 mb-16">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Tickets"
            value="247"
            icon={Ticket}
            trend="+12% from last month"
            color="blue"
          />
          <StatsCard
            title="Open Tickets"
            value="34"
            icon={AlertCircle}
            trend="5 urgent"
            color="orange"
          />
          <StatsCard
            title="Resolved Today"
            value="18"
            icon={CheckCircle}
            trend="+23% efficiency"
            color="green"
          />
          <StatsCard
            title="Avg Response Time"
            value="2.4h"
            icon={Clock}
            trend="-15min improvement"
            color="purple"
          />
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <DashboardChart />
          </div>
          
          {/* Side Stats */}
          <div className="space-y-4">
            <StatsCard
              title="Questions Asked"
              value="120"
              icon={HelpCircle}
              trend="This month"
              color="blue"
            />
            <StatsCard
              title="Replies Given"
              value="103"
              icon={MessageSquare}
              trend="86% response rate"
              color="green"
            />
            <StatsCard
              title="Active Users"
              value="45"
              icon={Users}
              trend="Currently online"
              color="purple"
            />
            <StatsCard
              title="Satisfaction Rate"
              value="4.8/5"
              icon={TrendingUp}
              trend="↑ 0.3 from last month"
              color="green"
            />
          </div>
        </div>

        {/* Additional Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: "New ticket created", user: "John Doe", time: "2 minutes ago", type: "ticket" },
                { action: "Ticket resolved", user: "Jane Smith", time: "15 minutes ago", type: "resolved" },
                { action: "Comment added", user: "Mike Johnson", time: "1 hour ago", type: "comment" },
                { action: "Ticket assigned", user: "Sarah Wilson", time: "2 hours ago", type: "assigned" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'ticket' ? 'bg-blue-500' :
                    activity.type === 'resolved' ? 'bg-green-500' :
                    activity.type === 'comment' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Create Ticket", icon: Ticket, color: "bg-blue-500" },
                { label: "View Reports", icon: TrendingUp, color: "bg-green-500" },
                { label: "Manage Users", icon: Users, color: "bg-purple-500" },
                { label: "Settings", icon: HelpCircle, color: "bg-gray-500" },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <action.icon className={`h-8 w-8 ${action.color} text-white rounded p-1.5 mb-2`} />
                  <span className="text-sm text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
