import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['content-api.changenow.io'],
  },
  output: 'export', // 👈 این خط خروجی استاتیک تولید می‌کند
};

export default nextConfig;
