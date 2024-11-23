/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@/prisma/client'],
        esmExternals: "loose",
    },
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }];
        return config;
    },

};

export default nextConfig;