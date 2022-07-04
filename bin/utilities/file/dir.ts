import { mkdir as fsMkdir, readdir as fsReaddir, Dirent } from "fs";

const mkdir = (path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fsMkdir(path, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

const readDir = (path: string): Promise<Dirent[]> => {
  return new Promise((resolve, reject) => {
    fsReaddir(path, { withFileTypes: true }, (error, files) => {
      if (error) {
        return reject(error);
      }
      return resolve(files);
    });
  });
};

export { mkdir, readDir };
