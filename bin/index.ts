#! /usr/bin/env node

import { resolve } from "path";
import { ask, askOptions, askYesOrNo } from "./utilities/ask";
import { hasKey } from "./utilities";
import { mkdir } from "./utilities/file/dir";
import { deepReadWrite, readWrite } from "./utilities/file";
import { findAndReplace } from "./utilities/file/replace";
import { rename } from "./utilities/file/rename";
import { exec } from "./utilities/exec";
import config from "./config.json";
import "./prerun";

const main = async (): Promise<void> => {
  // Interactive Section

  const env = process.env;

  if (env.interactive === "true") {
    env.template = await askOptions(
      "What kind of template would you like to use?",
      config.cliOpts.template.options
    );

    env.project = await ask(
      "What is the name of your project? Default: project-template"
    );

    if (!env.project) {
      env.project = config.cliOpts.project.default;
    }

    env.install = (
      await askYesOrNo("Would you like to install the dependencies?")
    ).toString();

    env.git = (
      await askYesOrNo("Would you like to initial a git repo?")
    ).toString();
  }

  if (/[A-Z ]/g.test(env.project)) {
    throw new Error(
      "Project names should only contain lower case letters and underscores or dashes."
    );
  }

  // Begin writing files

  const src = resolve(__dirname, "../template");
  const dest = resolve(process.cwd(), env.project);
  const templates = hasKey(env.template, config.templateAlias)
    ? config.templateAlias[env.template]
    : [env.template];
  const fsPromises: Promise<void>[] = [];

  await mkdir(dest);
  await mkdir(resolve(dest, ".vscode"));

  /** @TODO improve this to include .vscode folder ( or any non-template folder ) */
  fsPromises.push(readWrite(src, dest));
  fsPromises.push(readWrite(resolve(src, ".vscode"), resolve(dest, ".vscode")));

  /** Write template files */
  for (const template of templates) {
    fsPromises.push(
      (async (): Promise<void> => {
        const templateSrcDir = resolve(src, template);
        const templateDestDir = resolve(dest, template);

        await mkdir(templateDestDir);
        await deepReadWrite(templateSrcDir, templateDestDir);
      })()
    );
  }

  await Promise.all(fsPromises);

  /** Rename files and rewrite file contents */
  await rename(`${dest}/gitignore`, `${dest}/.gitignore`);
  await findAndReplace(dest);

  /** Install dependencies */
  if (process.env.install === "true") {
    await exec("yarn", dest);
  }

  /** Create git repo and commit */
  if (process.env.git === "true") {
    await exec("git init", dest);
    await exec("git add *", dest);
    await exec('git commit -m "Initial Commit"', dest);
  }
};

// The main process
main()
  .then(() => {
    // The end of the script
    console.info("Process done! May the types be with you!");
    process.exit(0);
  })
  .catch((error) => {
    // Will catch any errors that come out of the script
    console.error(error);
    process.exit(1);
  });
