import { resolve } from "path";
import { writeFile, mkdir } from "../../utilities/file";
import { writeDataToFile } from "../write";
import { comparisons, packages, repos } from "./data";

jest.mock("../../utilities/file.ts");
const writeFileMock = writeFile as jest.MockedFunction<typeof writeFile>;
const mkdirMock = mkdir as jest.MockedFunction<typeof mkdir>;

beforeAll(() => {
  writeFileMock.mockResolvedValue();
  mkdirMock.mockResolvedValue();
});

afterAll(() => {
  writeFileMock.mockClear();
  mkdirMock.mockClear();
});

it("Can write the files to the dist directory", async () => {
  await writeDataToFile(repos, packages, comparisons);
  expect(mkdirMock).toHaveBeenCalledTimes(1);
  expect(mkdirMock).toHaveBeenCalledWith(resolve(__dirname, "../dist"));
  expect(writeFileMock).toHaveBeenCalledTimes(3);
});
