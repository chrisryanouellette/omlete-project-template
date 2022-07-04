import { copyFile as fsCopyFile, PathLike } from "fs";
import { handleMocks } from "../../../tests";
import { copyFile } from "../write";

jest.mock("fs");

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
