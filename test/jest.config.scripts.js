module.exports = {
  ...require("./jest.config.common"),
  displayName: "scripts",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["<rootDir>/scripts/**/__tests__/*.test.*"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/scripts/**/*.ts"],
  coveragePathIgnorePatterns: [".*/__tests__/.*"],
};
