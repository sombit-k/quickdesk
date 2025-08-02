"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { IconBell, IconSearch, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const dummyQuestions = [
  {
    id: 1,
    title: "Is it good things to use AI for hackathon?",
    author: "odoo 10 pvt. ltd.",
    replies: 21,
    category: "Technical",
    status: "AI",
    ticketStatus: "Open",
    rating: 4
  },
  {
    id: 2,
    title: "Is it good things to use AI for hackathon?",
    author: "odoo 10 pvt. ltd.",
    replies: 21,
    category: "Technical",
    status: "AI",
    ticketStatus: "In Progress",
    rating: 5
  },
  {
    id: 3,
    title: "Is it good things to use AI for hackathon?",
    author: "odoo 10 pvt. ltd.",
    replies: 21,
    category: "Technical", 
    status: "AI",
    ticketStatus: "Resolved",
    rating: 3
  }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  // Helper function to get status styling
  const getStatusStyle = (ticketStatus) => {
    switch (ticketStatus.toLowerCase()) {
      case 'open':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-300',
          dotColor: 'bg-yellow-500'
        };
      case 'in progress':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-300',
          dotColor: 'bg-blue-500'
        };
      case 'resolved':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-300',
          dotColor: 'bg-green-500'
        };
      case 'closed':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-300',
          dotColor: 'bg-gray-500'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-300',
          dotColor: 'bg-gray-500'
        };
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 mt-40">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">By default On</div>
          <div className="flex items-center gap-4">
            <IconBell className="h-5 w-5 text-gray-600" />
            <Button variant="outline" className="text-black border-gray-300">
              Dashboard
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Admin
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Checkbox id="open-only" />
            <label htmlFor="open-only" className="text-black text-sm">
              Show open only
            </label>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-white border-gray-300 text-black">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32 bg-white border-gray-300 text-black">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <div className="flex gap-1">
                <Checkbox id="recent" />
                <label htmlFor="recent" className="text-gray-600">Most recent</label>
              </div>
              <div className="flex gap-1">
                <Checkbox id="upvoted" />
                <label htmlFor="upvoted" className="text-gray-600">Most upvoted</label>
              </div>
            </div>

            <div className="ml-auto text-green-600 text-sm">
              Add appropriate filter & search
            </div>
          </div>

          {/* Search Bar and Ask Button */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search questions, topics, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-gray-300 text-black pl-10 pr-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            
            {/* Ask Button */}
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap font-medium">
              <span className="mr-2">+</span>
              Ask Question
            </Button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 mb-6">
          {dummyQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-black text-sm font-bold">
                      {question.rating}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        {question.category}
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-600">
                        {question.status}
                      </Badge>
                      {/* Ticket Status */}
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${getStatusStyle(question.ticketStatus).bgColor} ${getStatusStyle(question.ticketStatus).textColor} ${getStatusStyle(question.ticketStatus).borderColor}`}>
                        <div className={`w-2 h-2 rounded-full ${getStatusStyle(question.ticketStatus).dotColor}`}></div>
                        <span className="text-xs font-medium">{question.ticketStatus}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-black font-medium mb-2">
                      {question.title}
                    </h3>
                    
                    <div className="text-sm text-gray-600">
                      Posted by {question.author}
                    </div>
                  </div>

                  {/* Replies Count */}
                  <div className="flex flex-col items-center">
                    <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                      {question.replies}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Number of conversation
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant={currentPage === 1 ? "default" : "ghost"}
            size="sm"
            className={currentPage === 1 ? "bg-gray-800 text-white" : "text-gray-600"}
          >
            1
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600">
            2
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600">
            3
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600">
            4
          </Button>
          
          <span className="text-gray-600">...</span>
          
          <Button variant="ghost" size="sm" className="text-gray-600">
            31
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600">
            <IconChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Bottom Note */}
        <div className="text-center text-sm text-gray-600 mt-6">
          Owner can close the question if he/she get satisfied answer.
        </div>
      </div>
    </div>
  );
};

export default HomePage;
