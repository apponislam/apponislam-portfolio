import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        // unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co.com",
            },
            {
                protocol: "https",
                hostname: "i.imgur.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
        ],
    },
    transpilePackages: ["react-icons"],
    experimental: {
        optimizePackageImports: ["lucide-react", "react-icons", "@radix-ui/react-icons"],
    },
};

export default nextConfig;
