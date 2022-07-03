import { ask, askOptions, askYesOrNo } from "../ask";

const questionFn =
  (answer: string) =>
  (question: string, cb: (response: string) => void): void => {
    cb(answer);
  };

const questionMock = jest.fn();

jest.mock("readline", () => ({
  ...jest.requireActual("readline"),
  createInterface: jest.fn(() => ({
    question: (...args: Parameters<typeof questionFn>): void =>
      questionMock(...args),
  })),
}));

const question = "TEST";

afterAll(() => {
  jest.resetAllMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("The ask utility:", () => {
  it("should ask a question", async () => {
    questionMock.mockImplementationOnce(questionFn(question));
    await ask(question);
    expect(questionMock).toHaveBeenCalledTimes(1);
    expect(questionMock).toHaveBeenCalledWith(question, expect.any(Function));
  });

  it("should receive an answer", async () => {
    questionMock.mockImplementationOnce(questionFn(question));
    const answer = await ask(question);
    expect(answer).toBe(question);
  });
});

describe("The askOptions utility:", () => {
  it("should display the options provided", async () => {
    const options = ["OPT1", "OPT2"];
    const newLine = "\n  - ";
    const fullQuestion = question.concat(newLine, options.join(newLine), "\n");
    questionMock.mockImplementationOnce(questionFn(options[0]));
    await askOptions(question, options);
    expect(questionMock).toHaveBeenCalledTimes(1);
    expect(questionMock).toHaveBeenCalledWith(
      fullQuestion,
      expect.any(Function)
    );
  });

  it("should accept an answer if it is a valid option", async () => {
    const options = ["OPT1", "OPT2"];
    questionMock.mockImplementationOnce(questionFn(options[0]));
    const answer = await askOptions(question, options);
    expect(answer).toBe(options[0]);
  });

  it("should throw if an invalid answer was entered", async () => {
    const options = ["OPT1", "OPT2"];
    questionMock.mockImplementationOnce(questionFn("INVALID"));
    await expect(askOptions(question, options)).rejects.toThrow();
  });
});

describe("The askYesOrNo utility:", () => {
  it("should accept an answer if it is either y or n", async () => {
    questionMock.mockImplementationOnce(questionFn("Y"));
    const answer = await askYesOrNo(question);
    expect(answer).toBe("y");
  });

  it("should throw if it is not answered with either y or n", async () => {
    questionMock.mockImplementationOnce(questionFn("INVALID"));
    await expect(askYesOrNo(question)).rejects.toThrow();
  });
});
