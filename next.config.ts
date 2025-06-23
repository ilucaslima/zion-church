import type { NextConfig } from "next";
// Error: Invalid src prop (https://zio-bucket.s3.us-east-2.amazonaws.com/1750693696357Screenshot%202025-06-23%20at%2012.37.18.png) on `next/image`, hostname "zio-bucket.s3.us-east-2.amazonaws.com" is not configured under images in your `next.config.js`

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pravatar.cc", "zio-bucket.s3.us-east-2.amazonaws.com"],
  },
};

export default nextConfig;
