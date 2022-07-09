import { resolve } from "path";
import { Dirent } from "fs";
import { deepReadWrite } from "..";
import { mkdir, readDir } from "../dir";
import { copyFile } from "../write";
import { handleMocks } from "../../../tests";

jest.mock("../dir");
jest.mock("../write");

const mkdirMock = mkdir as jest.MockedFunction<typeof mkdir>;
mkdirMock.mockResolvedValue();

const readDirMock = readDir as jest.MockedFunction<typeof readDir>;
readDirMock.mockResolvedValue([]);

const copyFileMock = copyFile as jest.MockedFunction<typeof copyFile>;
copyFileMock.mockResolvedValue();

const getDirent = (dir = false, file = false): Dirent =>
  ({
    isDirectory: (): boolean => dir,
    isFile: (): boolean => file,
    name: "test",
  } as Dirent);

describe("The deepReadWrite utility:", () => {
  const src = __dirname;
  const dest = __dirname;

  handleMocks(mkdirMock, readDirMock, copyFileMock);

  it("should copy a file to a new destination", async () => {
    await deepReadWrite(src, dest);
    expect(readDirMock).toHaveBeenCalledTimes(1);
    expect(readDirMock).toHaveBeenCalledWith(src);
  });

  it("should call itself if a folder is found", async () => {
    const dirent = getDirent(true);
    readDirMock.mockResolvedValueOnce([dirent]);

    await deepReadWrite(src, dest);
    expect(readDirMock).toHaveBeenCalledTimes(2);
    expect(readDirMock).toHaveBeenNthCalledWith(1, src);
    expect(readDirMock).toHaveBeenNthCalledWith(2, resolve(src, dirent.name));
    expect(mkdirMock).toHaveBeenCalledTimes(1);
    expect(mkdirMock).toHaveBeenCalledWith(resolve(dest, dirent.name));
  });

  it("should call copyFile if a file is found", async () => {
    const dirent = getDirent(false, true);
    readDirMock.mockResolvedValueOnce([dirent]);

    await deepReadWrite(src, dest);
    expect(readDirMock).toHaveBeenCalledTimes(1);
    expect(readDirMock).toHaveBeenCalledWith(src);
    expect(copyFileMock).toHaveBeenCalledTimes(1);
    expect(copyFileMock).toHaveBeenCalledWith(
      resolve(src, dirent.name),
      resolve(dest, dirent.name)
    );
  });

  it("should throw if the item read is not a file or directory", async () => {
    const dirent = getDirent();
    readDirMock.mockResolvedValueOnce([dirent]);

    await expect(deepReadWrite(src, dest)).rejects.toThrow();
  });
});
