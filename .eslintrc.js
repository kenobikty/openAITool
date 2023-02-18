module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    curly: 'off',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/no-mutating-props': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/valid-v-for': 'warn',
  },
};
