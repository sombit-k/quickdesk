"use client";

import { Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* Left side - Dashboard title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Right side - Notifications and user actions */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
          <div className="absolute top-full right-0 mt-2 text-xs text-gray-500 whitespace-nowrap">
            Drop a notification if someone replys
          </div>
        </div>

        {/* Dashboard Button */}
        <Button variant="outline" size="sm">
          Dashboard
        </Button>

        {/* Login Button */}
        <Button variant="default" size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
          Login
        </Button>
      </div>
    </div>
  );
}
