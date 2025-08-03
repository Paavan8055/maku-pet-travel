/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
  },

  // Dynamic deployment for API routes
  output: 'standalone',

  experimental: {
    forceSwcTransforms: true,
  },

  // Development optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Basic optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Environment
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
};

module.exports = nextConfig;
