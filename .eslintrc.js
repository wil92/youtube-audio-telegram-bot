module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    mocha: true
  },
  extends: [
    'standard',
    'plugin:mocha/recommended'
  ],
  plugins: [
    'mocha'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  }
}
