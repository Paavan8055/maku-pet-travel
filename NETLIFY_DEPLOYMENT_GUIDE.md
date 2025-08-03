# MAKU Travel Platform - Netlify Deployment Guide

## Overview
This guide contains the optimized configuration for deploying the MAKU Travel Platform to Netlify with Next.js 15 and Bun package manager.

## Fixed Configuration Files

### 1. `netlify.toml` - Updated for Next.js 15 + Bun
```toml
[build]
  command = "bun run build"
  functions = ".netlify/functions-internal"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NODE_ENV = "production"
  NEXT_TELEMETRY_DISABLED = "1"
  BUN_FLAGS = "--production"
  NETLIFY_USE_YARN = "false"
  NEXT_PRIVATE_STANDALONE = "true"
  NEXT_PRIVATE_TARGET = "server"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 2. `.nvmrc` - Node.js Version
```
20
```

### 3. `package.json` - Package Manager Declaration
```json
{
  "packageManager": "bun@1.0.0",
  "engines": {
    "node": ">=18.0.0",
    "bun": ">=1.0.0"
  }
}
```

### 4. `next.config.js` - Optimized for Netlify
- Removed deprecated `swcMinify` option
- Moved `serverComponentsExternalPackages` to `serverExternalPackages`
- Added webpack configuration for serverless compatibility
- Optimized for standalone output

## Deployment Steps

### 1. Pre-deployment Checklist
- ✅ Verify local build works: `bun run build`
- ✅ Confirm all 15 pages and API routes generate correctly
- ✅ Check `bun.lockb` file exists (for Bun detection)
- ✅ Ensure `.nvmrc` specifies Node.js 20

### 2. Netlify Configuration
1. **Build Settings**:
   - Build command: `bun run build`
   - Publish directory: `.next`
   - Functions directory: `.netlify/functions-internal`

2. **Environment Variables**:
   ```
   NODE_VERSION=20
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   BUN_FLAGS=--production
   ```

3. **Plugin Configuration**:
   - Install `@netlify/plugin-nextjs` plugin
   - Enable in `netlify.toml` configuration

### 3. Build Optimizations

#### Performance Improvements
- **Node.js 20**: Better compatibility with Next.js 15
- **Bun Package Manager**: Faster dependency installation
- **Standalone Output**: Optimized serverless functions
- **External Packages**: Crypto module externalization

#### Security Headers
- CORS headers for API routes
- Cache control for static assets
- Service Worker optimization

### 4. API Routes Configuration
All API routes are configured as dynamic server-side functions:
- `/api/hotelbeds/*` - Hotel booking integration
- `/api/hotels/*` - Hotel search and management
- `/api/inventory/*` - Travel inventory management
- `/api/search/unified` - Unified search functionality

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails with "Module not found" Error
**Solution**: Check `serverExternalPackages` in `next.config.js`
```js
serverExternalPackages: ['crypto']
```

#### 2. Package Manager Detection Issues
**Solution**: Ensure `bun.lockb` exists and `packageManager` is specified in `package.json`

#### 3. Node.js Version Mismatch
**Solution**: Use `.nvmrc` file and `NODE_VERSION` environment variable
```
NODE_VERSION=20
```

#### 4. API Routes Not Working
**Solution**: Verify netlify.toml has correct functions configuration:
```toml
[functions]
  external_node_modules = ["crypto", "fs", "path", "os"]
  node_bundler = "esbuild"
  timeout = 30
```

#### 5. Build Timeout Issues
**Solution**: Optimize build with proper caching and external packages

### Build Error Resolution

#### Error: "Top-level await not supported"
- Move async operations inside function bodies
- Use dynamic imports where necessary

#### Error: "Cannot resolve 'crypto' module"
- Add to `serverExternalPackages` in Next.js config
- Include in `external_node_modules` in netlify.toml

## Production Verification

### Post-Deployment Checks
1. **Frontend Pages** (15 total):
   - ✅ Home page (`/`)
   - ✅ Stays page (`/stays`)
   - ✅ Inventory page (`/inventory`)
   - ✅ Hotel APIs page (`/hotel-apis`)
   - ✅ All other dynamic pages

2. **API Endpoints** (13 total):
   - ✅ Hotel search APIs
   - ✅ Booking APIs
   - ✅ Inventory management APIs
   - ✅ Hotelbeds integration APIs

3. **Performance Metrics**:
   - First Load JS: ~101 kB (optimized)
   - Build time: < 5 minutes
   - Function cold start: < 2 seconds

## Monitoring and Maintenance

### Key Metrics to Monitor
- Build success rate
- Function execution time
- Error rates on API endpoints
- Core Web Vitals scores

### Regular Maintenance
- Update `@netlify/plugin-nextjs` regularly
- Monitor Node.js version compatibility
- Review and optimize build times
- Check for Next.js updates

## Support and Resources

### Documentation Links
- [Netlify Next.js Plugin](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Bun Package Manager](https://bun.sh/docs)

### Configuration Files Summary
- `netlify.toml` - Netlify build and deployment configuration
- `.nvmrc` - Node.js version specification
- `next.config.js` - Next.js framework configuration
- `package.json` - Package manager and dependencies

---

**Note**: This configuration has been tested and optimized for Next.js 15.3.2 with Bun package manager on Netlify's build environment.
