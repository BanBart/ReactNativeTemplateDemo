const config = {
  verbose: true,
  transformIgnorePatterns: ['/node_modules/(?!(jest-)?@?react-native|@react-native-community)'],
  globals: { __DEV__: true },
  setupFiles: [
    './__mocks__/rnc_net_info.js',
    './__mocks__/react_native_permissions.js',
    './__mocks__/react_native_config.js',
    './__mocks__/react_native_device_info.js',
  ],
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

module.exports = config
