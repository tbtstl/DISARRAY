// next.config.js
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  experimental: { esmExternals: true },
});
