"use server"
import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

const USER_ID = "2c7666fa-16cf-4f5c-a3e9-ce020dacf5c8";

export async function seedLists() {
  try {
    // Sample list data using the provided USER_ID
    const sampleLists = [
      {
        title: "Software Development Lifecycle",
        description: "Complete guide to SDLC phases and methodologies for modern software development",
        images: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: subDays(new Date(), 5)
      },
      {
        title: "Agile Project Management",
        description: "Essential tools and techniques for managing agile software projects effectively",
        images: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: subDays(new Date(), 3)
      },
      {
        title: "DevOps Best Practices",
        description: "CI/CD pipelines, containerization, and automation strategies for modern development",
        images: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: subDays(new Date(), 7)
      },
      {
        title: "Database Design Patterns",
        description: "Comprehensive guide to relational and NoSQL database design principles",
        images: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: subDays(new Date(), 2)
      },
      {
        title: "API Development Guide",
        description: "RESTful APIs, GraphQL, and microservices architecture patterns",
        images: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: subDays(new Date(), 1)
      },
      {
        title: "Testing Strategies",
        description: "Unit testing, integration testing, and test-driven development approaches",
        images: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: subDays(new Date(), 4)
      },
      {
        title: "Security Implementation",
        description: "Application security, authentication, authorization, and data protection",
        images: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: subDays(new Date(), 6)
      },
      {
        title: "Performance Optimization",
        description: "Code optimization, caching strategies, and scalability techniques",
        images: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        userId: USER_ID,
        createdAt: new Date()
      }
    ];

    // Clear existing lists (optional - remove if you want to keep existing data)
    await db.list.deleteMany({});

    // Create sample lists
    const createdLists = await db.list.createMany({
      data: sampleLists
    });

    return {
      success: true,
      message: `Successfully seeded ${createdLists.count} lists for user ${USER_ID}`,
      data: {
        listsCreated: createdLists.count,
        userId: USER_ID
      }
    };

  } catch (error) {
    console.error("Seeding error:", error);
    return {
      success: false,
      message: "Failed to seed database",
      error: error.message
    };
  }
}