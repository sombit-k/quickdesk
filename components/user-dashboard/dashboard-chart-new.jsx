"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Dummy data for visualization
const categoryData = [
  { name: 'Technical', questions: 45, replies: 38, color: 'bg-blue-500', glowColor: 'shadow-blue-500/50' },
  { name: 'Billing', questions: 32, replies: 28, color: 'bg-purple-500', glowColor: 'shadow-purple-500/50' },
  { name: 'General', questions: 28, replies: 25, color: 'bg-orange-500', glowColor: 'shadow-orange-500/50' },
  { name: 'Account', questions: 15, replies: 12, color: 'bg-red-500', glowColor: 'shadow-red-500/50' },
];

const maxValue = Math.max(...categoryData.map(item => Math.max(item.questions, item.replies)));

export function DashboardChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-green-100 via-green-200 to-emerald-300 rounded-3xl p-8 border border-green-300 shadow-2xl relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10"
      >
        <div className="mb-6">
          <motion.h2 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-green-800 mb-3 bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text"
          >
            Display the graphical representation of Data.
          </motion.h2>
          
          <motion.div 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-green-700 space-y-1"
          >
            <p className="font-semibold">E.g.</p>
            <ul className="space-y-1 text-sm font-medium">
              <li>• Number of question asked</li>
              <li>• Number of replied</li>
              <li>• Data group by category</li>
            </ul>
          </motion.div>
        </div>

        {/* Enhanced Bar Chart Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/50 shadow-xl"
        >
          <h3 className="text-green-800 font-semibold mb-6 text-lg">Category Overview</h3>
          <div className="space-y-6">
            {categoryData.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-800 text-lg">{item.name}</span>
                  <div className="text-sm text-green-700 font-medium bg-green-100 px-3 py-1 rounded-full">
                    Q: {item.questions} | R: {item.replies}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {/* Questions Bar */}
                  <div>
                    <div className="text-xs text-green-700 mb-2 font-medium">Questions</div>
                    <div className="h-4 bg-green-200/60 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.questions / maxValue) * 100}%` }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 1, ease: "easeOut" }}
                        className={`h-full ${item.color} rounded-full shadow-lg relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>
                  {/* Replies Bar */}
                  <div>
                    <div className="text-xs text-green-700 mb-2 font-medium">Replies</div>
                    <div className="h-4 bg-green-200/60 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.replies / maxValue) * 100}%` }}
                        transition={{ delay: 0.9 + index * 0.2, duration: 1, ease: "easeOut" }}
                        className={`h-full ${item.color} opacity-80 rounded-full shadow-lg relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Summary Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 pt-6 border-t border-green-300/50"
        >
          {/* Total Questions */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="text-center bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/30"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
              className="text-4xl font-bold text-green-800 mb-2"
            >
              120
            </motion.div>
            <div className="text-sm text-green-700 font-semibold mb-3">Total Questions Asked</div>
            <Badge variant="secondary" className="bg-green-200 text-green-800 shadow-md">
              +12 this week
            </Badge>
          </motion.div>

          {/* Total Replies */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="text-center bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/30"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
              className="text-4xl font-bold text-green-800 mb-2"
            >
              103
            </motion.div>
            <div className="text-sm text-green-700 font-semibold mb-3">Total Replies Given</div>
            <Badge variant="secondary" className="bg-green-200 text-green-800 shadow-md">
              86% response rate
            </Badge>
          </motion.div>

          {/* Categories */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="text-center bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/30"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              className="text-4xl font-bold text-green-800 mb-2"
            >
              4
            </motion.div>
            <div className="text-sm text-green-700 font-semibold mb-3">Active Categories</div>
            <Badge variant="secondary" className="bg-green-200 text-green-800 shadow-md">
              All active
            </Badge>
          </motion.div>
        </motion.div>

        {/* Enhanced Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl"
        >
          <h4 className="text-green-800 font-semibold mb-4 text-lg">Quick Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
            {[
              { label: "Most Active Category:", value: "Technical (45)" },
              { label: "Average Response Time:", value: "2.4 hours" },
              { label: "Resolution Rate:", value: "91%" },
              { label: "User Satisfaction:", value: "4.7/5 ⭐" }
            ].map((insight, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                className="flex items-center justify-between p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                <span className="font-medium">{insight.label}</span>
                <Badge variant="outline" className="border-green-500 text-green-800 bg-white/50">
                  {insight.value}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
