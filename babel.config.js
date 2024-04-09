module.exports = function(api) {
  api.cache(false); 
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
      'nativewind/babel', 
    ],
  };
};
