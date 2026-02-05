# Vercel Deployment Guide - Admin Panel

This guide will help you deploy the Admin Panel to Vercel.

## Prerequisites

- Vercel account ([https://vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 20.x or higher

## Deployment Steps

### 1. **Prepare Your Repository**

Ensure all changes are committed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 2. **Connect to Vercel**

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   vercel
   ```

4. Follow the interactive prompts to set up your project.

#### Option B: Using Vercel Dashboard

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." > "Project"
3. Select your Git repository
4. Click "Import"
5. Configure project settings (see **Environment Variables** section below)
6. Click "Deploy"

### 3. **Environment Variables**

Configure the following environment variables in your Vercel project:

#### Required Variables:
- `NEXT_PUBLIC_API_URL` - The base URL for your backend API
  - Example: `https://api.example.com`

#### Optional Variables:
Add any other environment variables your application needs in the Vercel Dashboard under:
**Settings > Environment Variables**

### 4. **Configuration Files**

The project includes:

- **`vercel.json`** - Vercel-specific configuration
  - Specifies build and dev commands
  - Defines Node.js version (20.x)
  - Lists required environment variables
  - Configures security headers

- **`.vercelignore`** - Files/folders to exclude from deployment
  - Ignores build artifacts, logs, and dependencies
  - Reduces deployment size and speed

- **`next.config.ts`** - Optimized for Vercel
  - Enabled SWC minification for faster builds
  - Configured security headers (XSS, Clickjacking, MIME-sniffing protection)
  - Image optimization settings
  - TypeScript type checking during builds

## Build & Runtime

- **Build Command**: `pnpm install && next build`
- **Start Command**: `next start`
- **Dev Command**: `next dev`
- **Install Command**: `pnpm install`

## Performance Optimizations

The project is configured with:

✅ **SWC Minification** - Faster builds and smaller bundles
✅ **Security Headers** - XSS, Clickjacking, and MIME-sniffing protection
✅ **Type Checking** - Ensures type safety during builds
✅ **Strict ESLint** - Code quality enforcement
✅ **Tailwind CSS** - Optimized styling with PostCSS v4

## Monitoring & Management

After deployment:

1. **View Logs**: Check build and runtime logs in Vercel Dashboard
2. **Analytics**: Monitor performance metrics under "Analytics" tab
3. **Deployments**: Track deployment history
4. **Custom Domain**: Configure in **Settings > Domains**
5. **Redeployments**: Any push to your connected Git branch triggers automatic redeployment

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Review build logs in Vercel Dashboard
- Ensure `package.json` dependencies are compatible

### Runtime Errors
- Check application logs in Vercel Dashboard
- Verify `NEXT_PUBLIC_API_URL` environment variable is correct
- Review API connectivity and CORS settings

### Performance Issues
- Use Vercel Analytics to identify bottlenecks
- Check image optimization settings
- Review bundle size analysis

## Production Best Practices

1. **Use Preview Deployments**: Create a preview for every PR
2. **Set Up Protected Branches**: Require reviews before merging to main
3. **Monitor Error Tracking**: Integrate Sentry or similar service
4. **CDN Caching**: Leverage Vercel's Edge CDN for optimal performance
5. **Auto-rollback**: Configure automatic rollback on failed deployments

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Next.js Configuration Reference](https://nextjs.org/docs/app/api-reference/next-config-js)

## Support

For issues or questions:
- Check [Vercel Status Page](https://www.vercel-status.com/)
- Review [Vercel Community Forums](https://vercel.com/help)
- Contact Vercel Support through dashboard
