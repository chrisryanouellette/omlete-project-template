import { readFile as fsReadFile, PathOrFileDescriptor } from "fs";
import { handleMocks } from "../../../tests";
import readFile from "../read";

jest.mock("fs");

const fileContents = "TEST";
const filePath = "./TEST";

const fsReadFileImplementation =
  (responseError: NodeJS.ErrnoException | null, responseData: Buffer) =>
  (
    path: PathOrFileDescriptor,
    cb: (error: typeof responseError, data: typeof responseData) => void
  ): void => {
    return cb(responseError, responseData);
  };

const fsReadFileMock = fsReadFile as jest.MockedFunction<typeof fsReadFile>;
fsReadFileMock.mockImplementation(
  fsReadFileImplementation(null, Buffer.from(fileContents))
);

describe("the readFile utility:", () => {
  handleMocks(fsReadFileMock);

  it("should read a file it is exists", async () => {
    const result = await readFile(filePath);
    expect(fsReadFileMock).toHaveBeenCalledTimes(1);
    expect(fsReadFileMock).toHaveBeenCalledWith(filePath, expect.any(Function));
    expect(result).toBe(fileContents);
  });

  it("should throw if the file can not be read", async () => {
    fsReadFileMock.mockImplementationOnce(
      fsReadFileImplementation(new Error("TEST"), Buffer.from(fileContents))
    );
    await expect(readFile).rejects.toThrow();
  });
});
