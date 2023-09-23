import React, { useEffect, useState } from "react";
import "./CountriesDropdown.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CountryObject, objFromApi } from "../../utilities/model";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { countryCode } from "../../utilities/countryCode";

interface DropDownProps {
  val: CountryObject | null | undefined;
  from: boolean;
  to:  boolean;
  setFrom: React.Dispatch<React.SetStateAction<CountryObject | null | undefined>>;
  setTo:  React.Dispatch<React.SetStateAction<CountryObject | null | undefined>>;
  handleChange: (e: any) => void;
}

const Dropdown: React.FC<DropDownProps> = ({val, from, to, setFrom,setTo, handleChange}: DropDownProps) => {

  const [selectedOption, setSelectedOption] = useState<CountryObject | null>();
  const [countries, setCountries] = useState<CountryObject[]>([]);
  
  console.log('val', val, from, to,  selectedOption)
  

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
                from:false,
                to: false
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
  },[]);

  const handleAuto = (event: any, newValue: any, reason: any) =>{

    console.log('newValue', newValue, from, to)
    console.log('reason', reason)

    if(reason === "clear"){
      setSelectedOption(newValue);
      setFrom(newValue);
    }else{
      
    newValue.from = from;
    newValue.to = to;
    setSelectedOption(newValue);
    if(newValue.from){
      setFrom(newValue);
    }else{
      setTo(newValue);
    }
     
    handleChange(event);
    }

  };

  const InputLabelWithIcon: React.FC<{
    labelText: string;
    icon: React.ReactNode;
  }> = ({ labelText, icon }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputAdornment position="start">{icon}</InputAdornment>
      {labelText}
    </div>
  );

  // const defaultClearIcon = () =>{
  //   setSelectedOption<CountryObject | null>();
  // };

  return (
    <div className="countriedDropdown">
      <Autocomplete
        selectOnFocus
        popupIcon={<KeyboardArrowDownIcon style={{ color: "#005698" }}  />}
        noOptionsText="No Records Found"
        defaultValue={null}
        getOptionLabel={(option: CountryObject) =>
          `${option.currency}/(${option.country})`
        }
        options={countries}
        autoSelect={true}
        isOptionEqualToValue={(option: CountryObject, value: any) =>
          option.countryFlag === value.countryFlag
        }
        value={selectedOption || undefined}
        onChange={(event, newValue, reason) => {
          handleAuto(event, newValue, reason);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
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
            {option.country} ({option.currency})
          </Box>
        )}
        id="disable-close-on-select"
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

              startAdornment: params.inputProps.value && (
                
                  selectedOption?.countryFlag ?<>
                  
                  <InputAdornment position="start">
                  <img
                    alt="country flag"
                    src={`https://flagcdn.com/w20/${selectedOption?.countryFlag.toLowerCase()}.png`}
                  />
                </InputAdornment></> :<></>
                
                
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Dropdown;
