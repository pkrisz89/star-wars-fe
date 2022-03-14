import { getPath } from "./getPath";

describe("Get path", () => {
  it("should return the correct pathname without /api", () => {
    const path = "https://swapi.dev/api/people/10/";
    const expected = "people/10/";

    expect(getPath(path)).toBe(expected);
  });

  it("should return the original pathname when it does not start with api", () => {
    const path = "https://swapi.dev/something/people/10/";
    const expected = "/something/people/10/";

    expect(getPath(path)).toBe(expected);
  });
});
