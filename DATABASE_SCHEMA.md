# QuickDesk - Ticket Management System Schema

## Overview
This schema implements a comprehensive ticket management system with the following key features:

## User Roles
- **END_USER**: Regular employees/customers who can create and track tickets
- **SUPPORT_AGENT**: Support staff who can respond to and resolve tickets
- **ADMIN**: Administrators who can manage users, categories, and overall system

## Core Models

### User Model
- Integrated with Clerk for authentication
- Supports role-based access control
- Tracks user preferences for notifications
- Links to all user activities (tickets, comments, votes)

### Ticket Model
Complete ticket lifecycle management:
- **Statuses**: OPEN → IN_PROGRESS → RESOLVED → CLOSED
- **Priorities**: LOW, MEDIUM, HIGH, URGENT
- **Relationships**: Creator, Assignee, Category
- **Metrics**: View count, upvotes, downvotes
- **Timestamps**: Created, updated, resolved, closed

### Category Model
- Flexible categorization system
- Admin-manageable categories
- Color coding for UI
- Active/inactive status

### Comment Model
- Threaded conversations on tickets
- Internal vs external comments
- Support for attachments
- Timeline-based display

### Attachment Model
- File uploads for tickets and comments
- Metadata tracking (size, mime type, original name)
- Flexible storage (local, S3, etc.)
- User upload tracking

### Vote Model
- Upvote/downvote system for tickets
- Prevents duplicate voting
- Helps prioritize popular issues

### Notification Model
- Comprehensive notification system
- Multiple notification types
- Read/unread status tracking
- Email notification preferences

## Key Features Implemented

### 1. User Management
- ✅ User registration/login (via Clerk)
- ✅ Role-based permissions
- ✅ User suspension/activation
- ✅ Profile management

### 2. Ticket Management
- ✅ Create tickets with subject, description, category
- ✅ File attachments
- ✅ Status tracking (Open → In Progress → Resolved → Closed)
- ✅ Priority levels
- ✅ Assignment to support agents

### 3. Search & Filtering
Database indexes support:
- ✅ Filter by status (open/closed)
- ✅ Filter by category
- ✅ Filter by user (own tickets)
- ✅ Sort by creation date
- ✅ Sort by priority
- ✅ Sort by most replied (comment count)

### 4. Voting System
- ✅ Upvote/downvote tickets
- ✅ Vote tracking and metrics
- ✅ Duplicate vote prevention

### 5. Comments & Communication
- ✅ Threaded conversations
- ✅ Internal comments for agents
- ✅ Comment attachments
- ✅ Timeline view support

### 6. Notifications
- ✅ Email notifications
- ✅ In-app notifications
- ✅ Notification preferences
- ✅ Multiple notification types

### 7. Admin Features
- ✅ User management
- ✅ Category management
- ✅ System-wide ticket overview

## Database Indexes
Optimized for performance with indexes on:
- Ticket status, creator, assignee, category
- Creation dates for sorting
- User relationships
- Priority levels

## Usage Flow

### End User Flow
1. Register/login via Clerk
2. Create ticket with details and attachments
3. Track ticket status and updates
4. Receive notifications on changes
5. Reply to comments/updates
6. Vote on tickets

### Support Agent Flow
1. View assigned tickets dashboard
2. Filter and search tickets
3. Update ticket status
4. Add comments (internal/external)
5. Assign tickets to other agents
6. Resolve and close tickets

### Admin Flow
1. Manage user roles and permissions
2. Create and manage categories
3. View system-wide analytics
4. Manage notification settings
5. User administration

## Environment Setup
Copy `.env.example` to `.env` and configure:
- Database connection strings
- Clerk authentication keys
- Email/SMTP settings
- File upload limits

## Migration
Run `prisma migrate dev` to apply the schema to your database.

## Next Steps
1. Set up actual database credentials
2. Configure Clerk authentication
3. Implement file upload handlers
4. Set up email notifications
5. Build the UI components
