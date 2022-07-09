import { rename as fsRename } from "fs";

const rename = (src: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fsRename(src, dest, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

export { rename };
