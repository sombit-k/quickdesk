"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export const columns = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("images")
      return (
        <img 
          src={imageUrl} 
          alt="List image" 
          className="w-16 h-12 object-cover rounded"
        />
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description")
      return (
        <div className="max-w-xs truncate">
          {description}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt")
      return formatDistanceToNow(new Date(date), { addSuffix: true })
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const list = row.original
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      )
    },
  },
]
