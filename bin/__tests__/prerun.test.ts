import config from "../config.json";
import args from "../utilities/args";

jest.mock("../utilities/args");

const argsMock = args as jest.MockedFunction<typeof args>;
argsMock.mockReturnValue({
  template: config.cliOpts.template.default,
  project: config.cliOpts.project.default,
  install: config.cliOpts.install.default,
  interactive: config.cliOpts.interactive.default,
});

const exitMock = jest.spyOn(process, "exit");
const errorLogMock = jest.spyOn(console, "error");

// eslint-disable-next-line @typescript-eslint/no-empty-function
exitMock.mockImplementation((() => {}) as never);
// eslint-disable-next-line @typescript-eslint/no-empty-function
errorLogMock.mockImplementation(() => {});

import "../prerun";

describe("The prerun utility:", () => {
  afterEach(() => {
    argsMock.mockClear();
    exitMock.mockClear();
    errorLogMock.mockClear();
  });

  afterAll(() => {
    argsMock.mockReset();
    exitMock.mockReset();
    errorLogMock.mockReset();
  });

  it("should call the args function", () => {
    expect(argsMock).toHaveBeenCalledTimes(1);
  });

  it("should set the args to the process.env object", () => {
    Object.keys(config.cliOpts).forEach((key) => {
      expect(process.env).toHaveProperty(key);
    });
  });

  it("should throw if the args function fails", () => {
    jest.isolateModules(() => {
      argsMock.mockImplementationOnce(() => {
        throw new Error("ERROR");
      });
      require("../prerun");
      expect(exitMock).toHaveBeenCalledTimes(1);
      expect(errorLogMock).toHaveBeenCalledTimes(1);
    });
  });
});
