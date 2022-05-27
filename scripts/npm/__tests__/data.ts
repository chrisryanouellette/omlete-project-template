import { NpmComparison, NpmPackage, PackageJson } from "../types";

export const repos: PackageJson = {
  common: {
    dependencies: {
      "test-common": "^1.1.1",
    },
  },
  frontend: {
    devDependencies: {
      "test-frontend": "~2.2.2",
    },
  },
  backend: {
    dependencies: {
      "test-backend": "3.3.3",
    },
  },
};

export const packages: NpmPackage = {
  common: {
    dependencies: {
      "test-common": {
        npm: "www.npm.com",
        url: "www.git.com",
        version: "9.9.9",
      },
    },
    devDependencies: {},
  },
  frontend: {
    dependencies: {},
    devDependencies: {
      "test-frontend": {
        npm: "www.npm.com",
        url: "www.git.com",
        version: "3.2.1",
      },
    },
  },
  backend: {
    dependencies: {
      "test-backend": {
        npm: "www.npm.com",
        url: "www.git.com",
        version: "1.2.3",
      },
    },
    devDependencies: {},
  },
};

export const comparisons: NpmComparison = {
  backend: {
    dependencies: {
      "test-backend": {
        major: false,
        minor: false,
        patch: false,
      },
    },
    devDependencies: {},
  },
  common: {
    dependencies: {
      "test-common": {
        major: true,
        minor: true,
        patch: true,
      },
    },
    devDependencies: {},
  },
  frontend: {
    dependencies: {},
    devDependencies: {
      "test-frontend": {
        major: true,
        minor: false,
        patch: false,
      },
    },
  },
};
