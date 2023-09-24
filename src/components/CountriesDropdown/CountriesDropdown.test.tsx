import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import CountriesDropdown from "./CountriesDropdown";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
 

describe('handles user typing in the "from-currency" input', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
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


  const mockProps = {
    val: null,
    from: from,
    to: to,
    switchFlip: false,
    setFrom: jest.fn(),
    setTo: jest.fn(),
    handleChange: jest.fn(),
  };


it("fetches data and calls countryFlagFunc", async () => {
  const data = {
    USD: "United States Dollar",
    EUR: "Euro",
    GBP: "British Pound Sterling",
  };

  fetchMock.mockResponseOnce(JSON.stringify(data));

  const countryFlagFuncMock = jest.fn();
  jest.spyOn<any, any>(CountriesDropdown, "countryFlagFunc").mockImplementation(countryFlagFuncMock);


  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith(
    "https://openexchangerates.org/api/currencies.json"
  );
  expect(countryFlagFuncMock).toHaveBeenCalledTimes(1);
  expect(countryFlagFuncMock).toHaveBeenCalledWith(data);
});


  it("should load countries options from API on component mount", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ USD: "United States" }));
    fetchMock.mockResponseOnce(JSON.stringify({ us: "https://flagcdn.com/w20/us.png" }));
    render(<CountriesDropdown {...mockProps} />);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "https://openexchangerates.org/api/currencies.json");
    expect(fetchMock).toHaveBeenNthCalledWith(2, "https://flagcdn.com/en/codes.json");
  });

  

  it("should handle 'from' currency change", () => {
    
    const newProps = { ...mockProps, from: from, to: to, switchFlip: false };
    render(<CountriesDropdown {...newProps} />);
     expect(mockProps.setFrom).toHaveBeenCalled();
  });

  it("should handle 'to' currency change", () => {
      const newProps = { ...mockProps, from: from, to: to, switchFlip: false };
    render(<CountriesDropdown {...newProps} />);
     expect(mockProps.setTo).toHaveBeenCalled();
  });

});