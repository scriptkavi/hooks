import { withAxiom } from "next-axiom"
import { createContentlayerPlugin } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/hooks",
        destination: "/docs/hooks/battery",
        permanent: true,
      },
      {
        source: "/docs/hooks",
        destination: "/docs/hooks/battery",
        permanent: true,
      },
      {
        source: "/docs/primitives/:path*",
        destination: "/docs/hooks/:path*",
        permanent: true,
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withAxiom(withContentlayer(nextConfig))
