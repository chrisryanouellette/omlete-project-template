import { keyInObj } from "@omlette-project-template/utilities/common";
import { NpmComparison, NpmPackage, PackageJson } from "./types";

const processPackageData = (
  packageJson: PackageJson,
  npmPackages: NpmPackage
): NpmComparison => {
  const comparison: NpmComparison = {
    common: {
      dependencies: {},
      devDependencies: {},
    },
    frontend: {
      dependencies: {},
      devDependencies: {},
    },
    backend: {
      dependencies: {},
      devDependencies: {},
    },
  };

  /** Loop through all the monorepos */
  for (const [repo, pkgs] of Object.entries(packageJson)) {
    if (keyInObj(repo, comparison)) {
      /** Loop through the devDependencies / dependencies */
      for (const [type, deps] of Object.entries(pkgs)) {
        if (deps && keyInObj(type, comparison[repo])) {
          /** Loop through each dependencies */
          for (const [name, installedVersion] of Object.entries(deps)) {
            /** latest version SHOULD always be defined */
            const latestVersion = npmPackages[repo]?.[type]?.[name].version;
            if (latestVersion) {
              const [major, minor, patch] = installedVersion
                .replace(/[\^~]/g, "")
                .split(".")
                .map((i) => Number(i));
              const [latestMajor, latestMinor, latestPath] = latestVersion
                .split(".")
                .map((i) => Number(i));

              comparison[repo][type] = {
                ...comparison[repo][type],
                [name]: {
                  major: major < latestMajor,
                  minor: minor < latestMinor,
                  patch: patch < latestPath,
                },
              };
            } else {
              throw new Error(
                `Could not find latest version for package "${name}" in repo ${repo}`
              );
            }
          }
        }
      }
    }
  }

  return comparison;
};

export { processPackageData };
