module.exports = {
  env: {
      browser: true,
      es6: true,
      node: true,
      commonjs: true
  },
  extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jest/recommended"
  ],
  globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
      process: true,
      __isBrowser__: true
  },
  parser: "babel-eslint",
  parserOptions: {
      ecmaFeatures: {
          jsx: true
      },
      ecmaVersion: 2015,
      sourceType: "module"
  },
  plugins: ["react"],
  rules: {
      indent: ["error", 4],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"]
  }
};
