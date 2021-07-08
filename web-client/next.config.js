module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path',
        destination: 'http://api:4000/graphql', // Proxy to Backend
      },
    ];
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_PORT: process.env.NEXT_PUBLIC_API_PORT,
  },
};
