# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd "/Users/muhammadwahab/Documents/1MyAgency/project management"
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No** (for first deployment)
   - What's your project's name? (Use default or enter a name)
   - In which directory is your code located? **./** (current directory)

5. **Set Environment Variables** when prompted or after deployment:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `DATABASE_URL` = `mongodb+srv://imalishahzadk:imalihamzak@cluster0.yxiquws.mongodb.net/pm`

6. **Redeploy** after adding environment variables:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (Git Integration)

1. **Push your code to GitHub/GitLab/Bitbucket**:
   ```bash
   git init  # if not already initialized
   git add .
   git commit -m "Initial commit - Project Management System"
   # Create a repository on GitHub/GitLab and push:
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. **Import Project in Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Next.js** (should be auto-detected)
   - Root Directory: **./** (or leave default)
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`

4. **Add Environment Variables**:
   - Before deploying, click "Environment Variables"
   - Add: 
     - Name: `DATABASE_URL`
     - Value: `mongodb+srv://imalishahzadk:imalihamzak@cluster0.yxiquws.mongodb.net/pm`
     - Environment: Select all (Production, Preview, Development)

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at a URL like: `https://your-project-name.vercel.app`

## Important Notes

### Environment Variables

Make sure to set `DATABASE_URL` in Vercel's environment variables:
```
DATABASE_URL=mongodb+srv://imalishahzadk:imalihamzak@cluster0.yxiquws.mongodb.net/pm
```

### Prisma on Vercel

The `postinstall` script in `package.json` automatically runs `prisma generate` during deployment, which is required for Prisma Client to work on Vercel.

### MongoDB Connection

Your MongoDB connection string is already configured. Make sure:
- Your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or specifically from Vercel IPs
- The database user has the correct permissions

### Build Configuration

The build process:
1. Installs dependencies (`npm install`)
2. Generates Prisma Client (`prisma generate` - via postinstall script)
3. Builds Next.js app (`next build`)

## Troubleshooting

### Build Fails with Prisma Errors
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check that `prisma generate` runs successfully (check build logs)

### Connection Errors to MongoDB
- Verify MongoDB Atlas network access settings
- Check that the connection string is correct
- Ensure the database user has read/write permissions

### Type Errors
- Make sure `prisma generate` runs before the build
- Check that `@prisma/client` is in dependencies (not devDependencies)

## Post-Deployment

After deployment:
1. Visit your live URL
2. Test creating a project
3. Verify MongoDB connection is working
4. Check Vercel function logs if there are any errors

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch = Production deployment
- Every PR = Preview deployment
- All environments share the same environment variables

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
