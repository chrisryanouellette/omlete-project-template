import {
  readFile as fsReadFile,
  writeFile as fsWriteFile,
  mkdir as fsMkDir,
} from "fs";

const readFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fsReadFile(path, (err, buff) => {
      if (err) {
        return reject(err);
      }
      return resolve(buff.toString());
    });
  });
};

const mkdir = (path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fsMkDir(path, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

const writeFile = (path: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fsWriteFile(path, content, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

export { readFile, mkdir, writeFile };
