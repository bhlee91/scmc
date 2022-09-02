module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    "semi": ["error", "always"],
    "quotes": ["error", "single", "double"],
  },
};
