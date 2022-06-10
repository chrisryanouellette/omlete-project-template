import { keyInObj } from "..";

describe("The Generic Utilities:", () => {
  describe("The keyInObj utility", () => {
    it("Will return true if the key is in an object", () => {
      const val = keyInObj("name", { name: "test" });
      expect(val).toBe(true);
    });
    it("Will return false if the key is in an object", () => {
      const val = keyInObj("fail", { name: "test" });
      expect(val).toBe(false);
    });
  });
});
