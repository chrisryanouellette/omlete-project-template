import { readFile } from "@omlette-project-template/utilities/node";
import { loadPackageJsonFiles } from "../load";
import { repos } from "../data";

jest.mock("@omlette-project-template/utilities/node");

const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;

it("Loads the package.json files", async () => {
  mockedReadFile.mockResolvedValue(JSON.stringify(repos.common));
  const results = await loadPackageJsonFiles();
  expect(mockedReadFile).toHaveBeenCalledTimes(3);
  expect(results).toMatchInlineSnapshot(`
    Object {
      "backend": Object {
        "dependencies": Object {
          "test-common": "^1.1.1",
        },
        "devDependencies": undefined,
      },
      "common": Object {
        "dependencies": Object {
          "test-common": "^1.1.1",
        },
        "devDependencies": undefined,
      },
      "frontend": Object {
        "dependencies": Object {
          "test-common": "^1.1.1",
        },
        "devDependencies": undefined,
      },
    }
  `);
});

it("Can fail to load the package.json files", async () => {
  mockedReadFile.mockRejectedValue("Error");
  await expect(() => loadPackageJsonFiles()).rejects.toThrow();
});
