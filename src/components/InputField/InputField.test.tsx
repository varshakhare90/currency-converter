import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputField from "./InputField"; // Import your component

describe("InputField Component", () => {
  // Mocking the fetch function to avoid actual API calls
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { USD: 1.23 } }),
      })
    );
  });

  // Clean up after the tests
  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("renders without errors", () => {
    render(<InputField />);
    expect(screen.getByTestId("input-field")).toBeInTheDocument();
  });

  it("updates amount input field correctly", () => {
    render(<InputField />);
    const amountInput = screen.getByLabelText("Amount");

    fireEvent.change(amountInput, { target: { value: "100" } });
    expect(amountInput).toHaveValue("100");
  });

  it("displays an error message for invalid input", () => {
    render(<InputField />);
    const amountInput = screen.getByLabelText("Amount");

    fireEvent.change(amountInput, { target: { value: "invalid" } });
    const errorMessage = screen.getByText("is not a valid number");
    expect(errorMessage).toBeInTheDocument();
  });

  it("switches currency correctly", () => {
    render(<InputField />);
    const switchButton = screen.getByTestId("switch-currency-button");
    
    fireEvent.click(switchButton);
    // Add expectations for verifying currency switch logic
  });

  // Add more test cases for other functionalities

});
