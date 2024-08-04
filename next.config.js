module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        pathname: '**',
      },
      {
        protocol: 'http', // this allow all the images to be shown, not good for security
        hostname: '**',
      },
      {
        protocol: 'https', // this allow all the images to be shown, not good for security
        hostname: '**',
      },
    ],
  },
};
