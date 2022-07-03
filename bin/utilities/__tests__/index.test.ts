import { hasKey } from "..";

describe("The hasKey utility", () => {
  it("should return true if an object contains the key", () => {
    const result = hasKey("test", { test: "" });
    expect(result).toBe(true);
  });

  it("should return false if the object does not contain the key", () => {
    const result = hasKey("test", { key: "" });
    expect(result).toBe(false);
  });
});
