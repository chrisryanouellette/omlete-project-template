module.exports = {
  ...require("./jest.config.common"),
  displayName: "bin",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["<rootDir>/bin/**__tests__/*.test.*"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/bin/**/*.ts"],
  coveragePathIgnorePatterns: [".*/__tests__/.*"],
};
