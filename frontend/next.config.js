/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['imgur.com','i.imgur.com', 'imagizer.imageshack.com'],
    },
    distDir: 'docs'
};

module.exports = nextConfig;
