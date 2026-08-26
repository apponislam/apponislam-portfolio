import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    transpilePackages: ["react-icons"],
    experimental: {
        optimizePackageImports: ["lucide-react", "react-icons", "@radix-ui/react-icons"],
    },
};

export default nextConfig;
