/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            // {
            //     protocol: 'http',
            //     hostname: 'localhost',
            //     port: '5000',
            //     pathname: '/**',
            // },
            {
                protocol: 'https',
                hostname: 'kniginatka.ru',
                port: '',
                pathname: '/_express/**',
            },
        ],
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
