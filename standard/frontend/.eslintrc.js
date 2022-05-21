module.exports = {
  globals: {
    JSX: "readonly",
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
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
