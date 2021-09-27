// next.config.js
const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  experimental: { esmExternals: true },
  async redirects() {
    return [{ source: '/browse', destination: '/browse/0', permanent: true }];
  },
});
