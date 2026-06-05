/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // react-pdf must NOT be in serverExternalPackages — it needs to be bundled so
  // CF Workers can use it. We force the browser build everywhere via webpack alias
  // so no native Node.js addons (@napi-rs/canvas) are pulled in.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Force browser build for ALL environments (client + CF Workers edge).
      // Browser build is pure JS, no native deps, works in any V8 environment.
      "@react-pdf/renderer": "@react-pdf/renderer/lib/react-pdf.browser.js",
      canvas: false,
      "@napi-rs/canvas": false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://plausible.io https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' https://plausible.io https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://cdn.jsdelivr.net",
      "frame-ancestors 'none'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
