module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: "readonly",
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
    "../.eslintrc.js",
  ],
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
