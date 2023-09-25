import React, { useEffect, useState } from "react";
import "./CountriesDropdown.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CountryObject, objFromApi } from "../../utilities/model";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { countryCode } from "../../utilities/countryCode"; // importing of the modules

interface DropDownProps {    // dropdown props
  val: CountryObject | null;
  from: CountryObject;
  to: CountryObject;
  switchFlip: boolean;
  setFrom: React.Dispatch<React.SetStateAction<CountryObject>>;
  setTo: React.Dispatch<React.SetStateAction<CountryObject>>;
  handleChange: (e: React.FormEvent) => void;
};


const CountriesDropdown: React.FC<DropDownProps> = ({
  val,
  from,
  to,
  switchFlip,
  setFrom,
  setTo,
  handleChange,
}: DropDownProps) => {
  const [countries, setCountries] = useState<CountryObject[]>([]);


  useEffect(() => {
    countriesCallFunc();  // calling the api's
    console.log('i fire once');
  },[]);

  const countriesCallFunc = () => {
    let countriesObj: objFromApi = {};
     fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((data) => {
        countriesObj = data;
        countryFlagFunc(countriesObj);
      });
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

  const finalDropDownResult = (  // making the final array through this function
    countriesObj: objFromApi,
    countriesFlagObj: objFromApi
  ) => {
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

  useEffect(() => {
    let fromTemp = from;
    setFrom(to);
    setTo(fromTemp);
  }, [switchFlip]);

  

  const handleToCurrency = (event: React.FormEvent, newValue: any) => { 
    setTo(newValue);
    handleChange(event);
  };

// calling the function's on change of dropdowns

  const handleFromCurrency = (event: React.FormEvent, newValue: any) => {
    setFrom(newValue);
    handleChange(event);
  };


  const InputLabelWithIcon: React.FC<{   // icon component
    labelText: string;
    icon: React.ReactNode;
  }> = ({ labelText, icon }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputAdornment position="start">{icon}</InputAdornment>
      {labelText}
    </div>
  );



  return (
    
    <div className="countriesDropdown">
      <div className="from-currency" data-testid="from-currency-input">
      <Autocomplete
        aria-label="From Currency"
        popupIcon={<KeyboardArrowDownIcon style={{ color: "#005698" }} />}
        noOptionsText="No Records Found"
        getOptionLabel={(option: CountryObject) =>
          option.currency === ""
            ? ""
            : `${option?.currency}/${option?.country}`
        }
        options={countries}
        isOptionEqualToValue={(option: CountryObject, value: any) =>
          option.countryFlag === value.countryFlag &&
          option.currency === value.currency
        }
        value={from}
        onChange={(event, newValue) => {
          handleFromCurrency(event, newValue);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            role="option"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option.index}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.countryFlag.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.countryFlag.toLowerCase()}.png`}
              alt="country flag"
            />
           {option.currency === ""
            ? ""
            : `${option?.currency}/${option?.country}`}
          </Box>
        )}
        data-testid="from-currency-input"
        disableClearable={true}
        id="from-currency"
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <InputLabelWithIcon
                labelText="Search Currency"
                icon={<SearchOutlinedIcon />}
              />
            }
            variant="standard"
            
            InputProps={{
              ...params.InputProps,
              type: "search",

              startAdornment:
                params.inputProps.value &&
                (from?.countryFlag ? (
                  <>
                    <InputAdornment position="start">
                      <img
                        alt="country flag"
                        src={`https://flagcdn.com/w20/${from?.countryFlag.toLowerCase()}.png`}
                      />
                    </InputAdornment>
                  </>
                ) : (
                  <></>
                )),
            }}
          />
        )}
      />
      </div>
      <div className="to-currency">

      <Autocomplete
        aria-label="To Currency"
        popupIcon={<KeyboardArrowDownIcon style={{ color: "#005698" }} />}
        noOptionsText="No Records Found"
        getOptionLabel={(option: CountryObject) => 
          option.currency === ""
            ? ""
            : `${option?.currency}/${option?.country}`
        }
        options={countries}
        isOptionEqualToValue={(option: CountryObject, value: any) =>
          option.countryFlag === value.countryFlag &&
          option.currency === value.currency
        }
        value={to}
        onChange={(event, newValue) => {
          handleToCurrency(event, newValue);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            role="option"
            {...props}
            key={option.index}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.countryFlag.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.countryFlag.toLowerCase()}.png`}
              alt="country flag"
            />
                     {option.currency === ""
            ? ""
            : `${option?.currency}/${option?.country}`}
          </Box>
        )}
        id="to-currency"
        disableClearable={true}
        data-testid="to-currency-input"
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <InputLabelWithIcon
                labelText="Search Currency"
                icon={<SearchOutlinedIcon />}
              />
            }
            variant="standard"
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment:
                params.inputProps.value &&
                (to?.countryFlag ? (
                  <>
                    <InputAdornment position="start">
                      <img
                        alt="country flag"
                        src={`https://flagcdn.com/w20/${to?.countryFlag.toLowerCase()}.png`}
                      />
                    </InputAdornment>
                  </>
                ) : (
                  <></>
                )),
            }}
          />
        )}
      /></div>
    </div>
  );
};

export default CountriesDropdown;
