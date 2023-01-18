/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
