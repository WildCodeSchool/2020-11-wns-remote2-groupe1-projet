module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path',
        destination: 'http://[::1]:4000/graphql', // Proxy to Backend
      },
    ];
  },
};
