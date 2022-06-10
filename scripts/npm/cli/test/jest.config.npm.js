const path = require("path");

module.exports = {
  ...require("../../../../test/jest.config.common"),
  roots: [path.join(__dirname, "../src")],
  rootDir: path.join(__dirname, "../src"),
  displayName: "NPM",
};
