import { resolve } from "path";
import { readFile } from "@omlette-project-template/utilities/node";
import { Dependencies, PackageJson } from "./types";

const loadPackageJsonFiles = async (): Promise<PackageJson> => {
  const basePath = process.cwd();
  const [common, frontend, backend] = await Promise.allSettled([
    readFile(resolve(basePath, "../../template/package.json")),
    readFile(resolve(basePath, "../../template/frontend/package.json")),
    readFile(resolve(basePath, "../../template/backend/package.json")),
  ]);

  if (
    common.status === "rejected" ||
    frontend.status === "rejected" ||
    backend.status === "rejected"
  ) {
    throw new Error(
      `Error loading a package.json file. common: ${common.status}, frontend: ${frontend.status}, backend: ${backend.status}`
    );
  }

  const commonPackage: Dependencies = JSON.parse(common.value);
  const frontendPackage: Dependencies = JSON.parse(frontend.value);
  const backendPackage: Dependencies = JSON.parse(backend.value);

  return {
    common: {
      dependencies: commonPackage.dependencies,
      devDependencies: commonPackage.devDependencies,
    },
    frontend: {
      dependencies: frontendPackage.dependencies,
      devDependencies: frontendPackage.devDependencies,
    },
    backend: {
      dependencies: backendPackage.dependencies,
      devDependencies: backendPackage.devDependencies,
    },
  };
};

export { loadPackageJsonFiles };
