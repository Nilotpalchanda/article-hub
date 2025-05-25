import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'cdn.pixabay.com', 'cdn.jsdelivr.net', 'picsum.photos', 'loremflickr.com'],
    unoptimized: true,
  },
};

export default nextConfig;
