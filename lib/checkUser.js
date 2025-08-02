import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
// imp
  try {
    // Check if user already exists in database
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      // Update user info if it has changed in Clerk
      const updatedName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User';
      const updatedEmail = user.emailAddresses[0]?.emailAddress;
      const updatedAvatar = user.imageUrl || null;

      if (
        loggedInUser.name !== updatedName ||
        loggedInUser.email !== updatedEmail ||
        loggedInUser.avatar !== updatedAvatar
      ) {
        const updatedUser = await db.user.update({
          where: {
            clerkUserId: user.id,
          },
          data: {
            name: updatedName,
            email: updatedEmail,
            avatar: updatedAvatar,
          },
        });
        return updatedUser;
      }

      return loggedInUser;
    }

    // Create new user if doesn't exist
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User';
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error('User email is required but not provided by Clerk');
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        email,
        avatar: user.imageUrl || null,
        role: 'END_USER', // Default role as per schema
        suspended: false,
        isActive: true,
        emailNotifications: true,
      },
    });

    return newUser;
  } catch (error) {
    console.error('Error in checkUser:', error.message);
    throw error;
  }
};
