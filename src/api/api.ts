import { CountryObject, objFromApi } from "../utilities/model";
import { countryCode } from "../utilities/countryCode";

  export function countriesCallFunc(setCountries: any){
    let countriesObj: objFromApi = {};
     fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((data) => {
        countriesObj = data;
        countryFlagFunc(countriesObj, setCountries);
      });
  };

  const countryFlagFunc = (countriesObj: objFromApi, setCountries: any) => {
    let countriesFlagObj = {};
     fetch("https://flagcdn.com/en/codes.json")
      .then((res) => res.json())
      .then((data) => {
        countriesFlagObj = data;
        finalDropDownResult(countriesObj, countriesFlagObj, setCountries);
      });
  };

  const finalDropDownResult = (  // making the final array through this function
    countriesObj: objFromApi,
    countriesFlagObj: objFromApi,
    setCountries: any
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
