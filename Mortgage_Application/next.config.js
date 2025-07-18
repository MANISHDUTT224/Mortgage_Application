/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};
// next.config.js
const withTM = require("next-transpile-modules")([
  "@radix-ui/react-progress",
  "@radix-ui/react-checkbox"
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  // your existing config…
});

module.exports = nextConfig;
