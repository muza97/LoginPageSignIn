module.exports = function(api) {
  api.cache(false); // Note: Use false for no caching
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: ['GEOCODING_API_KEY'],
        safe: false,
        allowUndefined: true,
        verbose: false,
      }],
      'nativewind/babel', // This ensures NativeWind support
    ],
  };
};
