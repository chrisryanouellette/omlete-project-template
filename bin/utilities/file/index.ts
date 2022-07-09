import { resolve } from "path";
import config from "../../config.json";
import { mkdir, readDir } from "./dir";
import { copyFile } from "./write";

const deepReadWrite = async (src: string, dest: string): Promise<void> => {
  const items = await readDir(resolve(src));
  for (const item of items) {
    if (item.isDirectory()) {
      if (!config.ignoreFolders.includes(item.name)) {
        const subDest = resolve(dest, item.name);
        await mkdir(subDest);
        await deepReadWrite(resolve(src, item.name), subDest);
      }
    } else if (item.isFile()) {
      await copyFile(resolve(src, item.name), resolve(dest, item.name));
    } else {
      throw new Error(`File "${item.name}" is not a valid file type`);
    }
  }
};

export { deepReadWrite };
