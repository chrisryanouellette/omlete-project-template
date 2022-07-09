import {
  copyFile as fsCopyFile,
  writeFile as fsWriteFile,
  PathLike,
  PathOrFileDescriptor,
  WriteFileOptions,
} from "fs";
import { handleMocks } from "../../../tests";
import { writeFile, copyFile } from "../write";

jest.mock("fs");

const writeFileImplementation =
  (result: NodeJS.ErrnoException | null) =>
  (
    src: PathOrFileDescriptor,
    data: string | ArrayBufferView,
    opts: WriteFileOptions,
    cb: (err: typeof result) => void
  ): void => {
    cb(result);
  };

const fsWriteFileMock = fsWriteFile as jest.MockedFunction<typeof fsWriteFile>;

const fsCopyFileImplementation =
  (result: NodeJS.ErrnoException | null) =>
  (
    src: PathLike,
    dest: PathLike,
    mode: number,
    cb: (err: typeof result) => void
  ): void => {
    cb(result);
  };

const fsCopyFileMock = fsCopyFile as jest.MockedFunction<typeof fsCopyFile>;

describe("The writeFile utility:", () => {
  const src = "TEST";
  const content = "CONTENT";

  handleMocks(fsWriteFileMock);

  it("should write a file", async () => {
    fsWriteFileMock.mockImplementationOnce(
      writeFileImplementation(null) as typeof fsWriteFile
    );

    await writeFile(src, content);
    expect(fsWriteFileMock).toHaveBeenCalledTimes(1);
    expect(fsWriteFileMock).toHaveBeenLastCalledWith(
      src,
      content,
      { encoding: "utf8" },
      expect.any(Function)
    );
  });

  it("should throw if the file can not be written", async () => {
    fsWriteFileMock.mockImplementationOnce(
      writeFileImplementation(new Error("ERROR")) as typeof fsWriteFile
    );

    await expect(writeFile(src, content)).rejects.toThrow();
  });
});

describe("The copyFile utility:", () => {
  const src = "TEST";
  const dest = "OUTPUT";

  handleMocks(fsCopyFileMock);

  it("should copy a file if it exists", async () => {
    fsCopyFileMock.mockImplementationOnce(fsCopyFileImplementation(null));
    await copyFile(src, dest);
    expect(fsCopyFileMock).toHaveBeenCalledTimes(1);
    expect(fsCopyFileMock).toBeCalledWith(src, dest, 0, expect.any(Function));
  });

  it("should throw if the file can not be copied", async () => {
    fsCopyFileMock.mockImplementationOnce(
      fsCopyFileImplementation(new Error("ERROR"))
    );
    await expect(copyFile(src, dest)).rejects.toThrow();
  });
});
