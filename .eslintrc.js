module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  plugins: ['prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
    // ecmaVersion: 2017
  },
  rules: {
    'prettier/prettier': [
      1,
      {
        printWidth: 120,
        singleQuote: true,
        semi: false,
        arrowParens: 'always',
        jsxBracketSameLine: true,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ],
  globals: {
    defineProps: 'readonly'
  }
}
