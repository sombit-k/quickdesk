"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function verifyAdmin() {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    return user?.role === "ADMIN";
  } catch (error) {
    console.error("Failed to verify admin:", error);
    return false;
  }
}

export async function getAllUsers() {
  try {
    //  fetch all users
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export async function suspendUser(userId, suspend) {
  await verifyAdmin();
  await prisma.user.update({
    where: { id: userId },
    data: { suspended: suspend },
  });

  revalidatePath("/admin/users");
}

export async function DeleteUser(userId) {
  await verifyAdmin();
  await prisma.user.delete({
    where: { id: userId },
  });
  revalidatePath("/admin/users");
}

export async function getAllTickets() {
  await verifyAdmin();
  const tickets = await prisma.ticket.findMany({
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
          email: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tickets;
}

export async function deleteTicket(ticketId) {
  await verifyAdmin();
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });
  revalidatePath("/admin/tickets");
}
