import { copyFile as fsCopyFile } from "fs";

const copyFile = (src: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fsCopyFile(src, dest, 0, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

export { copyFile };
