import { db } from "@/lib/prisma";
import { subDays, subHours, subMinutes } from "date-fns";

// Extended sample data for more diversity
const techTopics = [
  "Machine Learning", "Blockchain", "Cloud Computing", "Cybersecurity", "IoT",
  "Artificial Intelligence", "Data Science", "Mobile Development", "Web3",
  "Quantum Computing", "Edge Computing", "Serverless", "Microservices"
];

const problemTypes = [
  "How to", "Best practices for", "Troubleshooting", "Implementation of",
  "Optimization of", "Debugging", "Configuration of", "Integration with",
  "Migrating from", "Scaling", "Security concerns with", "Performance issues in"
];

const technologies = [
  "React", "Node.js", "Python", "Docker", "AWS", "PostgreSQL", "MongoDB",
  "GraphQL", "TypeScript", "Kubernetes", "Redis", "Elasticsearch", "Firebase",
  "Next.js", "Django", "Express.js", "Vue.js", "Angular", "Spring Boot",
  "Laravel", "Ruby on Rails", "Go", "Rust", "Swift", "Kotlin"
];

const businessDomains = [
  "e-commerce", "fintech", "healthcare", "education", "logistics",
  "social media", "gaming", "streaming", "marketplace", "SaaS",
  "enterprise", "startup", "agency", "consulting"
];

