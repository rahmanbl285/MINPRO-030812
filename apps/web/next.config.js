/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "firebasestorage.googleapis.com",
            "ucarecdn.com",
            "www.summarecon.com",
            "pbs.twimg.com",
            "s3-ap-southeast-1.amazonaws.com",
            "images.unsplash.com"
        ]
    }
}

module.exports = nextConfig
