import { resolve } from "path";
import { mkdir, writeFile } from "@omlette-project-template/utilities/node";
import { NpmComparison, NpmPackage, PackageJson } from "./types";

const writeDataToFile = async (
  jsons: PackageJson,
  npm: NpmPackage,
  comparison: NpmComparison
): Promise<void> => {
  const outPath = resolve(__dirname, "./dist");
  await mkdir(outPath);
  await Promise.all([
    writeFile(resolve(outPath, "packages.json"), JSON.stringify(jsons)),
    writeFile(resolve(outPath, "npm.json"), JSON.stringify(npm)),
    writeFile(resolve(outPath, "comparison.json"), JSON.stringify(comparison)),
  ]);
};

export { writeDataToFile };
