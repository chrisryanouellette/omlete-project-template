module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/__tests__/**"],
  moduleFileExtensions: ["ts", "js"],
  coveragePathIgnorePatterns: [".*/__tests__/.*"],
  testPathIgnorePatterns: ["node_modules"],
  collectCoverageFrom: ["<rootDir>/**/*.ts"],
  watchPlugins: [
    require.resolve("jest-watch-select-projects"),
    require.resolve("jest-watch-typeahead/filename"),
    require.resolve("jest-watch-typeahead/testname"),
  ],
};
