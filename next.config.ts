import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/firm/:id',
        destination: '/firms/:id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
