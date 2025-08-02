"use server"
import { db } from "@/lib/prisma";
import { subDays, subHours, subMinutes } from "date-fns";

const USER_ID = "2c7666fa-16cf-4f5c-a3e9-ce020dacf5c8";

// Sample data arrays for generating diverse content
const ticketSubjects = [
  "How to integrate AI tools in my development workflow?",
  "Best practices for hackathon preparation and team coordination",
  "Database migration strategy for large scale applications",
  "Implementing microservices architecture with Docker",
  "Git workflow optimization for distributed teams",
  "Performance bottlenecks in React applications",
  "Setting up CI/CD pipeline with GitHub Actions",
  "Security vulnerabilities in Node.js applications",
  "Choosing between SQL and NoSQL databases",
  "API rate limiting and caching strategies",
  "Mobile-first responsive design techniques",
  "Error handling patterns in async JavaScript",
  "Optimizing database queries for better performance",
  "User authentication with JWT vs Sessions",
  "Testing strategies for complex web applications",
  "Deployment strategies for serverless applications",
  "Code review best practices and tools",
  "Managing state in large React applications",
  "Docker containerization for development environments",
  "Monitoring and logging in production systems",
  "Cross-browser compatibility issues with CSS Grid",
  "Implementing real-time features with WebSockets",
  "Memory leaks in JavaScript applications",
  "Scaling databases for high traffic websites",
  "Progressive Web App development guidelines",
  "API versioning strategies and considerations",
  "Handling file uploads in web applications",
  "Implementing search functionality with Elasticsearch",
  "Debugging performance issues in mobile apps",
  "Setting up development environments with Vagrant"
];

const ticketDescriptions = [
  "I'm working on a project where I need to integrate multiple AI tools. What's the best approach to manage different APIs and handle rate limits effectively?",
  "Our team is preparing for an upcoming hackathon. What are the essential tools, frameworks, and strategies we should consider to maximize our productivity?",
  "We have a legacy database with millions of records that needs to be migrated to a new schema. What's the safest approach to handle this without downtime?",
  "I'm considering moving our monolithic application to microservices. What are the key architectural decisions and potential pitfalls I should be aware of?",
  "Our development team is growing and we need to optimize our Git workflow. What branching strategies work best for teams with 10+ developers?",
  "My React application is experiencing performance issues with large lists and complex state updates. What optimization techniques should I implement first?",
  "I want to set up automated testing and deployment for our web application. Can someone guide me through the essential steps for GitHub Actions?",
  "During a security audit, several vulnerabilities were found in our Node.js application. What are the most critical security practices I should implement?",
  "For our new project, we're debating between PostgreSQL and MongoDB. What factors should influence this decision for a content management system?",
  "Our API is experiencing high traffic and we need to implement rate limiting and caching. What's the most effective approach for Express.js applications?",
  "I'm struggling with responsive design on various devices. What are the current best practices for mobile-first design in 2024?",
  "My application has complex async operations and error handling is becoming messy. What patterns work best for managing errors in Promise chains?",
  "Our database queries are getting slower as data grows. What are the most effective techniques for query optimization and indexing strategies?",
  "I need to implement user authentication that's both secure and user-friendly. What are the pros and cons of JWT tokens versus traditional sessions?",
  "We're building a complex web application and need a comprehensive testing strategy. What types of tests should we prioritize and which tools work best?",
  "I'm exploring serverless deployment options for our application. What are the key considerations for choosing between AWS Lambda, Vercel, and Netlify?",
  "Our team wants to improve code quality through better review processes. What tools and practices make code reviews more effective and efficient?",
  "As our React application grows, state management is becoming challenging. When should we consider Redux vs Context API vs Zustand?",
  "I want to containerize our development environment to ensure consistency across team members. What's the best Docker setup for full-stack development?",
  "We need better visibility into our production system's health. What monitoring and logging solutions work well for Node.js applications?",
  "I'm having issues with CSS Grid layout inconsistencies across different browsers. What are the current compatibility considerations and fallback strategies?",
  "Our application needs real-time updates for multiple users. What's the most efficient way to implement WebSocket connections with proper error handling?",
  "I suspect there are memory leaks in our JavaScript application causing performance degradation. What tools and techniques can help identify and fix these issues?",
  "Our website is experiencing high traffic spikes and the database is becoming a bottleneck. What scaling strategies should we consider for PostgreSQL?",
  "I want to convert our web application into a Progressive Web App. What are the essential features and implementation steps for PWA development?",
  "We're planning to version our API to support multiple client applications. What's the best approach to handle backward compatibility and deprecation?",
  "Our application needs to handle large file uploads efficiently. What are the best practices for implementing secure and resumable file upload functionality?",
  "I need to implement search functionality that can handle complex queries and filters. How do I get started with Elasticsearch integration?",
  "Our mobile application is experiencing performance issues on older devices. What profiling tools and optimization techniques are most effective?",
  "I want to standardize development environments across our team. Is Vagrant still relevant in 2024, or are there better alternatives like Docker Dev Environments?"
];

