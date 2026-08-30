/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'off' },
      { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';" },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
      { key: 'X-Robots-Tag', value: 'noai, noimageai' },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, private' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, private' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noai, noimageai' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/images/approved/category-weight-management.webp', destination: '/images/approved/category-weight-management.svg' },
      { source: '/images/approved/category-recovery.webp', destination: '/images/approved/category-recovery.svg' },
      { source: '/images/approved/category-longevity.webp', destination: '/images/approved/category-longevity.svg' },
      { source: '/images/approved/category-cognitive-support.webp', destination: '/images/approved/category-cognitive-support.svg' },
      { source: '/images/approved/category-immune-support.webp', destination: '/images/approved/category-immune-support.svg' },
      { source: '/images/approved/category-lab-supply.webp', destination: '/images/approved/category-lab-supply.svg' },
      { source: '/images/approved/veteran-flag-texture.webp', destination: '/images/approved/veteran-flag-texture.svg' },
    ];
  },
};
export default nextConfig;
