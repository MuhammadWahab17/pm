# Project Management System

A Next.js-based project management application for tracking projects, milestones, and weekly progress with automated email reminders.

## Features

- **Project Management**: Create and manage projects with major goals
- **Milestone Tracking**: Add milestones to projects and track their progress
- **Current Milestone**: Set one milestone as the active/current milestone per project
- **Weekly Progress Tracking**: Track weekly progress with Sunday-based reporting
- **Email Reminders**: Schedule automated email reminders for project managers

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Email Service**: Configure email service (see setup instructions)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
   - Create a `.env` file in the root directory:
     ```
     DATABASE_URL="mongodb+srv://imalishahzadk:imalihamzak@cluster0.yxiquws.mongodb.net/pm"
     ```
   - Generate Prisma Client and push schema to MongoDB:
     ```bash
     npx prisma generate
     npx prisma db push
     ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app directory with pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions and database client
- `/prisma` - Database schema and migrations

## Database Schema

The application uses the following data models:

- **Project**: Projects with major goals
- **Milestone**: Milestones tied to projects
- **WeeklyProgress**: Weekly progress reports tied to milestones
- **EmailReminder**: Scheduled email reminders

## Usage

1. **Create a Project**: Navigate to Projects → New Project
2. **Add Milestones**: Add milestones to your project
3. **Set Current Milestone**: Mark one milestone as current
4. **Track Weekly Progress**: On Sundays, create weekly progress reports
5. **Schedule Reminders**: Create email reminders for important follow-ups

## Email Configuration

To enable email functionality, you'll need to configure an email service provider (Resend, SendGrid, etc.) and update the email sending logic in `/app/api/reminders/`.

## License

MIT
