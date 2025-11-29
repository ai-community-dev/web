import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disabled to avoid double-invocation side effects that can trigger
  // removeChild hydration errors with third-party DOM mutations (Emotion/Maps)
  reactStrictMode: false,



  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'json.commudle.com',
        pathname: '/rails/active_storage/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  compress: true,

  poweredByHeader: false,

  serverExternalPackages: ['firebase-admin', '@google-cloud/firestore', '@opentelemetry/api'],

  experimental: {
    // Optimize for better hydration
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'framer-motion'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Reduce bundle size
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false, // Enable in dev for testing
  workboxOptions: {
    disableDevLogs: true,
  },
});

// Temporarily disabled - causing build issues with Next.js 15
// export default withPWA(nextConfig);
export default nextConfig;

