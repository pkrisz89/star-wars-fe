import ListPage from "./";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { mswServer } from "../test-utils/msw-server";
import { peopleHandlerException } from "../test-utils/server-handlers";

describe("List page - Error state", () => {
  it("should render error state when api fails", async () => {
    mswServer.use(peopleHandlerException);
    jest.spyOn(console, "error").mockImplementation(jest.fn());

    render(<ListPage />);
    await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));

    const error = screen.queryByTestId("error");

    expect(error?.textContent).toEqual(
      "An error occurred, please try again later."
    );
  });
});

describe("List page - Loading state", () => {
  it("should render loader while the page loads", async () => {
    render(<ListPage />);
    const loader = await screen.findByTestId("loader");

    expect(loader).toHaveTextContent("Loading...");
  });
});

describe("List page - Loaded state", () => {
  beforeEach(async () => {
    render(<ListPage />);

    await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
  });

  it("should render 2 cards", async () => {
    const card = screen.queryAllByTestId("character-card");

    expect(card).toHaveLength(2);
  });

  it("should display the name of the characters", async () => {
    const [name, name2] = screen.queryAllByTestId("name");

    expect(name.textContent).toEqual("Luke Skywalker");
    expect(name2.textContent).toEqual("C-3PO");
  });

  it("should display gender of the characters", async () => {
    const [gender, gender2] = screen.queryAllByTestId("gender");

    expect(gender.textContent).toEqual("Gender: male");
    expect(gender2.textContent).toEqual("Gender: n/a");
  });

  it("should display planet of character", async () => {
    const [planet, planet2] = screen.queryAllByTestId("planet");

    expect(planet.textContent).toEqual("Planet: Tatooine");
    expect(planet2.textContent).toEqual("Planet: Tatooine");
  });

  it("cards should point to the correct url", async () => {
    const [cardDetails, cardDetails2] = screen.queryAllByTestId("card-details");

    expect(cardDetails.getAttribute("href")).toEqual("/people/1");
    expect(cardDetails2.getAttribute("href")).toEqual("/people/2");
  });
});
