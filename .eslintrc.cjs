const config = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb-base', // Uses the Airbnb base style guide
    'airbnb-typescript/base', // Uses the Airbnb style guide for TypeScript
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json', // Specify it only for TypeScript projects
  },
  rules: {
    'indent': ['error', 2], // Enforces a 2-space indent
    'no-console': 'warn', // Warns on console.log usage
    'import/prefer-default-export': 'off', // Allows named exports without requiring a default export
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disables requirement for explicit return types on functions and class methods
    'prettier/prettier': ['error', { endOfLine: 'auto', tabWidth: 2 }], // Handles end-of-line differences and tab width
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

export default config;