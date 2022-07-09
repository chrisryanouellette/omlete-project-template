import { rename as fsRename, PathLike } from "fs";
import { rename } from "../rename";

jest.mock("fs");

const fsRenameImplementation =
  (result: NodeJS.ErrnoException | null) =>
  (
    oldPath: PathLike,
    newPath: PathLike,
    cb: (args: typeof result) => void
  ): void => {
    cb(result);
  };

const fsRenameMock = fsRename as jest.MockedFunction<typeof fsRename>;

describe("The rename utility:", () => {
  const src = "SRC";
  const dest = "DEST";

  it("should rename a file", async () => {
    fsRenameMock.mockImplementation(fsRenameImplementation(null));
    await rename(src, dest);

    expect(fsRenameMock).toHaveBeenCalledTimes(1);
    expect(fsRenameMock).toHaveBeenCalledWith(src, dest, expect.any(Function));
  });

  it("should throw if the file can not be renamed", async () => {
    fsRenameMock.mockImplementation(fsRenameImplementation(new Error("TEST")));

    await expect(rename(src, dest)).rejects.toThrow();
  });
});
