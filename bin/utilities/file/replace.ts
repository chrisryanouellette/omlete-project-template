import { resolve } from "path";
import config from "../../config.json";
import { hasKey } from "../index";
import { readDir } from "./dir";
import readFile from "./read";
import { rename } from "./rename";
import { writeFile } from "./write";

const replace = async (src: string): Promise<string> => {
  let result = src;
  config.replaceInFile.forEach((item) => {
    if (!hasKey(item, process.env)) {
      throw new Error(
        `"${item}" cannot be replace in a file because it is not present on process.env`
      );
    }
    result = result.replace(
      new RegExp(`\\[${item.toUpperCase()}\\]`, "g"),
      process.env[item]
    );
  });
  return result;
};

const findAndReplace = async (root: string): Promise<void> => {
  const items = await readDir(root);
  for (const item of items) {
    const path = resolve(root, item.name);
    if (item.isDirectory()) {
      await findAndReplace(path);
    } else if (item.isFile()) {
      if (item.name.includes("template")) {
        const file = await readFile(path);
        const content = await replace(file);
        await writeFile(path, content);
        await rename(path, path.replace(".template", ""));
      }
      if (/\[\w+\]/.test(item.name)) {
        const newName = await replace(item.name);
        await rename(path, resolve(root, newName));
      }
    }
  }
};

export { replace, findAndReplace };
