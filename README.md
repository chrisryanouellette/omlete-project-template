# Omlette Project Template

## What is this?

This repo is a project template creator that allows you to quickly bootstrap a monorepo for a React frontend with a Firebase backend.

## How to use it

No need to download this package, simply run `npx @ouellettec/omlette-project-template --interactive` in your desired directory and the CLI tool will ask you a few questions and take care of the rest!

Once installed, you can open the `[Your Project Name].code-workspace` in vs code by selecting `File > Open workspace from file`. It should open a popup in the bottom right corner of the window asking you to install the workspaces recommended extensions, click "Show Recommendations". Install all the recommendations to insure the project's auto formatters and task runners run during development. If it does not appear, you may already have them all installed.

Check the `README.md` in the project's root folder for information on the template's setup and npm scripts.

## What templates are available?

Currently there is a `frontend`, `backend`, and `web` templates. `web` will setup both the `frontend` and `backend` templates.

In the future, we hope to add a react native template.

## What does it setup?

|Feature|Environment ( Frontend / Backend )|Template ( Frontend, Backend, Web )|
|---|---|---|
|React ( Using CRA )|Frontend|Frontend, Web|
|Tailwind CSS|Frontend|Frontend, Web|
|Firebase Functions|Backend|Backend, Web|
|EsLint|Both|All|
|Prettier|Both|All|
|Jest|Both|All|


## Developing this Project

1. Run `yarn` in he root directory to ensure you have the node dependencies installed.
1. Run `yarn develop` in the root folder.
    - You can run `yarn develop --interactive` to start the app in interactive mode.
    - All the source files are in the `/bin` directory. 
1. To debug the code, add `debugger` to where you want the code to stop.
1. Open Chrome and navigate to `chrome://inspect/`.
1. Click open `Open dedicated DevTools for Node`.
1. Type `rs` into the terminal to restart nodemon and re-execute the script.

## Deploying the Project

1. Login to the NPM account with command `npm login --scope=@ouellettec`
1. Run `yarn deploy:check` to ensure the the package has been linted and tested.
1. Run `yarn deploy:test` and check the output to insure the files added are correct.
1. Delete the `.tgz` that was created.
1. Increment the NPM version according to semantic versioning.
1. Commit the changed npm version.
1. Create a new release tag on Github.
1. Run `yarn deploy`.