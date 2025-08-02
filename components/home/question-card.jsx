"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, MessageCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function QuestionCard({ question }) {
  const [upvotes, setUpvotes] = useState(question.upvotes || 0);
  const [downvotes, setDownvotes] = useState(question.downvotes || 0);
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null

  const handleUpvote = () => {
    if (userVote === 'up') {
      setUpvotes(upvotes - 1);
      setUserVote(null);
    } else {
      if (userVote === 'down') {
        setDownvotes(downvotes - 1);
      }
      setUpvotes(upvotes + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setDownvotes(downvotes - 1);
      setUserVote(null);
    } else {
      if (userVote === 'up') {
        setUpvotes(upvotes - 1);
      }
      setDownvotes(downvotes + 1);
      setUserVote('down');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Voting Section */}
        <div className="flex flex-col items-center space-y-1 min-w-[60px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpvote}
            className={`p-1 h-8 w-8 rounded-full ${
              userVote === 'up' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'
            }`}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-semibold">{upvotes}</div>
            <div className="text-xs text-gray-500">votes</div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownvote}
            className={`p-1 h-8 w-8 rounded-full ${
              userVote === 'down' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Question Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {question.title}
              </h3>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {question.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`text-xs ${
                      tag === 'Technical' ? 'bg-blue-100 text-blue-700' :
                      tag === 'AI' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Meta Information */}
              <div className="text-sm text-gray-500">
                Posted by {question.author} {question.timeAgo}
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center space-x-1 ml-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < question.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">{question.rating}</span>
            </div>
          </div>
        </div>

        {/* Conversation Count */}
        <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{question.replies || 0}</span>
        </div>
      </div>

      {/* Close Option for Owner */}
      {question.canClose && (
        <div className="mt-3 text-right">
          <span className="text-xs text-gray-500 italic">
            Owner can close the question if he/she get satisfied answer.
          </span>
        </div>
      )}
    </div>
  );
}
