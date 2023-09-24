import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import CountdownTimer from "./CountdownTimer";


// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

test("renders CountdownTimer component", () => {
    render(<CountdownTimer minutes={5} seconds={30} />);
    const countdownTimerElement = screen.getByText(/Expires: 5' 30''/i);
    expect(countdownTimerElement).toBeInTheDocument();
  });
  
  test("renders CountdownTimer component with leading zero for seconds", () => {
    render(<CountdownTimer minutes={8} seconds={5} />);
    const countdownTimerElement = screen.getByText(/Expires: 8' 05''/i);
    expect(countdownTimerElement).toBeInTheDocument();
  });
  
  test("renders CountdownTimer component with 0 minutes and seconds", () => {
    render(<CountdownTimer minutes={0} seconds={0} />);
    const countdownTimerElement = screen.getByText(/Expires: 0' 00''/i);
    expect(countdownTimerElement).toBeInTheDocument();
  });