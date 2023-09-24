import React from 'react';
import { render, fireEvent , screen} from '@testing-library/react';
import InputField from './components/InputField/InputField';
import App from './App';

describe('App component', () => {
  it('should render without errors', () => {
    render(<App />);
    const inputField = screen.getByTestId('Amount Input');
    expect(inputField).toBeInTheDocument();
  });

  it('should update the input value when typing', () => {
    render(<App />);
    const inputField = screen.getByTestId('Amount Input');
    fireEvent.change(inputField, { target: { value: '123' } });
    expect(inputField).toHaveValue('123');
  });

  // You can write more test cases as needed.
});
