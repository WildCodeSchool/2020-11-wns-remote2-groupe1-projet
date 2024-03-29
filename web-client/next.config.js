module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path',
        destination: 'http://api:4000/graphql', // Proxy to Backend.
      },
    ];
  },
  websocketProxyPath: '/api',
  websocketProxyPort: 8000,
};
