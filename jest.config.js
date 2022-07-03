module.exports = {
  // The root of your source code
  // `<rootDir>` is a token Jest substitutes
  roots: ["./bin"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts)?$": "ts-jest",
  },

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // Plugins to enhance watch mode
  // typeahead shows the files that will run when using the file or test filter
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  // Will include all files that match the pattern(s) below
  // This includes files that do not have tests written for them
  collectCoverageFrom: ["./bin/**/*.ts", "!./bin/**/*.test.ts"],

  // This ensures a certain amount of coverage is met
  // If not, the script exits with a failure code 1
  // These metrics should be increased as the project gets more coverage
  // The goal is for each value below to be at least 90
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
};
