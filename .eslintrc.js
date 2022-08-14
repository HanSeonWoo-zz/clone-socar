module.exports = {
  settings: {
    'import/ignore': ['react-native'],
  },
  extends: ['plugin:prettier/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'angular',
            group: 'external',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
};
