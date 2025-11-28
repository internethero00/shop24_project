import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	env: {
		APP_ENV: process.env.APP_ENV,
		APP_URL: process.env.APP_URL,
		APP_DOMAIN: process.env.APP_DOMAIN,
		SERVER_URL_INTERNAL: process.env.SERVER_URL_INTERNAL,
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			}
		]
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL_INTERNAL}/uploads/:path*`
			}
		];
	}
};

export default nextConfig;
