import React, { useState, useEffect } from "react";
import "./InputField.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CountriesDropdown from "../CountriesDropdown/CountriesDropdown";
import { CountryObject, ErrorObj } from "../../utilities/model";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import Alert from "@mui/material/Alert";

interface InputProps {
  amountInput: string;
  setAmountInput: React.Dispatch<React.SetStateAction<string>>;
  handleAmountInput: (e: React.FormEvent) => void;
}

const initialErrorVal = {
  error: false,
  errorMsg: "",
};

const dropdownInitialValue = {
  country: "",
  currency: "",
  countryFlag:"",
  index: 0
};

const InputField = ({
  amountInput,
  setAmountInput,
  handleAmountInput,
}: InputProps) => {
  const [hasError, setHasError] = useState<ErrorObj[]>([initialErrorVal]);
  const [from, setFrom] = useState<CountryObject>(dropdownInitialValue);
  const [to, setTo] = useState<CountryObject>(dropdownInitialValue);
  const [rateData, setRateData] = useState<any>();
  const [selectedFromCurr, setSelectedFromCurr] = useState<string>("");
  const [alertCurrFlag, setAlertCurrFlag] = useState<boolean>(false);
  const [selectedToCurr, setSelectedToCurr] = useState<string>("");
  const [convertedAmt, setConvertedAmt] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(600); // Set the initial time in seconds
  const [switchFlip, setSwitchFlip] = useState<boolean>(false);

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmountInput(e.target.value);
    let testValidNumber = /^\d+(\.\d{1,2})?$/.test(e.target.value);
    if (testValidNumber) {
      setHasError([{ error: false, errorMsg: "" }]);
    } else {
      setHasError([
        { error: true, errorMsg: `${e.target.value} is not a valid number` },
      ]);
    }
    resetValues();
  };

  const resetValues = () =>{
    setConvertedAmt(0);
    setTimeLeft(600);
    setAlertCurrFlag(false);
    setSelectedFromCurr("");
    setSelectedToCurr("");
  };

  const switchCurrency = () => {
    console.log("switching", from, to);
    setSwitchFlip(!switchFlip);
  
  };

  const rateApiCall = () => {
    fetch("https://api.exchangerate-api.com/v4/latest/GBP")
      .then((res) => res.json())
      .then((data) => {
        console.log("rates", data);
        setRateData(data.rates);
      });
  };

  const convertCurrency = () => {
    console.log(
      "from covert currency",
      from,
      to,
      selectedFromCurr,
      selectedToCurr,
      rateData
    );

    setConvertedAmt(0);
    setTimeLeft(600);
    setAlertCurrFlag(false);

    if (amountInput === "") {
      setHasError([{ error: true, errorMsg: "Please enter a number." }]);
    } else if (from.currency !=="" && to.currency !== "") {
      setHasError([{ error: false, errorMsg: "" }]);

      for (const key in to) {
        if (key === "currency") {
          setSelectedToCurr(to[key]);
          let exchangedAmt = parseInt(amountInput) * rateData[to[key]]
          setConvertedAmt(exchangedAmt);
          console.log(
            to[key],
            rateData[to[key]],
            parseFloat(amountInput) * rateData[to[key]]
          );
        }
      }
      for (const key in from) {
        if (key === "currency") {
          setSelectedFromCurr(from[key]);
        }
      }
    } else if (from.currency ==="" || to.currency === "") {
      setAlertCurrFlag(true);
    }
  };

  useEffect(() => {
    rateApiCall();
  }, []);

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const updateTimeLeft = () => {
    setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  };

  useEffect(() => {
    const timer = setInterval(updateTimeLeft, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Container className="amount-input-field">
      {alertCurrFlag ? (
        <>
          <Alert severity="error">
            Please select the currency to exchange.
          </Alert>
        </>
      ) : (
        <></>
      )}

      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="standard-amount" className="amount-label" data-testid="amount-label">
          Amount
        </InputLabel>
        <Input
          id="standard-amount"
          name="standard-amount"
          type="string"
          data-testid="amount-input"
          aria-describedby="my-helper-text"
          inputProps={{ inputMode: "numeric", "aria-label": "Amount" }}
          value={amountInput}
          onChange={(e) => inputChange(e)}
          error={hasError[0].error}
          endAdornment={
            <InputAdornment position="end">
              <SyncAltIcon
                data-testid="switch-currencies"
                name="switch-currency"
                style={{ color: "#005698", cursor: "pointer" }}
                onClick={switchCurrency}
              />
            </InputAdornment>
          }
        />
        {hasError[0].error && (
          <span id="my-helper-text" data-testid="has-error">{hasError[0].errorMsg}</span>
        )}

        <CountriesDropdown
          val={from}
          from={from}
          to={to}
          switchFlip={switchFlip}
          setFrom={setFrom}
          setTo={setTo}
          handleChange={(e) => handleChange}
        ></CountriesDropdown>
        {convertedAmt && timeLeft > 0 ? (
          <>
            <Row fluid="true">
              <Col xs={2}></Col>
              <Col xs={10} className="output-class" aria-label="converted amount">
                {amountInput} {selectedFromCurr} is equivalent to {convertedAmt}{" "}
                {selectedToCurr}
              </Col>
              <Col></Col>
            </Row>

            <Row>
              <CountdownTimer minutes={minutes} seconds={seconds} />
            </Row>
          </>
        ) : (
          <></>
        )}
        <Button data-testid="convert-buttton" aria-label="convert button" name="Convert" className="convert-button" onClick={convertCurrency}>
          Convert
        </Button>
      </FormControl>
    </Container>
  );
};

export default InputField;
