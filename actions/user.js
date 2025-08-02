"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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

  console.log('User found:', { id: user.id, name: user.name });

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
          fileName: attachment.name,
          fileSize: attachment.size,
          mimeType: attachment.type,
          ticketId: ticket.id,
          uploadedById: user.id,
          // Note: You'll need to implement file storage and set the filePath
          filePath: `/uploads/${ticket.id}/${attachment.name}`, // Placeholder
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
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const ticket = await db.ticket.findFirst({
    where: {
      id: ticketId,
      creatorId: user.id, // Restrict access to only their own ticket
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignee: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      attachments: true,
      votes: true,
      notifications: true,
    },
  });

  return ticket;
}
