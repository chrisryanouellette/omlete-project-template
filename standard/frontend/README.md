# [TEMPLATE] Frontend


## Scripts
From the root directory, all scripts can be run with `yarn frontend [Script Name]`. Example, `yarn frontend start`

- `yarn start` - Starts the react app using React Scripts.
- `yarn build` - Builds the frontend using React Scripts and puts the output files in `/build`.
- `yarn deploy` - Deploys the code to the Firebase project.
- `yarn ci` - The linting and testing command the CI server uses to ensure code quality.
- `yarn bundle` - Creates bundle statistics and opens them with Webpack Bundle Analyzer.
- `yarn test` - Runs Jest with React Scripts. Additional configuration for jest is in `package.json`.
- `yarn test:coverage` - Creates a coverage report from Jest. Add `:view` to pen the report in the browser.
- `yarn test:debug` - Runs Jest with a Chrome debugger attached. See [Debugging in Jest](##debugging-in-jest) below for more details.
- `yarn lint` - Checks the code for Typescript and EsLint errors.
- `yarn eslint:fix` - Runs the code through EsLint and fixes any issues.
- `yarn format:fix` - Runs the code through Prettier and fixes any formatting issues.


## Debugging in Jest