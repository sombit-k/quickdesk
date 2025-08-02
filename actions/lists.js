"use server"

//this file is used to handle server-side actions related to lists
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
export async function fetchListingsByUserId() {

    const { userId } = await auth();
    // console.log("User ID:", userId);
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    try {
        const listings = await db.list.findMany({
            where: {
                userId: user.id
            }
        });
        console.log("Fetched listings:", listings);
        return {
            success: true,
            data: listings
        };
    } catch (error) {
        console.error("Error fetching listings:", error);
        return {
            success: false,
            message: "Failed to fetch listings",
            error: error.message
        };
    }
}