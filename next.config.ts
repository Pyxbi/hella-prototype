import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: do NOT set `output: "standalone"` here — it breaks Vercel's
  // output-file tracing (missing next-server.js.nft.json). Vercel handles
  // this itself. Only enable standalone for Docker/self-hosted Node deploys.
};

export default nextConfig;
