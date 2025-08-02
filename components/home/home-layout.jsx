"use client";

import { HomeHeader } from "./home-header";
import { FilterSection } from "./filter-section";
import { SearchBar } from "./search-bar";
import { QuestionCard } from "./question-card";
import { Pagination } from "./pagination";

// Dummy data for questions
const dummyQuestions = [
  {
    id: 1,
    title: "Is it good things to use AI for hackathon?",
    tags: ["AI", "Technical", "AI"],
    author: "odoo 3M pvt. ltd.",
    timeAgo: "Posted by odoo 3M pvt. ltd.",
    upvotes: 15,
    downvotes: 2,
    replies: 21,
    rating: 4,
    canClose: true
  },
  {
    id: 2,
    title: "Is it good things to use AI for hackathon?",
    tags: ["AI", "Technical"],
    author: "odoo 3M pvt. ltd.",
    timeAgo: "Posted by odoo 3M pvt. ltd.",
    upvotes: 8,
    downvotes: 1,
    replies: 13,
    rating: 5,
    canClose: false
  },
  {
    id: 3,
    title: "Is it good things to use AI for hackathon?",
    tags: ["AI", "Technical"],
    author: "odoo 3M pvt. ltd.",
    timeAgo: "Posted by odoo 3M pvt. ltd.",
    upvotes: 12,
    downvotes: 0,
    replies: 8,
    rating: 4,
    canClose: true
  }
];

export function HomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HomeHeader />
      
      {/* Filter Section */}
      <FilterSection />
      
      {/* Search Bar */}
      <SearchBar />
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Too Describing Categories Notice */}
        <div className="mb-4">
          <span className="text-sm text-gray-600 italic">
            Too Describing the categories
          </span>
        </div>

        {/* Questions List */}
        <div className="space-y-4 mb-8">
          {dummyQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={1} totalPages={11} />
      </div>

      {/* Add margin at bottom to prevent footer overlap */}
      <div className="h-16"></div>
    </div>
  );
}
