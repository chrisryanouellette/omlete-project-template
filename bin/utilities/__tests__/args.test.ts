import args from "../args";

describe("The args utility:", () => {
  it("should return the arguments", () => {
    process.argv = "--template frontend --project test".split(" ");
    const argv = args();
    expect(argv).toMatchInlineSnapshot(`
      Object {
        "install": true,
        "interactive": false,
        "project": "test",
        "template": "frontend",
      }
    `);
  });

  it("should default some arguments", () => {
    process.argv = [];
    const argv = args();
    expect(argv).toMatchInlineSnapshot(`
      Object {
        "install": true,
        "interactive": false,
        "project": "project-template",
        "template": "web",
      }
    `);
  });

  it("should throw if an invalid argument is passed", () => {
    process.argv = "--invalid arg".split(" ");
    expect(() => args()).toThrow(
      `CLI arg "--invalid" is not a valid CLI option.`
    );
  });
});
