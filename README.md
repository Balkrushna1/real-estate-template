# Real Estate Website

A modern, full-stack real estate listing website built with React, Express, and TypeScript. This is a demonstration/dummy project with static data - no database required. Features include property listings, detailed property views, contact forms, and a responsive UI with smooth animations.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express 5, Node.js
- **Data**: Static in-memory data (no database)
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter

## Features

- 🏠 Property listings with search and filter
- 📋 Detailed property views
- 📝 Contact form (displays success message only)
- 🎨 Modern, responsive UI
- ⚡ Fast page transitions and animations
- 📱 Mobile-friendly design
- 💾 Static data - no database setup required

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd real-estate-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5000` (or another port if 5000 is in use).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run check` - Run TypeScript type checking

## Project Structure

```
real-estate-template/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   └── index.html
├── server/                 # Backend Express server
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   └── storage.ts         # Static data storage
├── shared/                 # Shared code between client and server
│   ├── schema.ts          # Type definitions
│   └── routes.ts          # Shared route types
├── script/                 # Build scripts
├── vercel.json            # Vercel configuration
└── package.json
```

## Data Structure

The application uses static in-memory data defined in [server/storage.ts](server/storage.ts).

### Listings

Property listings include:

- `id` - Unique identifier
- `title` - Property title
- `description` - Property description
- `price` - Property price
- `address` - Property address
- `city` - City location
- `type` - Property type (residential/commercial)
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `sqft` - Square footage
- `imageUrl` - Property image URL
- `isFeatured` - Featured listing flag

### Contact Form

When users submit the contact form:

- The data is logged to the console
- A success message is displayed
- No data is persisted (this is a demo project)

## Deploying to Vercel

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Method 1: Deploy Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"** or **"Import Project"**
3. Select your Git repository
4. Configure your project:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**

Vercel will automatically detect the `vercel.json` configuration and deploy your application.

### Method 2: Deploy Using Vercel CLI

1. Install the Vercel CLI globally:

```bash
npm install -g vercel
```

2. Login to your Vercel account:

```bash
vercel login
```

3. Deploy to production:

```bash
vercel --prod
```

The CLI will guide you through the deployment process.

### Vercel Configuration

The project includes a `vercel.json` file that configures:

- Node.js runtime for the Express server
- Routing to handle both API and static files
- Proper output directory structure

### Verify Deployment

After deployment:

1. Visit your Vercel deployment URL
2. Test the property listings page
3. Try filtering properties
4. Submit a contact form to verify it works
5. Check Vercel function logs to see contact form submissions

## Post-Deployment

After deploying to Vercel:

1. **Test all features**: Verify that listings, contact forms, and all pages work correctly
2. **Set up custom domain** (optional): Configure a custom domain in Vercel settings
3. **Customize data**: Edit the static data in [server/storage.ts](server/storage.ts) to add your own properties
4. **Monitor logs**: Use Vercel dashboard to monitor function logs and errors

## Troubleshooting

### Build Failures

If the build fails:

- Check the Vercel build logs for specific errors
- Ensure all dependencies are listed in `package.json`
- Verify that TypeScript types are correct (`npm run check`)
- Make sure the build works locally first (`npm run build`)

### Runtime Errors

If you encounter runtime errors after deployment:

- Check Vercel function logs in the dashboard
- Verify all routes are working correctly
- Ensure the server code is compatible with Vercel's serverless environment

### Contact Form Not Working

If contact form submissions aren't working:

- Check Vercel function logs for errors
- Verify the API route is accessible at `/api/contact`
- Test the endpoint directly using a tool like Postman

## Customization

### Adding/Modifying Listings

Edit the listings array in [server/storage.ts](server/storage.ts) to add, remove, or modify property listings:

```typescript
this.listings = [
  {
    id: 7,
    title: "Your New Property",
    description: "Amazing property description",
    price: "500000",
    // ... other fields
  },
  // ... existing listings
];
```

### Styling

The project uses Tailwind CSS for styling. Customize:

- Colors and themes in `tailwind.config.ts`
- Global styles in `client/src/index.css`
- Component styles using Tailwind utility classes

### Contact Form Integration

The contact form currently logs submissions to the console. To add real functionality:

**Email Integration (SendGrid):**

```bash
npm install @sendgrid/mail
```

Then update the contact route in `server/routes.ts` to send emails.

**Save to External Service:**

- Airtable API
- Google Sheets API
- Notion API
- Any other backend service

## Support

For issues or questions:

- Check the [Vercel documentation](https://vercel.com/docs)
- Review the [Express.js documentation](https://expressjs.com/)
- Open an issue in the repository

## License

MIT
