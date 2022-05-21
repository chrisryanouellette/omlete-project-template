module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  globals: {
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "google",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 2,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
  },
};
