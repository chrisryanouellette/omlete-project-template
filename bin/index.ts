#! /usr/bin/env node

import constants from "./config.json";
import args from "./utilities/args";
import { ask, askOptions, askYesOrNo } from "./utilities/ask";

(async (): Promise<void> => {
  const argv = args();

  if (argv.interactive) {
    try {
      argv.template = await askOptions(
        "What kind of template would you like to use?",
        constants.cliOpts.template.options
      );

      argv.project = await ask(
        "What is the name of your project? Default: my-project"
      );

      if (!argv.project) {
        argv.project = constants.cliOpts.project.default;
      }

      argv.install = await askYesOrNo(
        "Would you like to install the dependencies?"
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  console.log(argv);

  process.exit(0);
})();
