const path = require("path");

module.exports = {
  roots: [path.join(__dirname, "../")],
  rootDir: path.join(__dirname, ".."),
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/__tests__/**"],
  moduleFileExtensions: ["ts", "js"],
  testPathIgnorePatterns: ["<rootDir>/template/", "node_modules"],
  collectCoverageFrom: ["<rootDir>/bin/**/*.ts", "<rootDir>/scripts/**/*.ts"],
  coveragePathIgnorePatterns: [".*/__tests__/.*"],
  projects: [
    require.resolve("./jest.config.bin"),
    require.resolve("./jest.config.scripts"),
  ],
  watchPlugins: [
    require.resolve("jest-watch-select-projects"),
    require.resolve("jest-watch-typeahead/filename"),
    require.resolve("jest-watch-typeahead/testname"),
  ],
};
