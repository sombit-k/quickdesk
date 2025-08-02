"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { IconBell, IconSearch, IconChevronLeft, IconChevronRight, IconLoader2 } from "@tabler/icons-react";
import { getAllTickets, getCategories } from '@/actions/user';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Data states
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load categories:', err);
        toast.error('Failed to load categories');
      }
    };
    loadCategories();
  }, []);

  // Load tickets whenever filters change
  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const filters = {
          search: searchQuery,
          category: selectedCategory,
          status: selectedStatus,
          sortBy: sortBy,
          showOpenOnly: showOpenOnly,
          page: currentPage,
          limit: 10
        };
        
        const result = await getAllTickets(filters);
        setTickets(result.tickets);
        setPagination(result.pagination);
        setError(null);
      } catch (err) {
        console.error('Failed to load tickets:', err);
        setError('Failed to load tickets');
        toast.error('Failed to load tickets', {
          description: err.message || 'Something went wrong. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [searchQuery, selectedCategory, selectedStatus, sortBy, showOpenOnly, currentPage]);

  // Handle search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1); // Reset to first page when search changes
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage]);

  const handleAskQuestion = () => {
    router.push('/ask');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      case 'in_progress':
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

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-blue-500 text-white';
      case 'low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white p-6 mt-20">
      <div className="max-w-4xl mx-auto">

        {/* Filters Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="open-only" 
                checked={showOpenOnly}
                onCheckedChange={(checked) => {
                  setShowOpenOnly(checked);
                  setCurrentPage(1);
                }}
              />
              <label htmlFor="open-only" className="text-black text-sm">
                Show open only
              </label>
            </div>
            
            <Select 
              value={selectedCategory} 
              onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-40 bg-white border-gray-300 text-black">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name.toLowerCase()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={selectedStatus} 
              onValueChange={(value) => {
                setSelectedStatus(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-32 bg-white border-gray-300 text-black">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Sort by:</span>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="recent" 
                  checked={sortBy === 'recent'}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSortBy('recent');
                      setCurrentPage(1);
                    }
                  }}
                />
                <label htmlFor="recent" className="text-gray-600 cursor-pointer">Most recent</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="upvoted" 
                  checked={sortBy === 'mostUpvoted'}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSortBy('mostUpvoted');
                      setCurrentPage(1);
                    }
                  }}
                />
                <label htmlFor="upvoted" className="text-gray-600 cursor-pointer">Most upvoted</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="viewed" 
                  checked={sortBy === 'mostViewed'}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSortBy('mostViewed');
                      setCurrentPage(1);
                    }
                  }}
                />
                <label htmlFor="viewed" className="text-gray-600 cursor-pointer">Most viewed</label>
              </div>
            </div>

            <div className="ml-auto text-green-600 text-sm">
              {loading ? 'Loading...' : `${pagination.totalCount} tickets found`}
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
            <Button 
              onClick={handleAskQuestion}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap font-medium"
            >
              <span className="mr-2">+</span>
              Ask Question
            </Button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 mb-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <IconLoader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-blue-600 font-medium">Loading tickets...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Error Loading Tickets
                  </h3>
                  <p className="text-red-600">
                    {error}
                  </p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-20">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    No Tickets Found
                  </h3>
                  <p className="text-blue-600 mb-4">
                    {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || showOpenOnly
                      ? 'No tickets match your current filters. Try adjusting your search criteria.'
                      : 'No tickets have been created yet. Be the first to ask a question!'}
                  </p>
                  <Button 
                    onClick={handleAskQuestion}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Ask First Question
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            tickets.map((ticket) => (
              <Link key={ticket.id} href={`/ticket/${ticket.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Vote Section */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-black text-sm font-bold">
                          {ticket.upvotes - ticket.downvotes}
                        </div>
                        <div className="text-xs text-gray-500">votes</div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge 
                            variant="secondary" 
                            className="text-white"
                            style={{ backgroundColor: ticket.category?.color || '#10B981' }}
                          >
                            {ticket.category?.name || 'No Category'}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          {/* Ticket Status */}
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${getStatusStyle(ticket.status).bgColor} ${getStatusStyle(ticket.status).textColor} ${getStatusStyle(ticket.status).borderColor}`}>
                            <div className={`w-2 h-2 rounded-full ${getStatusStyle(ticket.status).dotColor}`}></div>
                            <span className="text-xs font-medium">
                              {ticket.status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-black font-medium mb-2 hover:text-blue-600 transition-colors">
                          {ticket.subject}
                        </h3>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <p className="line-clamp-2">{ticket.description}</p>
                        </div>
                        
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span>Posted by {ticket.creator?.name || 'Unknown User'}</span>
                          <span>•</span>
                          <span>{formatDate(ticket.createdAt)}</span>
                          <span>•</span>
                          <span>{ticket.viewCount || 0} views</span>
                        </div>
                      </div>

                      {/* Replies Count */}
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                          {ticket._count?.comments || 0}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 text-center">
                          replies
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && tickets.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevious}
            >
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="sm"
                  className={currentPage === pageNum ? "bg-gray-800 text-white" : "text-gray-600"}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}

            {pagination.totalPages > 5 && currentPage < pagination.totalPages - 2 && (
              <>
                <span className="text-gray-600">...</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600"
                  onClick={() => handlePageChange(pagination.totalPages)}
                >
                  {pagination.totalPages}
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNext}
            >
              <IconChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

      
      </div>
      
      <Toaster 
        position="top-right" 
        expand={false}
        richColors
        closeButton
      />
    </div>
  );
};

export default HomePage;
