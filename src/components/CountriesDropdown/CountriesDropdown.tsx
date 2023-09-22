import React, { useEffect, useState } from "react";
import "./CountriesDropdown.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CountryObject, objFromApi } from "../../utilities/model";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const Dropdown: React.FC = ({options: CountryObject, , value}) => {

  const [selectedOption, setSelectedOption] = useState<CountryObject | null>(null);


  const InputLabelWithIcon: React.FC<{
    labelText: string;
    icon: React.ReactNode;
  }> = ({ labelText, icon }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputAdornment position="start">{icon}</InputAdornment>
      {labelText}
    </div>
  );

  return (
    <div className="countriedDropdown">
      <Autocomplete
        selectOnFocus
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        getOptionLabel={(option: CountryObject) =>
          `${option.currency}/(${option.country})`
        }
        options={countries}
        autoSelect={true}
        isOptionEqualToValue={(option: CountryObject, value: any) =>
          option.countryFlag === value.countryFlag
        }
        value={selectedOption || undefined}
        onChange={(event, newValue) => {
          setSelectedOption(newValue);
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
                <InputAdornment position="start">
                  <img
                    alt="country flag"
                    src={`https://flagcdn.com/w20/${selectedOption?.countryFlag.toLowerCase()}.png`}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Dropdown;
