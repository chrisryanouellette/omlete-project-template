import { copyFile as fsCopyFile, writeFile as fsWriteFile } from "fs";

const writeFile = (src: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fsWriteFile(src, content, { encoding: "utf8" }, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

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

export { writeFile, copyFile };
