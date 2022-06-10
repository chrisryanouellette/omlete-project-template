import { exec } from "child_process";

const startHttpServer = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const proc = exec("yarn http-server ./dist -o ./dist/npm/frontend/");

    proc.stdout?.on("data", (data) => console.log(data));
    proc.on("exit", () => resolve());
    proc.on("error", (err) => reject(err));
  });
};

export { startHttpServer };
