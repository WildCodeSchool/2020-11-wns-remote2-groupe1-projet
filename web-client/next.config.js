module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  future: { webpack5: true },

  async rewrites() {
    return [
      {
        source: '/:path',
        destination: 'http://api:4000/graphql', // Proxy to Backend.
      },
    ];
  },
};
