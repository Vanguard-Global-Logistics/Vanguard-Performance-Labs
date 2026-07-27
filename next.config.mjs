/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      { source: '/images/approved/vanguard-wordmark.webp', destination: '/images/approved/vanguard-wordmark.svg' },
      { source: '/images/approved/hero-winged-vial.webp', destination: '/images/hero/winged-base.png' },
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
