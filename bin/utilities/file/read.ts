import { readFile as fsReadFile } from "fs";

const readFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fsReadFile(path, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data.toString());
    });
  });
};

export default readFile;