function generateDynamicSubject() {
  const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
  const technology = technologies[Math.floor(Math.random() * technologies.length)];
  const topic = techTopics[Math.floor(Math.random() * techTopics.length)];
  const domain = businessDomains[Math.floor(Math.random() * businessDomains.length)];
  
  const templates = [
    `${problemType} ${technology} in ${domain} applications`,
    `${problemType} ${topic} with ${technology}`,
    `${technology} ${problemType.toLowerCase()} for ${domain} platform`,
    `${topic} implementation using ${technology} - need guidance`,
    `${problemType} ${technology} integration for ${domain} solution`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateDynamicDescription() {
  const technology = technologies[Math.floor(Math.random() * technologies.length)];
  const domain = businessDomains[Math.floor(Math.random() * businessDomains.length)];
  const topic = techTopics[Math.floor(Math.random() * techTopics.length)];
  
  const contexts = [
    `I'm working on a ${domain} project using ${technology}`,
    `Our team is building a ${domain} platform with ${technology}`,
    `We're migrating our ${domain} system to ${technology}`,
    `I'm implementing ${topic} features in our ${technology} application`,
    `Our ${domain} startup needs to integrate ${technology}`
  ];
  
  const problems = [
    "and encountering performance bottlenecks that need optimization.",
    "but facing scalability challenges as user base grows rapidly.",
    "and struggling with complex state management patterns.",
    "but running into security vulnerabilities during testing.",
    "and need guidance on best architectural decisions.",
    "but experiencing memory leaks in production environment.",
    "and having trouble with database query optimization.",
    "but facing deployment issues with our current setup.",
    "and need help with proper error handling strategies.",
    "but struggling with cross-platform compatibility issues."
  ];
  
  const questions = [
    "What are the recommended approaches and potential pitfalls to avoid?",
    "Has anyone implemented similar solutions? What patterns worked best?",
    "What tools, libraries, or services would you recommend for this use case?",
    "Are there any specific optimization techniques that have proven effective?",
    "What are the current industry standards and best practices for this scenario?"
  ];
  
  const context = contexts[Math.floor(Math.random() * contexts.length)];
  const problem = problems[Math.floor(Math.random() * problems.length)];
  const question = questions[Math.floor(Math.random() * questions.length)];
  
  return `${context} ${problem} ${question}`;
}

export async function POST(request) {
  try {
    const { count = 25, includeVotes = true, includeComments = true } = await request.json();
    
    // Get existing data
    const [categories, users] = await Promise.all([
      db.category.findMany(),
      db.user.findMany({ select: { id: true, name: true, role: true } })
    ]);
    
    if (categories.length === 0 || users.length === 0) {
      return Response.json({
        success: false,
        message: "Categories or users not found. Please seed basic data first."
      });
    }
    
    const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
    const statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
    
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomDate = (daysAgo) => {
      const randomHours = getRandomNumber(0, daysAgo * 24);
      return subHours(new Date(), randomHours);
    };
    
    const ticketsData = [];
    const commentsData = [];
    const votesData = [];
    
    for (let i = 0; i < count; i++) {
      const ticketId = `gen_ticket_${Date.now()}_${i}`;
      const createdDate = getRandomDate(45);
      const status = getRandomItem(statuses);
      const creator = getRandomItem(users);
      const category = getRandomItem(categories);
      
      // Generate realistic resolved/closed dates
      let resolvedAt = null;
      let closedAt = null;
      let assigneeId = null;
      
      if (status === 'IN_PROGRESS' || status === 'RESOLVED' || status === 'CLOSED') {
        const supportAgents = users.filter(u => u.role === 'SUPPORT_AGENT' || u.role === 'ADMIN');
        if (supportAgents.length > 0) {
          assigneeId = getRandomItem(supportAgents).id;
        }
      }
      
      if (status === 'RESOLVED' || status === 'CLOSED') {
        resolvedAt = new Date(createdDate.getTime() + getRandomNumber(1, 10) * 24 * 60 * 60 * 1000);
      }
      
      if (status === 'CLOSED') {
        closedAt = new Date(resolvedAt.getTime() + getRandomNumber(1, 5) * 24 * 60 * 60 * 1000);
      }
      
      const upvotes = getRandomNumber(0, 30);
      const downvotes = getRandomNumber(0, Math.max(5, Math.floor(upvotes * 0.3)));
      
      const ticket = {
        id: ticketId,
        subject: generateDynamicSubject(),
        description: generateDynamicDescription(),
        status,
        priority: getRandomItem(priorities),
        createdAt: createdDate,
        updatedAt: resolvedAt || createdDate,
        resolvedAt,
        closedAt,
        creatorId: creator.id,
        assigneeId,
        categoryId: category.id,
        viewCount: getRandomNumber(1, 200),
        upvotes,
        downvotes
      };
      
      ticketsData.push(ticket);
      
      // Generate comments if requested
      if (includeComments) {
        const commentCount = getRandomNumber(0, Math.min(8, Math.floor(upvotes / 3)));
        
        for (let j = 0; j < commentCount; j++) {
          const commentDate = new Date(
            createdDate.getTime() + 
            j * getRandomNumber(2, 48) * 60 * 60 * 1000
          );
          
          const supportResponses = [
            "Thanks for reaching out! This is a common issue. Here's a detailed solution that should resolve your problem step by step.",
            "I've encountered this before. The root cause is usually related to configuration. Try checking your environment variables and database connections.",
            "Great question! For this specific use case, I'd recommend following the industry standard approach with some customizations for your setup.",
            "This requires a multi-step solution. First, ensure your dependencies are up to date, then implement the following pattern in your codebase.",
            "I see what's happening here. The issue stems from how the framework handles this particular scenario. Here's the recommended workaround."
          ];
          
          const userFollowUps = [
            "This is really helpful! I tried the suggested approach and it's working much better now. Thanks for the detailed explanation.",
            "I implemented the solution and it resolved most of the issues. However, I'm still seeing some edge cases. Any thoughts on handling those?",
            "Perfect! This is exactly what I was looking for. The performance improvement is significant after applying these changes.",
            "Thanks for the guidance! I had to make some adjustments for our specific setup, but the core approach worked perfectly.",
            "This solution saved me hours of debugging. Really appreciate the community support here!"
          ];
          
          const author = Math.random() > 0.6 ? 
            getRandomItem(users.filter(u => u.role === 'SUPPORT_AGENT' || u.role === 'ADMIN')) || getRandomItem(users) :
            getRandomItem(users);
          
          const isSupport = author.role === 'SUPPORT_AGENT' || author.role === 'ADMIN';
          const responses = isSupport ? supportResponses : userFollowUps;
          
          commentsData.push({
            id: `gen_comment_${ticketId}_${j}`,
            content: getRandomItem(responses),
            isInternal: Math.random() > 0.95,
            createdAt: commentDate,
            updatedAt: commentDate,
            ticketId,
            authorId: author.id
          });
        }
      }
      
      // Generate votes if requested
      if (includeVotes) {
        const voterCount = Math.min(upvotes + downvotes, users.length);
        const voters = [...users].sort(() => 0.5 - Math.random()).slice(0, voterCount);
        
        let upvoteCount = 0;
        
        voters.forEach((voter, index) => {
          const shouldUpvote = upvoteCount < upvotes;
          if (shouldUpvote) upvoteCount++;
          
          votesData.push({
            id: `gen_vote_${ticketId}_${index}`,
            isUpvote: shouldUpvote,
            createdAt: new Date(createdDate.getTime() + getRandomNumber(1, 72) * 60 * 60 * 1000),
            ticketId,
            userId: voter.id
          });
        });
      }
    }
    
    // Create data in batches
    const batchSize = 10;
    
    // Create tickets
    for (let i = 0; i < ticketsData.length; i += batchSize) {
      const batch = ticketsData.slice(i, i + batchSize);
      await db.ticket.createMany({
        data: batch,
        skipDuplicates: true
      });
    }
    
    // Create comments
    if (commentsData.length > 0) {
      for (let i = 0; i < commentsData.length; i += batchSize) {
        const batch = commentsData.slice(i, i + batchSize);
        await db.comment.createMany({
          data: batch,
          skipDuplicates: true
        });
      }
    }
    
    // Create votes
    if (votesData.length > 0) {
      for (let i = 0; i < votesData.length; i += batchSize) {
        const batch = votesData.slice(i, i + batchSize);
        await db.vote.createMany({
          data: batch,
          skipDuplicates: true
        });
      }
    }
    
    return Response.json({
      success: true,
      message: `Successfully generated ${count} diverse tickets with realistic data`,
      data: {
        ticketsCreated: ticketsData.length,
        commentsCreated: commentsData.length,
        votesCreated: votesData.length,
        averageVotesPerTicket: Math.round(votesData.length / ticketsData.length),
        averageCommentsPerTicket: Math.round(commentsData.length / ticketsData.length)
      }
    });
    
  } catch (error) {
    console.error('Dynamic generation error:', error);
    return Response.json({
      success: false,
      message: 'Failed to generate dynamic ticket data',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    message: "Dynamic ticket generation endpoint",
    usage: {
      method: "POST",
      body: {
        count: "number (default: 25) - Number of tickets to generate",
        includeVotes: "boolean (default: true) - Include vote generation",
        includeComments: "boolean (default: true) - Include comment generation"
      },
      example: {
        count: 50,
        includeVotes: true,
        includeComments: true
      }
    }
  });
}
