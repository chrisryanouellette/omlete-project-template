import args from "./utilities/args";

try {
  const argv = args();
  process.env.install = argv.install;
  process.env.interactive = argv.interactive;
  process.env.template = argv.template;
  process.env.git = argv.git;
  process.env.project = argv.project;
} catch (error) {
  console.error(error);
  process.exit(1);
}
