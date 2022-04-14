const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: true || process.env.NODE_ENV === 'development',
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
  eslint: {
    dirs: ['pages', 'components', 'containers', 'helpers', 'hooks'],
  },
};

module.exports = withPWA(nextConfig);
