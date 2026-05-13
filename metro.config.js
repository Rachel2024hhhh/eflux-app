const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Allow Metro to bundle .woff font files
config.resolver.assetExts.push('woff', 'woff2');

module.exports = config;
