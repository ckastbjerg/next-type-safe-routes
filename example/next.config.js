const withPlugins = require("next-compose-plugins");
const nextTypeSafePages = require("next-type-safe-routes/dist/plugin").default;

module.exports = withPlugins([nextTypeSafePages]);
