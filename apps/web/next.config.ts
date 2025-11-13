import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	images: {
		qualities: [50, 75, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
			},
		],
	},
};

export default nextConfig;
