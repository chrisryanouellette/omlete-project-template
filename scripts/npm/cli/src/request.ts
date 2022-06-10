import { keyInObj } from "@omlette-project-template/utilities/common";
import { get } from "@omlette-project-template/utilities/node";
import { NpmPackage, NpmPackageResponse, PackageJson } from "./types";

const requestPackageData = async (
  packages: PackageJson
): Promise<NpmPackage> => {
  const url = "https://api.npms.io";
  const path = "v2/package";

  const response: NpmPackage = {
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

  /** Loop through monorepos */
  for (const [repo, pkgs] of Object.entries(packages)) {
    if (keyInObj(repo, response)) {
      /** Loop through the devDependencies / dependencies */
      for (const [type, deps] of Object.entries(pkgs)) {
        if (deps && keyInObj(type, response[repo])) {
          const promises: Promise<void>[] = [];
          /** Loop through each dependencies */
          Object.keys(deps).forEach((name) => {
            const endpoint = `${url}/${path}/${encodeURIComponent(name)}`;
            const promise = get<NpmPackageResponse>(endpoint).then((value) => {
              if (value.statusCode === 200) {
                const body = value.json();
                response[repo][type] = {
                  ...response[repo][type],
                  [name]: {
                    version: body.collected.metadata.version,
                    npm: body.collected.metadata.links.npm,
                    url: body.collected.metadata.repository.url,
                  },
                };
              } else {
                throw new Error(
                  `Package "${name}" responded with code ${value.statusCode}`
                );
              }
            });
            promises.push(promise);
          });
          await Promise.all(promises);
        }
      }
    }
  }
  return response;
};

export { requestPackageData };
