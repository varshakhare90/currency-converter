import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    expect(screen.getByText(/Currency Converter/)).toBeInTheDocument();
  });

  test("shows the amount input field", () => {
    render(<App />);
    expect(screen.getByTestId("amount-label")).toBeInTheDocument();
  });

  test("updates the amount input value", () => {
    render(<App />);

//     userEvent.type(screen("Amount"), "100")

//    expect(screen.getByLabelText("Amount")).toHaveValue("100");
  });
});

