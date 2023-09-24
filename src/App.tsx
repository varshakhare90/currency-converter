import React, {useState} from "react";
import "./App.scss";
import InputField from "./components/InputField/InputField";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import  CardHeader  from '@mui/material/CardHeader';


const App: React.FC = () =>{

  const [amountInput, setAmountInput] = useState<string>('');

  const handleAmountInput = (e: React.FormEvent) =>{
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Card variant="outlined" sx={{ maxWidth: 745 , boxShadow: 7, marginTop:5 }}>
        <CardHeader className="currency-header" aria-label="currency converter" data-testid="currency-heading"  title = "Currency Converter"/>
        <CardContent>
          <InputField  amountInput={amountInput} setAmountInput={setAmountInput} handleAmountInput={handleAmountInput}/>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
