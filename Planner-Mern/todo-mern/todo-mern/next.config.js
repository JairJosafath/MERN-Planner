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
        destination: "https://nextplanner.onrender.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
