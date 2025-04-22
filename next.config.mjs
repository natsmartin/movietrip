/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'demofree.sirv.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.themoviedb.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'youtube.com',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
