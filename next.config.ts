import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/project-one", destination: "/projects/conduit", permanent: true },
      { source: "/projects/project-two", destination: "/projects/labeling", permanent: true },
      { source: "/projects/project-five", destination: "/projects/tariffix", permanent: true },
      { source: "/projects/project-six", destination: "/projects/knighthacks-viii", permanent: true },
    ];
  },
};

export default nextConfig;
