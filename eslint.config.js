import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  { ignores: ['dist', 'node_modules'] },

  ...fixupConfigRules(compat.extends('airbnb', 'airbnb/hooks')),

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      'import/resolver': { node: { extensions: ['.js', '.jsx'] } },
    },
    rules: {
      // Vite + React 19: автоматический JSX runtime
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
      // React 19 не проверяет propTypes в рантайме — без TS они бесполезны
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      // label + htmlFor достаточно (airbnb требует ещё и вложенность)
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
      // Immer в Redux Toolkit мутирует draft-state
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['vite.config.js', 'eslint.config.js'] },
      ],
    },
  },

  // Должен быть последним — отключает стилистические правила, конфликтующие с Prettier
  prettier,
];
