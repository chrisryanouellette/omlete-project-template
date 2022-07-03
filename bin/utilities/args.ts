import { hasKey } from ".";
import constants from "../constant.json";

type CliOptions = typeof constants.cliOpts;
type ArgsReturn = { [K in keyof CliOptions]: CliOptions[K]["default"] };
const cliOpts = constants.cliOpts;

/** Returns the arguments passed to the CLI as an object */
const args = (): ArgsReturn => {
  const argv = process.argv;
  const args: ArgsReturn = {
    template: cliOpts.template.default,
    project: cliOpts.project.default,
    install: cliOpts.install.default,
    interactive: cliOpts.interactive.default,
  };

  argv.forEach((flag, index, arr) => {
    if (!flag.startsWith("--")) {
      // Only process items that begin with "--"
      return;
    }

    // Remove the "--"
    const arg = flag.replace(/-/g, "");

    if (!hasKey(arg, cliOpts)) {
      // The flag needs to be a valid CLI option
      throw new Error(`CLI arg "${flag}" is not a valid CLI option.`);
    }

    const item = cliOpts[arg] as {
      options?: string[];
      default?: string | boolean;
    };
    const options = item.options;
    const value = arr[index + 1];

    // Check if the value is set and it is not the next flag
    const hasValue = value !== undefined && !value.includes("--");

    if (!hasValue && item.default === null) {
      // The user used a flag that requires a value
      throw new Error(
        `CLI arg "${flag}" was given with no value but requires one to be used`
      );
    }

    if (options && !options.includes(value)) {
      // Ensure the value passed is valid
      const opts = options.join('", "');
      throw new Error(`CLI arg "${flag}" is invalid. Instead choose "${opts}"`);
    }

    /** @TODO remove this switch statement */
    switch (arg) {
      case "install":
      case "interactive": {
        args[arg] = !hasValue ? true : value === "true";
        break;
      }
      case "project":
      case "template": {
        args[arg] = value;
        break;
      }
    }
  });

  return args;
};

export default args;
