import { rest } from "msw";
import { setupServer } from "msw/node";
import { get } from "../http";

const server = setupServer(
  rest.get("https://localhost/success", (req, res, ctx) => {
    return res(ctx.json({ test: "data" }));
  }),
  rest.get("https://localhost/failed", (req, res, ctx) => {
    return res(ctx.status(404));
  })
);

describe("The HTTP Utility:", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it("Will fetch data from a url", async () => {
    const res = await get("https://localhost/success");
    const data = res.json();
    expect(data).toEqual({ test: "data" });
  });

  it("Can fail to get data from a url", async () => {
    const res = await get("https://localhost/failed");
    expect(res.statusCode).toBe(404);
  });
});
