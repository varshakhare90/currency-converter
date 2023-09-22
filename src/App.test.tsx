import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputField from './components/InputField/InputField';
import App from './App';


// describe('<InputField />', () => {
//   it('renders with the provided amountInput value', () => {
//     render(<App/>)
//     const amountInput = '123';
//     const { getByDisplayValue } = render(
//       <InputField amountInput={amountInput} setAmountInput={() => {}} handleAmountInput={() => {}} />
//     );
//     const inputElement = getByDisplayValue(amountInput);
//     expect(inputElement).toBeInTheDocument();
//   });
// });