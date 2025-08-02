# QuickDesk Seeding System

This document describes the comprehensive seeding system for the QuickDesk application, designed to populate the database with realistic and diverse ticket data for testing and demonstration purposes.

## Available Endpoints

### 1. Basic Seeding: `/api/seed`

#### GET Request
```
GET /api/seed?type=[tickets|categories|users|lists|all]
```

**Parameters:**
- `type` (optional): Specifies what to seed
  - `tickets`: Seeds tickets with comments and votes
  - `categories`: Seeds support categories
  - `users`: Seeds sample users with different roles
  - `lists`: Seeds the original list data
  - `all` (default): Seeds everything

**Examples:**
```bash
# Seed everything
curl http://localhost:3000/api/seed

# Seed only tickets
curl http://localhost:3000/api/seed?type=tickets

# Seed only categories
curl http://localhost:3000/api/seed?type=categories
```

#### POST Request
```json
POST /api/seed
Content-Type: application/json

{
  "type": "tickets",
  "options": {}
}
```

### 2. Dynamic Generation: `/api/seed/generate`

#### POST Request
```json
POST /api/seed/generate
Content-Type: application/json

{
  "count": 25,
  "includeVotes": true,
  "includeComments": true
}
```

**Parameters:**
- `count` (default: 25): Number of tickets to generate
- `includeVotes` (default: true): Whether to generate votes
- `includeComments` (default: true): Whether to generate comments

**Examples:**
```bash
# Generate 50 tickets with all features
curl -X POST http://localhost:3000/api/seed/generate \
  -H "Content-Type: application/json" \
  -d '{"count": 50, "includeVotes": true, "includeComments": true}'

# Generate 10 tickets without votes
curl -X POST http://localhost:3000/api/seed/generate \
  -H "Content-Type: application/json" \
  -d '{"count": 10, "includeVotes": false, "includeComments": true}'
```

## Data Generated

### Users (20 sample users)
- **Roles**: 2 ADMIN, 4 SUPPORT_AGENT, 14 END_USER
- **Attributes**: Realistic names, emails, avatars, preferences
- **Diversity**: Various companies and backgrounds

### Categories (8 categories)
- Technical, Development, Database, DevOps, Security, Performance, Testing, General
- Each with unique colors and descriptions

### Tickets (50+ diverse tickets)
- **Subjects**: Dynamic generation using technology combinations
- **Descriptions**: Realistic problem scenarios and questions
- **Statuses**: Distributed across OPEN, IN_PROGRESS, RESOLVED, CLOSED
- **Priorities**: LOW, MEDIUM, HIGH, URGENT with realistic distribution
- **Dates**: Spread across last 30-45 days
- **Metrics**: View counts, vote counts with realistic patterns

### Comments (0-8 per ticket)
- **Support Responses**: Detailed, helpful answers from ADMIN/SUPPORT_AGENT users
- **User Follow-ups**: Thank you messages, additional questions, confirmations
- **Timing**: Realistic response times and conversation flows

### Votes (0-30 per ticket)
- **Distribution**: 70% upvotes, 30% downvotes (realistic ratio)
- **Users**: Unique voters per ticket (no duplicate votes)
- **Timing**: Random voting times after ticket creation

## Dynamic Content Generation

The system uses intelligent content generation to create realistic tickets:

### Subject Generation
Combines elements from:
- **Problem Types**: "How to", "Best practices for", "Troubleshooting", etc.
- **Technologies**: React, Node.js, Python, Docker, AWS, etc.
- **Topics**: Machine Learning, Blockchain, Cloud Computing, etc.
- **Domains**: e-commerce, fintech, healthcare, etc.

### Description Generation
Creates realistic scenarios with:
- **Context**: Project type and technology stack
- **Problem**: Specific challenges faced
- **Question**: What kind of help is needed

### Examples of Generated Content:
- "How to React in fintech applications"
- "Best practices for Docker integration for healthcare solution"
- "Microservices implementation using Kubernetes - need guidance"
- "Troubleshooting PostgreSQL in e-commerce platform"

## Usage Recommendations

### For Development
```bash
# Initial setup - create basic structure
curl http://localhost:3000/api/seed?type=all

# Add more diverse content
curl -X POST http://localhost:3000/api/seed/generate \
  -H "Content-Type: application/json" \
  -d '{"count": 30}'
```

### For Testing
```bash
# Create minimal test data
curl http://localhost:3000/api/seed?type=categories
curl http://localhost:3000/api/seed?type=users
curl -X POST http://localhost:3000/api/seed/generate \
  -H "Content-Type: application/json" \
  -d '{"count": 10, "includeVotes": false, "includeComments": false}'
```

### For Demo/Presentation
```bash
# Create comprehensive, impressive dataset
curl http://localhost:3000/api/seed?type=all
curl -X POST http://localhost:3000/api/seed/generate \
  -H "Content-Type: application/json" \
  -d '{"count": 100}'
```

## Data Relationships

The seeding system maintains proper database relationships:

- **Tickets** → Created by Users, Assigned to Support Agents
- **Comments** → Written by Users on Tickets
- **Votes** → Cast by Users on Tickets (unique constraint enforced)
- **Categories** → Associated with Tickets
- **Attachments** → Can be added to Tickets or Comments (placeholder URLs)

## Performance Considerations

- **Batch Processing**: Data is created in batches of 10 to avoid memory issues
- **Unique Constraints**: Proper handling of duplicate prevention
- **Date Distribution**: Realistic temporal patterns in the data
- **Vote Distribution**: Ensures no user votes multiple times on same ticket

## Cleanup

To reset the database:
```sql
-- This will be handled by the seeding functions
DELETE FROM votes;
DELETE FROM comments;
DELETE FROM attachments;
DELETE FROM tickets;
-- Users and categories are preserved for consistency
```

## Error Handling

The system includes comprehensive error handling:
- Checks for existing categories and users before creating tickets
- Validates relationships before creating dependent data
- Provides detailed error messages and rollback capability
- Logs all operations for debugging

## Response Format

All endpoints return consistent JSON responses:

```json
{
  "success": true,
  "message": "Success message",
  "data": {
    "ticketsCreated": 50,
    "commentsCreated": 125,
    "votesCreated": 350,
    "usersAvailable": 20,
    "categoriesAvailable": 8
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details"
}
```
