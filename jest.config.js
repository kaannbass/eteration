module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    '/node_modules/(?!@react-navigation/elements)/'
  ],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',  '^react-native-fast-image$': '<rootDir>/__mocks__/react-native-fast-image.js',
  },
};
