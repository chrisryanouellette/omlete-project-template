import { Dirent } from "fs";
import { resolve } from "path";
import { readDir } from "../dir";
import readFile from "../read";
import { writeFile } from "../write";
import { rename } from "../rename";
import { findAndReplace, replace } from "../replace";
import { handleMocks } from "../../../tests";

jest.mock("../dir");
jest.mock("../read");
jest.mock("../write");
jest.mock("../rename");

const envMoc = process.env as Partial<typeof process.env>;
const readDirMock = readDir as jest.MockedFunction<typeof readDir>;
readDirMock.mockResolvedValue([]);
const readFileMock = readFile as jest.MockedFunction<typeof readFile>;
const writeFileMock = writeFile as jest.MockedFunction<typeof writeFile>;
const renameMock = rename as jest.MockedFunction<typeof rename>;

const getDirent = (dir = false, file = false, name = "test"): Dirent =>
  ({
    isDirectory: (): boolean => dir,
    isFile: (): boolean => file,
    name,
  } as Dirent);

describe("The replace utility:", () => {
  const src = "TEST";
  const content = "[PROJECT]";
  const result = "RESULT";

  handleMocks(readFileMock, writeFileMock);
  readFileMock.mockResolvedValue(content);

  it("should replace a template string in a file", async () => {
    envMoc.project = result;
    const value = await replace(content);
    expect(value).toEqual(result);
  });

  it("should fail if process.env does not contain a replacement", async () => {
    delete envMoc.project;
    await expect(replace(src)).rejects.toThrow();
  });
});

describe("The findAndReplace utility", () => {
  const root = "/";
  const project = "project-name";

  handleMocks(readDirMock, renameMock);

  it("should replace a files name if it contains square brackets", async () => {
    const src = "[PROJECT].md";
    const result = `${project}.md`;
    envMoc.project = project;

    readDirMock.mockResolvedValueOnce([getDirent(false, true, src)]);

    await findAndReplace(root);

    expect(readDirMock).toHaveBeenCalledTimes(1);
    expect(readDirMock).toHaveBeenCalledWith(root);
    expect(renameMock).toHaveBeenCalledTimes(1);
    expect(renameMock).toHaveBeenCalledWith(
      `${root}${src}`,
      `${root}${result}`
    );
  });

  it("should replace a files contents", async () => {
    const src = "file.template.md";
    const content = "This is your [PROJECT]";
    const result = `This is your ${project}`;
    envMoc.project = project;

    readDirMock.mockResolvedValueOnce([getDirent(false, true, src)]);
    readFileMock.mockResolvedValueOnce(content);

    await findAndReplace(root);

    expect(readDirMock).toHaveBeenCalledTimes(1);
    expect(readDirMock).toHaveBeenCalledWith(root);
    expect(readFileMock).toHaveBeenCalledTimes(1);
    expect(readFileMock).toHaveBeenCalledWith(`${root}${src}`);
    expect(writeFileMock).toBeCalledTimes(1);
    expect(writeFileMock).toHaveBeenCalledWith(`${root}${src}`, result);
  });

  it("should call itself if a directory is found", async () => {
    const dirent = getDirent(true, false);
    readDirMock.mockResolvedValueOnce([dirent]);

    await findAndReplace(root);

    expect(readDirMock).toHaveBeenCalledTimes(2);
    expect(readDirMock).toHaveBeenNthCalledWith(1, root);
    expect(readDirMock).toHaveBeenNthCalledWith(2, resolve(root, dirent.name));
  });
});
