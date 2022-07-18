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
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
    "../.eslintrc.js",
  ],
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
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
