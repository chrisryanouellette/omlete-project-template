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
    "plugin:import/recommended",
    "plugin:import/typescript",
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
    "valid-jsdoc": 0,
    "import/order": 2,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
  },
};
