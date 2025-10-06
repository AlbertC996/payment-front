import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['content-api.changenow.io'],
  },
  output: 'export',
};

export default nextConfig;
