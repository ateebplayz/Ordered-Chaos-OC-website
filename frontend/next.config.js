/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: ['imgur.com','i.imgur.com', 'imagizer.imageshack.com'],
    }
};

module.exports = nextConfig;
