module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'json', 'markdown'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': ['error', { allow: ['info', 'warn'] }],
    semi: ['error', 'always'],
    'func-style': ['error', 'expression'],
    'eol-last': ['error', 'always'],
    'object-curly-newline': 'off',
    'operator-linebreak': ['error', 'after'],
  },
};
