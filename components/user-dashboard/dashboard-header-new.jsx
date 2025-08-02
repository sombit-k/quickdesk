"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Bell, User, Settings, LogOut } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function DashboardHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm "
    >
      <div className="px-8 py-6 ">
        {/* Top Section - Welcome & User Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          
          </motion.div>

        {/* Main Action Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mt-20"
        >
          {/* Left Side - Search and Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            {/* Enhanced Search Bar */}
            <motion.div 
              whileFocus={{ scale: 1.02 }}
              className="relative flex-1 max-w-md"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tickets, users, or content..."
                className="pl-10 pr-4 py-3 w-full bg-white/70 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  Ctrl+K
                </Badge>
              </motion.div>
            </motion.div>

            {/* Enhanced Filters */}
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Select>
                  <SelectTrigger className="w-48 bg-white/70 backdrop-blur-sm border-gray-300 hover:border-blue-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl">
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Select>
                  <SelectTrigger className="w-48 bg-white/70 backdrop-blur-sm border-gray-300 hover:border-blue-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <SelectValue placeholder="Filter by Priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl">
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xl border-gray-300 hover:border-blue-400"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotateZ: 5 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/ask">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quick Stats Bar - Hide on scroll */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isScrolled ? 0 : 1, 
            y: isScrolled ? -20 : 0,
            height: isScrolled ? 0 : "auto"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex items-center justify-center gap-8 mt-8 pt-6 border-t border-gray-200 overflow-hidden ${
            isScrolled ? 'pointer-events-none' : ''
          }`}
          style={{
            marginBottom: isScrolled ? '-2rem' : '0'
          }}
        >
          {[
            { label: "Open Tickets", value: "23", change: "+3", color: "text-blue-600", bgColor: "bg-blue-50" },
            { label: "In Progress", value: "15", change: "+1", color: "text-orange-600", bgColor: "bg-orange-50" },
            { label: "Resolved Today", value: "8", change: "+5", color: "text-green-600", bgColor: "bg-green-50" },
            { label: "Avg Response", value: "2.4h", change: "-0.3h", color: "text-purple-600", bgColor: "bg-purple-50" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`text-center p-4 rounded-2xl ${stat.bgColor} border border-white shadow-sm hover:shadow-md transition-all duration-300 min-w-[120px]`}
            >
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium mb-2">{stat.label}</div>
              <Badge 
                variant="secondary" 
                className={`text-xs ${stat.color} bg-white/70`}
              >
                {stat.change}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
