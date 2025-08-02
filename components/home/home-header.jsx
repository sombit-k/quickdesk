"use client";

import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HomeHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800">QuickDesk</h1>
        <span className="text-sm text-gray-500">By default On</span>
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
        </div>

        {/* Dashboard Button */}
        <Button variant="outline" size="sm" className="border-gray-300">
          Dashboard
        </Button>

        {/* Admin Button */}
        <Button variant="default" size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4">
          Admin
        </Button>
      </div>
    </div>
  );
}
