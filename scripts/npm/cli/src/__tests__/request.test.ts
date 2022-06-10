import { rest } from "msw";
import { setupServer } from "msw/node";
import { requestPackageData } from "../request";
import { NpmPackageResponse } from "../types";
import { repos } from "../data";

const server = setupServer(
  rest.get("https://api.npms.io/v2/package/:name", (req, res, ctx) => {
    const name = Array.isArray(req.params.name)
      ? req.params.name[0]
      : req.params.name;
    const response: NpmPackageResponse = {
      collected: {
        metadata: {
          name,
          version: "9.9.9",
          repository: {
            type: "git",
            url: "www.git.com",
          },
          links: {
            npm: "www.npm.com",
          },
        },
      },
    };
    return res(ctx.json(response));
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

it("Makes a request to NPM", async () => {
  const res = await requestPackageData(repos);
  expect(res).toMatchInlineSnapshot(`
      Object {
        "backend": Object {
          "dependencies": Object {
            "test-backend": Object {
              "npm": "www.npm.com",
              "url": "www.git.com",
              "version": "9.9.9",
            },
          },
          "devDependencies": Object {},
        },
        "common": Object {
          "dependencies": Object {
            "test-common": Object {
              "npm": "www.npm.com",
              "url": "www.git.com",
              "version": "9.9.9",
            },
          },
          "devDependencies": Object {},
        },
        "frontend": Object {
          "dependencies": Object {},
          "devDependencies": Object {
            "test-frontend": Object {
              "npm": "www.npm.com",
              "url": "www.git.com",
              "version": "9.9.9",
            },
          },
        },
      }
    `);
});
