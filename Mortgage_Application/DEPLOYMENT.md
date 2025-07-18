# Deploying HomeLend to Vercel

This guide will walk you through deploying your HomeLend application to Vercel.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (you can use your GitHub account)
3. **Git**: Make sure Git is installed on your computer

## Step 1: Push Your Code to GitHub

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HomeLend mortgage application"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it `homelend-mortgage-app` (or your preferred name)
   - Make it public or private (your choice)
   - Don't initialize with README (since you already have code)
   - Click "Create repository"

3. **Connect your local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/homelend-mortgage-app.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `homelend-mortgage-app` repository
   - Click "Import"

3. **Configure Project Settings**:
   - **Project Name**: `homelend-mortgage-app` (or your preferred name)
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `.next` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

4. **Environment Variables** (if needed):
   - Click "Environment Variables" if you have any
   - For this project, no environment variables are required

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose your settings (usually defaults are fine)

## Step 3: Access Your Deployed Application

1. **Get Your URL**:
   - After deployment, Vercel will provide you with a URL
   - It will look like: `https://homelend-mortgage-app.vercel.app`
   - You can also find it in your Vercel dashboard

2. **Custom Domain** (Optional):
   - In your Vercel dashboard, go to your project
   - Click on "Domains"
   - Add your custom domain if you have one

## Step 4: Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy when you push to the main branch
- Create preview deployments for pull requests
- Show build logs and deployment status

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Make sure there are no TypeScript errors

2. **404 Errors**:
   - Ensure your Next.js routing is set up correctly
   - Check that all page files are in the correct `app/` directory structure

3. **Slow Loading**:
   - Optimize images (use Next.js Image component)
   - Check for large bundle sizes

### Build Commands Reference:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Final Steps

1. **Test Your Deployment**:
   - Visit all four pages: Home, About Us, Mortgage Calculator, Start
   - Test the mortgage calculator functionality
   - Test the contact form modal
   - Test the multi-step pre-approval form
   - Check responsiveness on mobile devices

2. **Share Your URLs**:
   - **Deployed Site**: `https://your-app-name.vercel.app`
   - **GitHub Repository**: `https://github.com/YOUR_USERNAME/homelend-mortgage-app`

## Email Template for Submission

```
Subject: HomeLend Mortgage Application - Assignment Submission

Dear Hiring Team,

I have completed the Better.com replica assignment as requested. Please find the details below:

**Deployed Application**: https://your-app-name.vercel.app
**GitHub Repository**: https://github.com/YOUR_USERNAME/homelend-mortgage-app

**Features Implemented**:
✅ Four fully functional pages (Home, About Us, Mortgage Calculator, Start)
✅ Interactive mortgage calculator with real-time calculations
✅ Multi-step pre-approval form with comprehensive validation
✅ Functional contact modal with form validation
✅ Fully responsive design across all devices
✅ Professional styling matching Better.com aesthetic
✅ Rebranded to "HomeLend" with unique identity

**Technology Stack**:
- React with Next.js 13+ (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn/ui for components
- Zod for form validation
- Deployed on Vercel

The application is production-ready and includes comprehensive form validation, interactive components, and a professional user experience.

Thank you for your consideration.

Best regards,
[Your Name]
```

## Additional Notes

- The application uses Next.js 13+ App Router
- All forms include comprehensive validation using Zod
- The contact modal is functional across all pages
- The mortgage calculator provides real-time calculations
- The application is fully responsive and production-ready
- No environment variables are required for basic functionality