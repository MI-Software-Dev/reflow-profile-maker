import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,

  basePath: "/reflow-profile-maker",
  assetPrefix: "/reflow-profile-maker",

  async redirects() {
    return [
      {
        source: "/",
        destination: "/reflow-profile-maker/home",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
