import { loadPackageJsonFiles } from "./load";
import { processPackageData } from "./process";
import { requestPackageData } from "./request";
import { writeDataToFile } from "./write";

(async (): Promise<void> => {
  try {
    const packagesJsons = await loadPackageJsonFiles();
    const packages = await requestPackageData(packagesJsons);
    const comparison = processPackageData(packagesJsons, packages);
    await writeDataToFile(packagesJsons, packages, comparison);
    // await startHttpServer();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
