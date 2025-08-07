/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    webpack: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },
}

export default nextConfig
