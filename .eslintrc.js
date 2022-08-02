module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    'react-prefer-function-component',
    'prefer-arrow',
  ],
  root: true,
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
    ],
    'lines-between-class-members': ['error',
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],
    'no-void': [
      'error', {
        allowAsStatement: true,
      },
    ],
    'padding-line-between-statements': [
      'error', {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error',
      {
        'vars': 'all',
        'args': 'after-used',
        'argsIgnorePattern': '_',
        'ignoreRestSiblings': false,
        'varsIgnorePattern': '_',
      },
    ],
    'import/extensions': ['error', 'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }
    ],
    'react/jsx-filename-extension': [
      'error', {
        extensions: ['.jsx', '.tsx']
      }
    ],
    'react/jsx-props-no-spreading': [
      'error', {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        'namedComponents': 'arrow-function'
      }
    ],
    'react-prefer-function-component/react-prefer-function-component': [
      'error',
      {
        allowComponentDidCatch: false
      },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
	    {
		    disallowPrototype: true,
        singleReturnOnly: false,
		    classPropertiesAllowed: false,
	    },
    ],
  },
  overrides: [{
    'files': ['*.tsx'],
    'rules': {
      'react/prop-types': 'off',
    },
  }, ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
