"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function testDatabaseConnection() {
  try {
    const result = await db.$queryRaw`SELECT 1 as test`;
    return { success: true, result };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return { success: false, error: error.message };
  }
}

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        color: true,
      },
      orderBy: { name: 'asc' },
    });

    // If no categories exist, create default ones
    if (categories.length === 0) {
      const defaultCategories = [
        { name: 'Technical', description: 'Technical support and troubleshooting', color: '#3B82F6' },
        { name: 'Billing', description: 'Billing and payment related inquiries', color: '#8B5CF6' },
        { name: 'General', description: 'General questions and information', color: '#10B981' },
        { name: 'Account', description: 'Account management and settings', color: '#F59E0B' },
        { name: 'Support', description: 'Customer support requests', color: '#EF4444' },
      ];

      const createdCategories = [];
      for (const category of defaultCategories) {
        const created = await db.category.create({
          data: category,
          select: {
            id: true,
            name: true,
            description: true,
            color: true,
          },
        });
        createdCategories.push(created);
      }
      return createdCategories;
    }

    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function createTicket(data) {
  console.log('Creating ticket with data:', data);
  
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    throw new Error("Unauthorized - Please sign in to create a ticket");
  }
  
  // Find or create user in our database
  let user = await db.user.findUnique({
    where: { clerkUserId },
  });
  
  if (!user) {
    // If user doesn't exist in our database, we might need to create them
    // This could happen if they signed up but weren't automatically added to our DB
    throw new Error("User not found in database. Please contact support.");
  }

  console.log('User found:', { id: user.id, name: user.name });

  // Validate required fields
  if (!data.question || !data.question.trim()) {
    throw new Error("Question title is required");
  }
  if (!data.description || !data.description.trim()) {
    throw new Error("Description is required");
  }
  if (!data.category) {
    throw new Error("Category is required");
  }

  // Find category by name if provided
  let categoryId = data.categoryId;
  if (data.category && !categoryId) {
    const category = await db.category.findFirst({
      where: { 
        name: { 
          equals: data.category.charAt(0).toUpperCase() + data.category.slice(1).toLowerCase(), 
          mode: 'insensitive' 
        } 
      },
    });
    categoryId = category?.id;
    console.log('Category found:', category);
  }

  if (!categoryId) {
    throw new Error("Valid category is required");
  }

  const ticketData = {
    subject: data.question || data.subject,
    description: data.description,
    priority: data.priority || 'MEDIUM',
    categoryId: categoryId,
    creatorId: user.id,
  };

  console.log('Creating ticket with:', ticketData);

  const ticket = await db.ticket.create({
    data: ticketData,
  });

  console.log('Ticket created:', ticket);

  // Handle tags if provided
  if (data.tags && data.tags.trim()) {
    const tagNames = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    console.log('Tags to process:', tagNames);
    // Note: This assumes you have a Tag model and TicketTag junction table
    // If not implemented yet, this can be added later
  }

  // Handle attachments if provided
  if (data.attachments && data.attachments.length > 0) {
    console.log('Processing attachments:', data.attachments.length);
    const attachmentPromises = data.attachments.map(attachment => 
      db.attachment.create({
        data: {
          filename: `${Date.now()}_${attachment.name}`, // Add timestamp to avoid conflicts
          originalName: attachment.name,
          mimeType: attachment.type,
          size: attachment.size,
          url: `/uploads/${ticket.id}/${Date.now()}_${attachment.name}`, // Placeholder URL
          ticketId: ticket.id,
          uploadedById: user.id,
        },
      })
    );
    await Promise.all(attachmentPromises);
    console.log('Attachments created');
  }

  return ticket;
}

export async function getUserAllTickets() {
  const { userId: clerkUserId } = auth();
  if (!clerkUserId) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Fetch only tickets created by this user
  const tickets = await db.ticket.findMany({
    where: { creatorId: user.id },
    select: {
      id: true,
      subject: true,
      description: true,
      status: true,
      priority: true,
      createdAt: true,
      category: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return tickets;
}

export async function getTicketById(ticketId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  // Allow anyone to view tickets (remove creator restriction for public viewing)
  const ticket = await db.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
      assignee: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc", // Show oldest comments first
        },
      },
      attachments: {
        select: {
          id: true,
          filename: true,
          originalName: true,
          mimeType: true,
          size: true,
          url: true,
        },
      },
      votes: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
      notifications: true,
    },
  });

  // Increment view count
  if (ticket) {
    await db.ticket.update({
      where: { id: ticketId },
      data: { viewCount: { increment: 1 } },
    });
  }

  return ticket;
}

export async function voteOnTicket(ticketId, isUpvote) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    throw new Error("Unauthorized - Please sign in to vote");
  }
  
  const user = await db.user.findUnique({
    where: { clerkUserId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  try {
    // Check if user has already voted
    const existingVote = await db.vote.findUnique({
      where: {
        ticketId_userId: {
          ticketId: ticketId,
          userId: user.id,
        },
      },
    });

    if (existingVote) {
      if (existingVote.isUpvote === isUpvote) {
        // Remove vote if clicking the same vote
        await db.vote.delete({
          where: { id: existingVote.id },
        });
        
        // Update ticket vote counts
        await db.ticket.update({
          where: { id: ticketId },
          data: {
            upvotes: isUpvote ? { decrement: 1 } : undefined,
            downvotes: !isUpvote ? { decrement: 1 } : undefined,
          },
        });
        
        return { action: 'removed', vote: null };
      } else {
        // Change vote
        await db.vote.update({
          where: { id: existingVote.id },
          data: { isUpvote },
        });
        
        // Update ticket vote counts
        await db.ticket.update({
          where: { id: ticketId },
          data: {
            upvotes: isUpvote ? { increment: 1 } : { decrement: 1 },
            downvotes: !isUpvote ? { increment: 1 } : { decrement: 1 },
          },
        });
        
        return { action: 'changed', vote: isUpvote ? 'up' : 'down' };
      }
    } else {
      // Create new vote
      await db.vote.create({
        data: {
          ticketId,
          userId: user.id,
          isUpvote,
        },
      });
      
      // Update ticket vote counts
      await db.ticket.update({
        where: { id: ticketId },
        data: {
          upvotes: isUpvote ? { increment: 1 } : undefined,
          downvotes: !isUpvote ? { increment: 1 } : undefined,
        },
      });
      
      return { action: 'added', vote: isUpvote ? 'up' : 'down' };
    }
  } catch (error) {
    console.error('Error voting on ticket:', error);
    throw new Error('Failed to process vote');
  }
}

export async function replyToTicket(ticketId, content) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    throw new Error("Unauthorized - Please sign in to reply");
  }
  
  const user = await db.user.findUnique({
    where: { clerkUserId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  if (!content || !content.trim()) {
    throw new Error("Reply content is required");
  }

  try {
    const comment = await db.comment.create({
      data: {
        content: content.trim(),
        ticketId,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return comment;
  } catch (error) {
    console.error('Error creating reply:', error);
    throw new Error('Failed to create reply');
  }
}
