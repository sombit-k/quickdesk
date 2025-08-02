"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  ChevronUp, 
  ChevronDown, 
  MessageCircle, 
  Share, 
  Clock, 
  User, 
  Tag,
  Star,
  BookmarkPlus,
  Send,
  Sparkles,
  ExternalLink,
  Shield,
  Eye
} from "lucide-react";

const TicketDetailPage = () => {
  const params = useParams();
  const ticketId = params.id;
  
  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
  const [reply, setReply] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Dummy ticket data - replace with actual API call
  const ticketData = {
    id: ticketId,
    title: "Is it good things to use AI for hackathon?",
    content: "I am participating in odoo IN hackathon - 2025",
    author: {
      name: "Mitchell Admin",
      avatar: "/api/placeholder/40/40",
      initials: "MA",
      timeAgo: "1 second ago"
    },
    category: "Development",
    tags: ["AI", "Hackathon", "Development"],
    status: "Open",
    priority: "Medium",
    votes: 0,
    replies: 0,
    views: 142,
    createdAt: "2025-08-02T10:30:00Z"
  };

  const handleVote = (type) => {
    if (userVote === type) {
      // Remove vote
      setUserVote(null);
      setVotes(prev => type === 'up' ? prev - 1 : prev + 1);
    } else {
      // Add or change vote
      const oldVote = userVote;
      setUserVote(type);
      
      if (oldVote === null) {
        setVotes(prev => type === 'up' ? prev + 1 : prev - 1);
      } else {
        setVotes(prev => type === 'up' ? prev + 2 : prev - 2);
      }
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      // Handle reply submission
      console.log('Reply submitted:', reply);
      setReply('');
    }
  };

  const handleShare = () => {
    // Create shareable link
    const shareUrl = `${window.location.origin}/ticket/${ticketId}`;
    navigator.clipboard.writeText(shareUrl);
    // Show toast notification
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100 p-6">
      <div className="max-w-4xl mx-auto mt-8">
        {/* Header with Ticket Info */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ticket #{ticketId}
            </h1>
            <Badge className={`${getStatusColor(ticketData.status)} border`}>
              {ticketData.status}
            </Badge>
            <Badge className={`${getPriorityColor(ticketData.priority)} border`}>
              {ticketData.priority}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-blue-600">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{ticketData.views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{ticketData.replies} replies</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Created {new Date(ticketData.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-sm border-blue-200 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100/80 to-indigo-100/80 border-b border-blue-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                    {ticketData.title}
                  </CardTitle>
                  
                  {/* Category and Tags */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                      {ticketData.category}
                    </Badge>
                    {ticketData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-blue-200">
                      <AvatarImage src={ticketData.author.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-800 font-semibold">
                        {ticketData.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{ticketData.author.name}</p>
                      <p className="text-sm text-blue-600">{ticketData.author.timeAgo}</p>
                    </div>
                  </div>
                </div>

                {/* Vote Section */}
                <div className="flex flex-col items-center gap-2 ml-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVote('up')}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      userVote === 'up' 
                        ? 'bg-green-500 text-white shadow-lg' 
                        : 'bg-white/70 text-blue-600 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <ChevronUp className="h-6 w-6" />
                  </motion.button>
                  
                  <div className="font-bold text-lg text-gray-900 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                    {votes}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVote('down')}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      userVote === 'down' 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-white/70 text-blue-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <ChevronDown className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Ticket Content */}
              <div className="prose prose-blue max-w-none mb-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {ticketData.content}
                </p>
              </div>

              <Separator className="my-6 bg-blue-200" />

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`border-blue-300 hover:bg-blue-50 ${
                        isBookmarked ? 'bg-blue-100 text-blue-700' : 'text-blue-600'
                      }`}
                    >
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </motion.div>
                </div>

                {/* Admin/Support Actions */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50">
                    <Shield className="h-3 w-3 mr-1" />
                    Visible to Support Agent or Admin
                  </Badge>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Create Public Link
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* No Answers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <MessageCircle className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                There are no answers yet
              </h3>
              <p className="text-blue-600">
                Be the first to answer this question
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reply Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
              <CardTitle className="text-blue-800">Post Your Reply</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleReplySubmit} className="space-y-4">
                <Textarea
                  placeholder="Write your answer here... Be detailed and helpful!"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="min-h-[120px] bg-white/70 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                  required
                />
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-600">
                    Your reply will help resolve this ticket
                  </p>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </motion.div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related/Similar Tickets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-white/50 backdrop-blur-sm border-blue-200">
            <CardContent className="p-6">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Similar Questions
              </h4>
              <div className="space-y-2 text-sm text-blue-600">
                <div className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>How to integrate AI tools in development workflow?</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Best practices for hackathon preparation</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Using machine learning in competitive programming</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
