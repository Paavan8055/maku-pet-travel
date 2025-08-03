# MAKU Travel Platform - Netlify Deployment Instructions

## Quick Start Deployment

### 1. Prerequisites
- GitHub repository: `https://github.com/Paavan8055/maku-pet-travel`
- Netlify account (free tier supports this deployment)
- All configuration files are ready ✅

### 2. Auto-Deploy from GitHub (Recommended)

1. **Connect to Netlify**:
   ```
   1. Go to https://app.netlify.com/
   2. Click "Add new site" → "Import from Git"
   3. Choose GitHub and authorize
   4. Select repository: Paavan8055/maku-pet-travel
   ```

2. **Build Settings** (Auto-detected):
   ```
   Build command: npm install && npm run build
   Publish directory: .next
   ```

3. **Environment Variables** (Add these in Netlify dashboard):
   ```
   NODE_VERSION=20
   NEXT_TELEMETRY_DISABLED=1
   NODE_ENV=production
   ```

### 3. Manual CLI Deployment (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy the site
cd maku-travel
netlify deploy --prod --dir=.next
```

## Configuration Files Ready ✅

### netlify.toml
```toml
[build]
command = "npm install && npm run build"
publish = ".next"

[build.environment]
NODE_VERSION = "20"
NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
package = "@netlify/plugin-nextjs"

[functions]
external_node_modules = ["sharp"]

[[headers]]
for = "/api/*"
[headers.values]
Cache-Control = "no-cache"
```

### .nvmrc
```
20
```

### next.config.js
- ✅ Optimized for Netlify deployment
- ✅ API routes configured as serverless functions
- ✅ Image optimization settings

## Expected Deployment Outcome

### Build Success Metrics
- **Pages Generated**: 25 (15 static, 10 dynamic)
- **API Routes**: 15 serverless functions
- **Build Time**: ~3-5 minutes
- **First Load JS**: ~103 kB (optimized)

### Live Site Features
1. **Frontend Pages**:
   - Home page with travel booking interface
   - Hotel search and booking pages
   - Inventory management dashboard
   - Authentication pages

2. **API Endpoints**:
   - `/api/hotelbeds/*` - Hotel booking integration
   - `/api/hotels/*` - Hotel search and management
   - `/api/inventory/*` - Real-time inventory
   - `/api/search/unified` - Unified search
   - `/api/payment` - Stripe payment processing
   - `/api/webhooks/stripe` - Payment webhooks

## Post-Deployment Setup

### 1. Domain Configuration
Once deployed, you'll get a URL like: `https://magical-unicorn-123456.netlify.app`

### 2. Environment Variables (Production)
Replace build placeholders with real API keys:

```bash
# Hotel Beds API
HOTELBEDS_HOTELS_API_KEY=your_real_key
HOTELBEDS_HOTELS_SECRET=your_real_secret

# Amadeus API
AMADEUS_API_KEY=your_real_key
AMADEUS_API_SECRET=your_real_secret

# Stripe
STRIPE_SECRET_KEY=sk_live_your_real_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_real_key

# SendGrid
SENDGRID_API_KEY=SG.your_real_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_real_key
```

### 3. Custom Domain Setup (Optional)
```bash
# Add custom domain in Netlify dashboard
# Or via CLI:
netlify domains:add yourdomain.com
```

## Troubleshooting

### Common Issues

1. **Build Fails with "Module not found"**
   - Solution: Verify all dependencies in package.json
   - Check: Node.js version is 20 (.nvmrc file)

2. **API Routes Return 404**
   - Solution: Ensure @netlify/plugin-nextjs is installed
   - Check: netlify.toml configuration is correct

3. **Large Bundle Size Warning**
   - Current: 103 kB (within Netlify limits)
   - Monitor: Build logs for size optimizations

### Build Verification Commands

```bash
# Local build test
npm run build

# Check bundle size
npm run build | grep "First Load JS"

# Verify all routes
ls .next/server/app
```

## SSL Certificate & Custom Domain

### Automatic SSL (Netlify provided)
- ✅ Automatic HTTPS for *.netlify.app domains
- ✅ Free SSL certificates via Let's Encrypt

### Custom Domain SSL Setup
1. **Add Domain**: Netlify Dashboard → Domain Management
2. **DNS Configuration**: Point CNAME to Netlify
3. **SSL Certificate**: Auto-provisioned within 24 hours

```dns
# DNS Records for Custom Domain
CNAME www your-site-name.netlify.app
A @ 75.2.60.5
```

## Performance Optimization

### Already Implemented ✅
- Image optimization disabled (Netlify compatibility)
- Bundle splitting and tree shaking
- Static generation where possible
- API route optimization

### Monitoring
- Core Web Vitals via Netlify Analytics
- Function execution times
- Build performance metrics

## Next Steps After Deployment

1. **Verify Deployment**: Test all 25 pages and 15 API routes
2. **Add Real API Keys**: Replace placeholder environment variables
3. **Set Up Custom Domain**: Configure DNS and SSL
4. **Monitor Performance**: Check Core Web Vitals and function performance
5. **Set Up Branch Previews**: Enable automatic preview deployments

---

**Deployment Status**: Ready for immediate deployment
**Estimated Setup Time**: 10-15 minutes
**Expected Live URL**: `https://[generated-name].netlify.app`
