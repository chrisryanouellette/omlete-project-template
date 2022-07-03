import args from "../args";

describe("The args utility:", () => {
  afterEach(() => {
    process.argv = [];
  });

  it("should return the arguments", () => {
    process.argv = "--template frontend --project test --install false".split(
      " "
    );
    const argv = args();
    expect(argv).toMatchInlineSnapshot(`
      Object {
        "install": "false",
        "interactive": "false",
        "project": "test",
        "template": "frontend",
      }
    `);
  });

  it("should default some arguments", () => {
    const argv = args();
    expect(argv).toMatchInlineSnapshot(`
      Object {
        "install": "true",
        "interactive": "false",
        "project": "project-template",
        "template": "web",
      }
    `);
  });

  it("should set the value to true if only the flag is present", () => {
    process.argv = "--interactive".split(" ");
    const argv = args();
    expect(argv).toMatchInlineSnapshot(`
      Object {
        "install": "true",
        "interactive": "true",
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
