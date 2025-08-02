"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, ChevronDown } from "lucide-react";

export function FilterSection() {
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Show open only checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="openOnly"
            checked={showOpenOnly}
            onChange={(e) => setShowOpenOnly(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="openOnly" className="text-sm text-gray-700">
            Show open only
          </label>
        </div>

        {/* Categories Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Categories:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="account">Account</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Status:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Sort by:</span>
          <div className="flex items-center space-x-1">
            <input type="radio" id="mostComment" name="sort" defaultChecked className="text-sm" />
            <label htmlFor="mostComment" className="text-sm text-gray-700">Most comment</label>
          </div>
          <div className="flex items-center space-x-1">
            <input type="radio" id="mostUpvote" name="sort" className="text-sm" />
            <label htmlFor="mostUpvote" className="text-sm text-gray-700">Most upvote</label>
          </div>
        </div>

        {/* Add Filter & Search text */}
        <div className="ml-auto text-sm text-green-600 font-medium">
          Add appropriate filter & search
        </div>
      </div>
    </div>
  );
}
