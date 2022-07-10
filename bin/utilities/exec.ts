import { exec as fsExec } from "child_process";

const exec = (cmd: string, dir: string = process.cwd()): Promise<void> => {
  return new Promise((resolve, reject) => {
    const child = fsExec(cmd, { cwd: dir }, (error) => {
      if (error) {
        child.kill();
        return reject(error);
      }
    });

    child.stdout?.on("data", function (data) {
      console.log(data.toString());
    });

    child.stderr?.on("data", function (data) {
      console.log(data.toString());
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        return reject(new Error(`yarn install exited with error code ${code}`));
      }
      return resolve();
    });
  });
};

export { exec };
