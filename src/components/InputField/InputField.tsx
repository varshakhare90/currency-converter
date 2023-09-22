import React,{ useState, useEffect } from 'react';
import './InputField.scss';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from "@mui/material/InputAdornment";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CountriesDropdown from '../CountriesDropdown/CountriesDropdown';

import { countryCode } from "../../utilities/countryCode";
import { CountryObject, objFromApi } from "../../utilities/model";

interface InputProps{
  amountInput: string;
  setAmountInput: React.Dispatch<React.SetStateAction<string>>;
  handleAmountInput: (e: React.FormEvent) =>void;
};

const InputField = ({amountInput, setAmountInput, handleAmountInput }: InputProps) => {

  const [hasError, setHasError] = useState<boolean>(false);
  const [countries, setCountries] = useState<CountryObject[]>([]);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");


  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setAmountInput(e.target.value);
    let testValidNumber = /^\d+(\.\d{1,2})?$/.test(e.target.value);
    if(testValidNumber){
      setHasError(false);
    }else{
      setHasError(true);
    }

  };

  const switchCurrency = () =>{
    console.log('switching');
  };


  const countriesCallFunc = () => {
    let countriesObj: objFromApi = {};
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((data) => {
        countriesObj = data;
        countryFlagFunc(countriesObj);
      });
  };

  const finalDropDownResult = (countriesObj: objFromApi, countriesFlagObj: objFromApi) => {
    const mergedArray: CountryObject[] = [];
    let index: number = 0;
    for (const key3 in countryCode) {
      for (const key1 in countriesObj) {
        if (key1 === key3) {
          for (const key2 in countriesFlagObj) {
            if (countryCode[key1].toLowerCase() === key2) {
              mergedArray.push({
                currency: key1,
                country: countriesObj[key1],
                countryFlag: countryCode[key1].toLowerCase(),
                index: index,
              });
              index++;
            }
          }
        }
      }
    }

    setCountries(mergedArray);
  };

  const countryFlagFunc = (countriesObj: objFromApi) => {
    let countriesFlagObj = {};
    fetch("https://flagcdn.com/en/codes.json")
      .then((res) => res.json())
      .then((data) => {
        countriesFlagObj = data;
        finalDropDownResult(countriesObj, countriesFlagObj);
      });
  };

  useEffect(() => {
    countriesCallFunc();
  }, []);


  return (
    
    <div className='amount-input-field'>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-amount" className='amount-label'>Amount</InputLabel>
          <Input
            id="standard-amount"
            type="string"
            aria-describedby="my-helper-text" 
            inputProps={{inputMode: 'numeric','aria-label': 'Amount'}}
            value={amountInput}
            onChange={(e) => inputChange(e)}
            error= {hasError}
            endAdornment={
              <InputAdornment position="end">
                <SyncAltIcon color="primary" onClick={switchCurrency} /></InputAdornment>
            }
          />
          {hasError && <span id="my-helper-text">{amountInput} is not a valid number.</span>}
          <CountriesDropdown options={countries} 
                        value={from}></CountriesDropdown>
          <CountriesDropdown options={countries} onChange={(e) => { setTo(e.value) }}
                        value={to}></CountriesDropdown>

        </FormControl> 
   
    </div>
  )
}

export default InputField