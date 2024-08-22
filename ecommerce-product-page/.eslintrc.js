module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    plugins: ['react', 'prettier'],
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true,
    },
    rules: {
      'prettier/prettier': 'error',
      // Add your project-specific ESLint rules here
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };