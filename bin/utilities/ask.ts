import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** Asks a question to the user via the terminal
 * @example
 * const answer = await ask("What is your name?");
 */
const ask = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(`${question}\n`, (answer) => {
      return resolve(answer);
    });
  });
};

/** Asks a question to the user and requires that answer with one of the options
 * @example
 * const answer = await askOptions("How are you?", ["good", "okay", "bad"]);
 */
const askOptions = async (
  question: string,
  options: string[]
): Promise<ReturnType<typeof ask>> => {
  const newLine = "\n  - ";
  const answer = (
    await ask(question.concat(newLine, options.join(newLine)))
  ).trim();

  if (!options.includes(answer)) {
    const opts = options.join('", "');
    throw new Error(
      `Question "${question}" was answered with "${answer}".\nValid options are "${opts}"`
    );
  }
  return answer;
};

const askYesOrNo = async (question: string): Promise<boolean> => {
  const answer = (await ask(`${question} ( Y/n )`)).trim().toLowerCase();
  if (answer !== "y" && answer !== "n") {
    throw new Error(
      `Question "${question}" was not answered with either "y" or "n"`
    );
  }
  return answer === "y";
};

export { ask, askOptions, askYesOrNo };
