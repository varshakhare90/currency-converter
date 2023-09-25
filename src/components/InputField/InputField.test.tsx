import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import InputField from "./InputField";
import CountriesDropdown from "../CountriesDropdown/CountriesDropdown";

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

const from = {
    country: "United States",
    currency: "USD",
    countryFlag: "USD",
    index: 0,
  };
  const to = {
    country: "Euro",
    currency: "EUR",
    countryFlag: "EUR",
    index: 1,
  };


describe("InputField", () => {
  const mockProps = {
    val: null,
    from: from,
    to: to,
    switchFlip: false,
    setFrom: jest.fn(),
    setTo: jest.fn(),
    handleChange: jest.fn(),
  };

  it("should update amountInput", () => {
    const setAmountInput = jest.fn();
    const handleAmountInput = jest.fn();

    render(
      <InputField
        amountInput=""
        setAmountInput={setAmountInput}
        handleAmountInput={handleAmountInput}
      />
    );

    const input = screen.getByLabelText("Amount");
    fireEvent.change(input, { target: { value: "10" } });

    expect(setAmountInput).toHaveBeenCalledTimes(1);
    expect(setAmountInput).toHaveBeenCalledWith("10");
  });



  it("should convert currency", () => {

    const mockRateData: Object = { 
        USD: 1.2,
        EUR: 1.5
    };


    render(
      <InputField
        amountInput="10"
        setAmountInput={jest.fn()}
        handleAmountInput={jest.fn()}
      />
    );


  const convertCurrency = jest.fn();
  jest.spyOn<any, any>(CountriesDropdown, "convertCurrency").mockImplementation(convertCurrency);
  expect(convertCurrency).toHaveBeenCalledTimes(1);
  expect(convertCurrency).toHaveBeenCalledWith(mockRateData);

  });

  it("should show error when amountInput is empty", () => {
   
    const convertCurrency = jest.fn();

    render(
      <InputField
        amountInput=""
        setAmountInput={jest.fn()}
        handleAmountInput={jest.fn()}
      />
    );
    convertCurrency();
    const error = screen.getByTestId("has-error");
    const convertBtn = screen.getByTestId("convert-buttton");
    expect(convertBtn).toBeInTheDocument();
    
    expect(convertCurrency).toHaveBeenCalledTimes(1);
    expect(error).toBe([
      { error: true, errorMsg: "Please enter a number." },
    ]);
    
  });

  it("should update 'from' and 'to' values on switchFlip change", () => {
    const from = {
      country: "United States",
      currency: "USD",
      countryFlag: "USD",
      index: 0,
    };
    const to = {
      country: "Euro",
      currency: "EUR",
      countryFlag: "EUR",
      index: 1,
    };
    const newProps = { ...mockProps, from: from, to: to, switchFlip: true };

    const { rerender } = render(<CountriesDropdown {...mockProps} />);
    rerender(<CountriesDropdown {...newProps} />);

    expect(mockProps.setFrom).toHaveBeenCalledWith(to);
    expect(mockProps.setTo).toHaveBeenCalledWith(from);
  });
});
