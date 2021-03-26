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
    "no-tabs": "error",
    "semi": "error",
    "no-extra-semi": "error",
    "semi-style": "error"
  }
}
