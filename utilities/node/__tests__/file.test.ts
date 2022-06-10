import {
  readFile as fsReadFile,
  writeFile as fsWriteFile,
  mkdir as fsMkdir,
  PathLike,
  MakeDirectoryOptions,
} from "fs";
import { readFile, mkdir, writeFile } from "../file";

jest.mock("fs");

const mockedReadFile = fsReadFile as jest.MockedFunction<typeof fsReadFile>;
const mockedMkdir = fsMkdir as jest.MockedFunction<typeof fsMkdir>;
const mockedWriteFile = fsWriteFile as jest.MockedFunction<typeof fsWriteFile>;

describe("The File Utlities:", () => {
  const readFileSuccess = (
    path: Parameters<typeof fsReadFile>[0],
    cb: Parameters<typeof fsReadFile>[1]
  ): ReturnType<typeof fsReadFile> => {
    cb(null, Buffer.from("TEST"));
  };

  const readFileFailed = (
    path: Parameters<typeof fsReadFile>[0],
    cb: Parameters<typeof fsReadFile>[1]
  ): ReturnType<typeof fsReadFile> => {
    cb(new Error("TEST"), Buffer.from(""));
  };

  const mkdirSuccess = (
    path: PathLike,
    opts: MakeDirectoryOptions,
    cb: Parameters<typeof fsMkdir>[1]
  ): void => {
    cb(null);
  };

  const mkdirFailed = (
    path: PathLike,
    opts: MakeDirectoryOptions,
    cb: Parameters<typeof fsMkdir>[1]
  ): void => {
    cb(new Error("TEST"));
  };

  const writeFileSuccess = (
    path: Parameters<typeof fsWriteFile>[0],
    content: Parameters<typeof fsWriteFile>[1],
    cb: Parameters<typeof fsWriteFile>[2]
  ): ReturnType<typeof fsWriteFile> => {
    cb(null);
  };

  const writeFileFailed = (
    path: Parameters<typeof fsWriteFile>[0],
    content: Parameters<typeof fsWriteFile>[1],
    cb: Parameters<typeof fsWriteFile>[2]
  ): ReturnType<typeof fsWriteFile> => {
    cb(new Error("TEST"));
  };

  afterEach(() => {
    mockedReadFile.mockReset();
    mockedWriteFile.mockReset();
  });

  it("Can load a file", async () => {
    mockedReadFile.mockImplementationOnce(readFileSuccess);
    const res = await readFile("./test");
    expect(mockedReadFile).toHaveBeenCalledTimes(1);
    expect(mockedReadFile).toHaveBeenCalledWith("./test", expect.any(Function));
    expect(res).toBe("TEST");
  });

  it("Will fail to read file if the file does not exist", async () => {
    mockedReadFile.mockImplementationOnce(readFileFailed);
    await expect(readFile("./Test")).rejects.toThrowError("TEST");
  });

  it("Can create a directory", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedMkdir.mockImplementationOnce(mkdirSuccess as any);
    await mkdir("./test");
    expect(mockedMkdir).toHaveBeenCalledTimes(1);
    expect(mockedMkdir).toHaveBeenCalledWith(
      "./test",
      { recursive: true },
      expect.any(Function)
    );
  });

  it("Will fail if it cannot make the directory", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedMkdir.mockImplementationOnce(mkdirFailed as any);
    await expect(mkdir("./test")).rejects.toThrowError("TEST");
  });

  it("Can write a file", async () => {
    mockedWriteFile.mockImplementationOnce(writeFileSuccess);
    await writeFile("./test", "TEST");
    expect(mockedWriteFile).toHaveBeenCalledTimes(1);
    expect(mockedWriteFile).toHaveBeenCalledWith(
      "./test",
      "TEST",
      expect.any(Function)
    );
  });

  it("Will can fail to write a file", async () => {
    mockedWriteFile.mockImplementationOnce(writeFileFailed);
    await expect(writeFile("./test", "TEST")).rejects.toThrowError("TEST");
  });
});