const userNames = [
  "Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Emma Brown",
  "Frank Miller", "Grace Lee", "Henry Taylor", "Ivy Chen", "Jack Robinson",
  "Kate Anderson", "Liam Garcia", "Maya Patel", "Noah Martinez", "Olivia White",
  "Paul Thompson", "Quinn Rodriguez", "Ruby Kim", "Sam Williams", "Tara Singh",
  "Uma Gupta", "Victor Lopez", "Wendy Chang", "Xavier Torres", "Yasmin Ali",
  "Zoe Murphy", "Alex Foster", "Blake Rivera", "Chloe Cooper", "Derek Hall"
];

const companies = [
  "TechCorp Solutions", "Digital Innovations Inc", "CloudWorks Ltd", "DataSync Technologies",
  "NextGen Systems", "WebFlow Dynamics", "CodeCraft Studios", "ByteForge Labs",
  "PixelPerfect Design", "ServerSide Solutions", "API Gateway Corp", "DevOps Dynamics",
  "FullStack Ventures", "MobileFirst Technologies", "DatabasePro Services", "SecurityShield Inc",
  "ScaleUp Solutions", "CloudNative Systems", "AITech Innovations", "DataDriven Designs"
];

const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
const statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

// Helper function to get random item from array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Helper function to get random number in range
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random date within range
const getRandomDate = (daysAgo) => {
  const randomHours = getRandomNumber(0, daysAgo * 24);
  return subHours(new Date(), randomHours);
};

export async function seedTickets() {
  try {
    console.log("Starting ticket seeding process...");

    // First, ensure we have categories
    const categories = await db.category.findMany();
    if (categories.length === 0) {
      console.log("No categories found, creating default categories...");
      await seedCategories();
    }

    // Get updated categories
    const availableCategories = await db.category.findMany();
    console.log(`Found ${availableCategories.length} categories`);

    // Check if we have users to create tickets for
    let availableUsers = await db.user.findMany({
      select: { id: true, name: true }
    });

    if (availableUsers.length === 0) {
      console.log("No users found, creating sample users...");
      availableUsers = await seedUsers();
    }

    console.log(`Found ${availableUsers.length} users`);

    // Clear existing tickets (optional)
    await db.ticket.deleteMany({});
    await db.comment.deleteMany({});
    await db.vote.deleteMany({});
    await db.attachment.deleteMany({});

    console.log("Cleared existing ticket data");

    // Generate tickets
    const ticketsToCreate = [];
    const commentsToCreate = [];
    const votesToCreate = [];

    for (let i = 0; i < 50; i++) {
      const createdDate = getRandomDate(30); // Within last 30 days
      const status = getRandomItem(statuses);
      const priority = getRandomItem(priorities);
      const category = getRandomItem(availableCategories);
      const creator = getRandomItem(availableUsers);

      const ticketId = `ticket-${i + 1}`;
      
      // Set resolved/closed dates if applicable
      let resolvedAt = null;
      let closedAt = null;
      
      if (status === 'RESOLVED') {
        resolvedAt = new Date(createdDate.getTime() + getRandomNumber(1, 7) * 24 * 60 * 60 * 1000);
      } else if (status === 'CLOSED') {
        resolvedAt = new Date(createdDate.getTime() + getRandomNumber(1, 5) * 24 * 60 * 60 * 1000);
        closedAt = new Date(resolvedAt.getTime() + getRandomNumber(1, 3) * 24 * 60 * 60 * 1000);
      }

      const ticket = {
        id: ticketId,
        subject: getRandomItem(ticketSubjects),
        description: getRandomItem(ticketDescriptions),
        status,
        priority,
        createdAt: createdDate,
        updatedAt: createdDate,
        resolvedAt,
        closedAt,
        creatorId: creator.id,
        assigneeId: Math.random() > 0.7 ? getRandomItem(availableUsers).id : null,
        categoryId: category.id,
        viewCount: getRandomNumber(0, 150),
        upvotes: getRandomNumber(0, 25),
        downvotes: getRandomNumber(0, 8)
      };

      ticketsToCreate.push(ticket);

      // Generate comments for some tickets
      const commentCount = getRandomNumber(0, 8);
      for (let j = 0; j < commentCount; j++) {
        const commentDate = new Date(createdDate.getTime() + j * getRandomNumber(1, 48) * 60 * 60 * 1000);
        const author = getRandomItem(availableUsers);
        
        commentsToCreate.push({
          id: `comment-${i}-${j}`,
          content: `This is a helpful response to the ticket. ${getRandomItem([
            "I've faced a similar issue and found that using X approach works well.",
            "Have you tried implementing Y solution? It resolved the problem for our team.",
            "Here's a detailed explanation of how to handle this scenario effectively.",
            "I recommend checking the documentation for Z, it has excellent examples.",
            "This is a common issue, and the best practice is to follow the ABC pattern."
          ])}`,
          isInternal: Math.random() > 0.9,
          createdAt: commentDate,
          updatedAt: commentDate,
          ticketId: ticketId,
          authorId: author.id
        });
      }

      // Generate votes for tickets
      const voterCount = getRandomNumber(0, 12);
      const uniqueVoters = [...availableUsers].sort(() => 0.5 - Math.random()).slice(0, voterCount);
      
      uniqueVoters.forEach((voter, voteIndex) => {
        votesToCreate.push({
          id: `vote-${i}-${voteIndex}`,
          isUpvote: Math.random() > 0.3, // 70% upvotes, 30% downvotes
          createdAt: new Date(createdDate.getTime() + getRandomNumber(1, 72) * 60 * 60 * 1000),
          ticketId: ticketId,
          userId: voter.id
        });
      });
    }

    console.log(`Creating ${ticketsToCreate.length} tickets...`);

    // Create tickets in batches
    const batchSize = 10;
    for (let i = 0; i < ticketsToCreate.length; i += batchSize) {
      const batch = ticketsToCreate.slice(i, i + batchSize);
      await db.ticket.createMany({
        data: batch,
        skipDuplicates: true
      });
    }

    console.log(`Creating ${commentsToCreate.length} comments...`);

    // Create comments in batches
    for (let i = 0; i < commentsToCreate.length; i += batchSize) {
      const batch = commentsToCreate.slice(i, i + batchSize);
      await db.comment.createMany({
        data: batch,
        skipDuplicates: true
      });
    }

    console.log(`Creating ${votesToCreate.length} votes...`);

    // Create votes in batches
    for (let i = 0; i < votesToCreate.length; i += batchSize) {
      const batch = votesToCreate.slice(i, i + batchSize);
      await db.vote.createMany({
        data: batch,
        skipDuplicates: true
      });
    }

    return {
      success: true,
      message: "Successfully seeded ticket system with comprehensive data",
      data: {
        ticketsCreated: ticketsToCreate.length,
        commentsCreated: commentsToCreate.length,
        votesCreated: votesToCreate.length,
        usersAvailable: availableUsers.length,
        categoriesAvailable: availableCategories.length
      }
    };

  } catch (error) {
    console.error("Ticket seeding error:", error);
    return {
      success: false,
      message: "Failed to seed ticket data",
      error: error.message
    };
  }
}

