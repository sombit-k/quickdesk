"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardChart() {
  // Mock data for demonstration
  const data = [
    { category: "Technical", questions: 45, replies: 38 },
    { category: "Billing", questions: 32, replies: 28 },
    { category: "General", questions: 28, replies: 25 },
    { category: "Account", questions: 15, replies: 12 },
  ];

  const maxValue = Math.max(...data.map(item => Math.max(item.questions, item.replies)));

  return (
    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">
          Display the graphical representation of Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-green-700 space-y-2">
          <p className="font-medium">E.g.</p>
          <ul className="space-y-1 ml-4">
            <li>• Number of questions asked</li>
            <li>• Number of replied</li>
            <li>• Data group by category</li>
          </ul>
        </div>

        {/* Simple Bar Chart Visualization */}
        <div className="space-y-4 mt-6">
          <h4 className="font-semibold text-green-800">Category Overview</h4>
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-green-700">{item.category}</span>
                <span className="text-green-600">Q: {item.questions} | R: {item.replies}</span>
              </div>
              <div className="flex space-x-2">
                {/* Questions Bar */}
                <div className="flex-1">
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${(item.questions / maxValue) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-green-600 mt-1">Questions</div>
                </div>
                {/* Replies Bar */}
                <div className="flex-1">
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-700 rounded-full transition-all duration-500"
                      style={{ width: `${(item.replies / maxValue) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-green-600 mt-1">Replies</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">120</div>
            <div className="text-xs text-green-600">Total Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">103</div>
            <div className="text-xs text-green-600">Total Replies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">86%</div>
            <div className="text-xs text-green-600">Response Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
