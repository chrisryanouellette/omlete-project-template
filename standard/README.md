# [Template]

For information on the frontend see [README.md](./frontend/README.md) file.

For information on the backend see [README.md](./backend/README.md) file.

## Scripts
From the root directory, all scripts can be run with `yarn frontend [Script Name]`. Example, `yarn frontend start`

- `yarn frontend` - Alias for `yarn workspace frontend run`. You can add additional args to the command like so `yarn frontend start`.
- `yarn backend` - Alias for `yarn workspace backend run`. You can add additional args to the command like so `yarn backend start`.
- `yarn start` - Starts the frontend and backend projects.
- `yarn build` - Builds the frontend and backend projects.
- `yarn deploy` - Deploys the frontend and backend projects
- `yarn ci` - Run the CI scripts for the frontend and backend projects.
- `yarn test` - Runs the test scripts for the frontend and backend projects.
- `yarn test:coverage` - Creates a coverage report from Jest for the frontend and backend projects.
- `yarn lint` - Runs the lint scripts for the frontend and backend projects.