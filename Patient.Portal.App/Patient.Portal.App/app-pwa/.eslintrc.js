module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': 'off',
    'new-cap': 'off',
    'no-undef': 'warn',
    'no-empty': 'warn',
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/multi-word-component-names': 'off',
    'prefer-regex-literals': 'off'
  }
}
