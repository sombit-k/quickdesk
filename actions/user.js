"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createTicket(data) {
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
  const ticket = await db.ticket.create({
    data: {
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      categoryId: data.categoryId,
      creatorId: user.id,
    },
  });
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
