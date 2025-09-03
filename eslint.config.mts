import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } }, ,

  {
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    rules: {
      semi: 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ignores: ['dist'],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];