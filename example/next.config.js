const withPlugins = require("next-compose-plugins");
const nextTypeSafePages = require("next-type-safe-routes/plugin");

module.exports = withPlugins([nextTypeSafePages]);
