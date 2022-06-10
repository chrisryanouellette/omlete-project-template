import { processPackageData } from "../process";
import { packages, repos } from "../data";

it("Processes the package JSON data and NPM responses", () => {
  const results = processPackageData(repos, packages);
  expect(results).toMatchInlineSnapshot(`
    Object {
      "backend": Object {
        "dependencies": Object {
          "test-backend": Object {
            "major": false,
            "minor": false,
            "patch": false,
          },
        },
        "devDependencies": Object {},
      },
      "common": Object {
        "dependencies": Object {
          "test-common": Object {
            "major": true,
            "minor": true,
            "patch": true,
          },
        },
        "devDependencies": Object {},
      },
      "frontend": Object {
        "dependencies": Object {},
        "devDependencies": Object {
          "test-frontend": Object {
            "major": true,
            "minor": false,
            "patch": false,
          },
        },
      },
    }
  `);
});
