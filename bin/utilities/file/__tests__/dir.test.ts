import {
  mkdir as fsMkdir,
  readdir as fsReaddir,
  PathLike,
  Dirent,
  ObjectEncodingOptions,
} from "fs";
import { handleMocks } from "../../../tests";
import { mkdir, readDir } from "../dir";

const dir = "TEST";

const mkdirImplementation =
  (result: NodeJS.ErrnoException | null) =>
  (path: PathLike, cb: (error: typeof result) => void): void => {
    return cb(result);
  };

const readdirImplementation =
  (responseError: NodeJS.ErrnoException | null, responseFiles: Dirent[]) =>
  (
    path: PathLike,
    options: ObjectEncodingOptions & {
      withFileTypes: true;
    },
    cb: (error: typeof responseError, files: typeof responseFiles) => void
  ): void => {
    cb(responseError, responseFiles);
  };

jest.mock("fs");

const fsMkdirMock = fsMkdir as jest.MockedFunction<typeof fsMkdir>;
const fsReaddirMock = fsReaddir as jest.MockedFunction<typeof fsReaddir>;

handleMocks(fsMkdirMock, fsReaddirMock);

describe("The mkdir utility:", () => {
  it("should create the directory if possible", async () => {
    fsMkdirMock.mockImplementationOnce(mkdirImplementation(null));
    await mkdir(dir);
    expect(fsMkdirMock).toBeCalledTimes(1);
    expect(fsMkdirMock).toHaveBeenCalledWith(dir, expect.any(Function));
  });

  it("should throw if the directory cannot be created", async () => {
    fsMkdirMock.mockImplementationOnce(mkdirImplementation(new Error("Error")));
    await expect(mkdir(dir)).rejects.toThrow();
  });
});

describe("the readdir utility:", () => {
  it("should return the files in a directory", async () => {
    fsReaddirMock.mockImplementationOnce(
      readdirImplementation(null, [new Dirent()])
    );
    const files = await readDir(dir);
    expect(files).toHaveLength(1);
    expect(files).toMatchInlineSnapshot(`
      Array [
        Dirent {
          "isBlockDevice": [MockFunction],
          "isCharacterDevice": [MockFunction],
          "isDirectory": [MockFunction],
          "isFIFO": [MockFunction],
          "isFile": [MockFunction],
          "isSocket": [MockFunction],
          "isSymbolicLink": [MockFunction],
        },
      ]
    `);
  });

  it("should throw if the directory cannot be read", async () => {
    fsReaddirMock.mockImplementationOnce(
      readdirImplementation(new Error("TEST"), [new Dirent()])
    );
    await expect(readDir(dir)).rejects.toThrow();
  });
});
