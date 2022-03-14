import PeoplePage from "./[id]";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { mswServer } from "../../test-utils/msw-server";
import { singleCharacterHandlerException } from "../../test-utils/server-handlers";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { id: "1" },
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("People page - Error state", () => {
  it("should render error state when api fails", async () => {
    mswServer.use(singleCharacterHandlerException);
    jest.spyOn(console, "error").mockImplementation(jest.fn());

    render(<PeoplePage />);
    await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));

    const error = screen.queryByTestId("error");

    expect(error?.textContent).toEqual(
      "An error occurred, please try again later."
    );
  });
});

describe("People page - Loading state", () => {
  it("should render loader while the page loads", async () => {
    render(<PeoplePage />);

    const loader = await screen.findByTestId("loader");

    expect(loader).toHaveTextContent("Loading...");
  });
});

describe("People page - Loaded state", () => {
  beforeEach(async () => {
    render(<PeoplePage />);

    await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
  });

  it("should display the character's name", () => {
    const name = screen.queryByTestId("name");

    expect(name?.textContent).toEqual("Luke Skywalker");
  });

  it("should display the character's hair color", () => {
    const hair = screen.queryByTestId("hair-color");

    expect(hair?.textContent).toEqual("Hair: blond");
  });

  it("should display the character's eye color", () => {
    const eye = screen.queryByTestId("eye-color");

    expect(eye?.textContent).toEqual("Eyes: blue");
  });

  it("should display the character's gender", () => {
    const gender = screen.queryByTestId("gender");

    expect(gender?.textContent).toEqual("Gender: male");
  });

  it("should display the character's planet", () => {
    const planet = screen.queryByTestId("planet");

    expect(planet?.textContent).toEqual("Planet: Tatooine");
  });

  it("should display the character's films", () => {
    const films = screen.queryByTestId("films")?.childNodes;

    films?.forEach((film) =>
      expect(film).toHaveTextContent("- Revenge of the Sith")
    );
  });
});