export async function seedCategories() {
  try {
    const categories = [
      {
        name: 'Technical',
        description: 'Technical support and troubleshooting',
        color: '#3B82F6',
        isActive: true
      },
      {
        name: 'Development',
        description: 'Software development and programming questions',
        color: '#10B981',
        isActive: true
      },
      {
        name: 'Database',
        description: 'Database design, optimization, and management',
        color: '#8B5CF6',
        isActive: true
      },
      {
        name: 'DevOps',
        description: 'Deployment, CI/CD, and infrastructure',
        color: '#F59E0B',
        isActive: true
      },
      {
        name: 'Security',
        description: 'Application security and best practices',
        color: '#EF4444',
        isActive: true
      },
      {
        name: 'Performance',
        description: 'Optimization and performance tuning',
        color: '#06B6D4',
        isActive: true
      },
      {
        name: 'Testing',
        description: 'Testing strategies and quality assurance',
        color: '#84CC16',
        isActive: true
      },
      {
        name: 'General',
        description: 'General questions and discussions',
        color: '#6B7280',
        isActive: true
      }
    ];

    await db.category.createMany({
      data: categories,
      skipDuplicates: true
    });

    return categories;
  } catch (error) {
    console.error("Category seeding error:", error);
    throw error;
  }
}

export async function seedUsers() {
  try {
    const usersToCreate = [];

    for (let i = 0; i < 20; i++) {
      const name = getRandomItem(userNames);
      const email = `${name.toLowerCase().replace(' ', '.')}@${getRandomItem(companies).toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      
      usersToCreate.push({
        id: `user-${i + 1}`,
        clerkUserId: `clerk_user_${i + 1}_${Date.now()}`,
        name,
        email,
        role: i < 2 ? 'ADMIN' : i < 6 ? 'SUPPORT_AGENT' : 'END_USER',
        suspended: false,
        isActive: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
        emailNotifications: Math.random() > 0.3,
        createdAt: getRandomDate(60),
        updatedAt: getRandomDate(30)
      });
    }

    await db.user.createMany({
      data: usersToCreate,
      skipDuplicates: true
    });

    return await db.user.findMany({
      select: { id: true, name: true }
    });
  } catch (error) {
    console.error("User seeding error:", error);
    throw error;
  }
}

export async function seedAll() {
  try {
    console.log("Starting comprehensive seeding...");
    
    const results = {
      categories: await seedCategories(),
      users: await seedUsers(),
      tickets: await seedTickets()
    };

    return {
      success: true,
      message: "Successfully seeded all data",
      data: results
    };
  } catch (error) {
    console.error("Comprehensive seeding error:", error);
    return {
      success: false,
      message: "Failed to seed all data",
      error: error.message
    };
  }
}

// Keep the original seedLists function for backward compatibility
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