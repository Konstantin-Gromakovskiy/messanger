import { defineFlatConfig } from 'eslint-define-config';
import airbnbConfig from 'eslint-config-airbnb';
import reactPlugin from 'eslint-plugin-react';
import functionalPlugin from 'eslint-plugin-functional';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default defineFlatConfig([
  // Добавляем настройки из airbnbConfig
  airbnbConfig,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      functional: functionalPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
      'functional/no-conditional-statements': 'off',
      'functional/no-expression-statements': 'off',
      'functional/immutable-data': 'off',
      'functional/functional-parameters': 'off',
      'functional/no-try-statements': 'off',
      'functional/no-throw-statements': 'off',
      'functional/no-return-void': 'off',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      'testing-library/no-debug': 'off',
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.js', '.jsx'] },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
