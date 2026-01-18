# Project Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Database**
   - Create a `.env` file in the root directory with your MongoDB connection string:
     ```
     DATABASE_URL="mongodb+srv://imalishahzadk:imalihamzak@cluster0.yxiquws.mongodb.net/pm"
     ```
   - Generate Prisma Client:
     ```bash
     npx prisma generate
     ```
   - Push the schema to MongoDB (creates collections automatically):
     ```bash
     npx prisma db push
     ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

### Core Features Implemented

✅ **Project Management**
- Create projects with major goals
- View all projects on dashboard
- Project detail pages
- Project status tracking (active/completed/on-hold)

✅ **Milestone Management**
- Create milestones for projects
- Set current milestone (one per project)
- Milestone status tracking (pending/in-progress/completed)

✅ **Weekly Progress Tracking**
- Sunday-based weekly reporting system
- Track completed tasks for the week
- Plan tasks for next week
- Goals achieved tracking
- Weekly progress history

✅ **Email Reminders**
- Schedule email reminders
- Subject/title and detailed message
- Recipient email configuration
- Scheduled date/time
- Reminder status tracking (scheduled/sent/cancelled)

## Database Schema

The application uses Prisma ORM with MongoDB.

### Models:
- **Project**: name, description, majorGoal, status
- **Milestone**: title, description, status, isCurrent, projectId
- **WeeklyProgress**: weekStartDate, weekEndDate, completedThisWeek, plannedForNextWeek, goalsAchieved, milestoneId
- **EmailReminder**: subject, message, recipientEmail, reminderDate, status, projectId

## API Routes

- `GET/POST /api/projects` - List and create projects
- `GET /api/projects/[id]` - Get project details
- `POST /api/milestones` - Create milestone
- `PATCH /api/milestones/[id]` - Update milestone (set as current)
- `POST /api/weekly-progress` - Create weekly progress report
- `GET/POST /api/reminders` - List and create email reminders
- `PATCH/DELETE /api/reminders/[id]` - Update or delete reminders

## Email Service Integration

To enable email functionality, you'll need to:

1. **Choose an Email Service Provider**:
   - Resend (recommended for Next.js)
   - SendGrid
   - Nodemailer with SMTP

2. **Install the email package**:
   ```bash
   npm install resend  # or sendgrid/nodemailer
   ```

3. **Set up environment variables** (`.env` file):
   ```
   RESEND_API_KEY=your_api_key_here
   # or
   SENDGRID_API_KEY=your_api_key_here
   ```

4. **Create email sending API route**:
   - Create `/app/api/reminders/send/route.ts`
   - Implement email sending logic
   - Set up a cron job or scheduled task to send reminders at their scheduled time

## Next Steps

1. **Install dependencies** and set up the database
2. **Test the application** by creating a project, adding milestones, and tracking progress
3. **Configure email service** for reminder functionality
4. **Customize styling** if needed
5. **Add authentication** if multi-user support is required (NextAuth.js recommended)

## Development Notes

- The application uses Next.js 14 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Prisma ORM for database management
- All forms are client-side with API route handlers
- Weekly progress tracking is Sunday-based as specified

## Troubleshooting

- **Database issues**: Run `npx prisma db push` to sync schema with MongoDB
- **Type errors**: Run `npx prisma generate` after schema changes
- **Build errors**: Clear `.next` folder and rebuild
- **Connection issues**: Verify your MongoDB connection string in `.env` file
