#! /usr/bin/env node

import { resolve } from "path";
import { ask, askOptions, askYesOrNo } from "./utilities/ask";
import { mkdir } from "./utilities/file/dir";
import constants from "./config.json";
import "./prerun";

const main = async (): Promise<void> => {
  // Interactive Section

  const env = process.env;

  if (env.interactive === "true") {
    env.template = await askOptions(
      "What kind of template would you like to use?",
      constants.cliOpts.template.options
    );

    env.project = await ask(
      "What is the name of your project? Default: my-project"
    );

    if (!env.project) {
      env.project = constants.cliOpts.project.default;
    }

    env.install = (
      await askYesOrNo("Would you like to install the dependencies?")
    ).toString();
  }

  if (/[A-Z ]/g.test(env.project)) {
    throw new Error(
      "Project names should only contain lower case letters and underscores or dashes."
    );
  }

  // Begin writing files

  const dir = resolve(process.cwd(), env.project);

  await mkdir(dir);
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
