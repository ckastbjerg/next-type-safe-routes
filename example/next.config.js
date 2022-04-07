const withPlugins = require("next-compose-plugins");
const nextTypeSafeRoutes = require("next-type-safe-routes/plugin");
const path = require("path");

module.exports = withPlugins([nextTypeSafeRoutes]);
