/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  experimental: {
    serverActions: true
  },
  reactStrictMode: false
}

export default nextConfig
