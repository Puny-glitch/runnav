// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig([
  {
    ignores: ['node_modules/**', '.expo/**', 'dist/**', 'build/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: ['expo'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]);
