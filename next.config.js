module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.webuyhousesguy.com'],
  },
  async redirects() {
    return [
      {
        source: '/city/:city',
        destination: '/:city',
        permanent: true,
      },
    ]
  },
}