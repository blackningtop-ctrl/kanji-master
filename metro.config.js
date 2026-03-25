const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Keep WASM as asset (not source) for expo-sqlite web support
if (!config.resolver.assetExts.includes('wasm')) {
  config.resolver.assetExts.push('wasm');
}
// Remove wasm from sourceExts if present
config.resolver.sourceExts = config.resolver.sourceExts.filter((ext) => ext !== 'wasm');

module.exports = config;
