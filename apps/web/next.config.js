/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "firebasestorage.googleapis.com",
            "ucarecdn.com",
            "www.summarecon.com",
            "pbs.twimg.com",
            "s3-ap-southeast-1.amazonaws.com",
            "images.unsplash.com",
            "localhost"
        ],
        remotePatterns: [
            //   {
            //     protocol: "https",
            //     hostname: "**",
            //   },
              {
                protocol: "http",
                hostname: "**",
              },
            ],
    }
}

module.exports = nextConfig
