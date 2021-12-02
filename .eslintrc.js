module.exports = {
  root: true,
  env: {
    node: true
  },
  // plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/typescript/recommended', // 等同于 @vue/eslint-config-typescript/recommended
    '@vue/prettier' // 等同于 @vue/eslint-config-prettier
    // '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    // parser: '@typescript-eslint/parser'    // 在@vue/typescript里面已经引入，所以无需重复
    // ecmaVersion: 2020
  },
  rules: {
    'spaced-comment': 1, // 强制在注释中 // 或 /* 使用一致的空格
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
  // overrides: [
  //   {
  //     files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
  //     env: {
  //       mocha: true
  //     }
  //   }
  // ],
  globals: {
    defineProps: 'readonly'
  }
}
