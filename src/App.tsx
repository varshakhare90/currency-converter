import React, {useState, useEffect} from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";



const App: React.FC = () =>{

  const [amountInput, setAmountInput] = useState<string>('');

  
  const handleAmountInput = (e: React.FormEvent) =>{
    e.preventDefault();
  };



  return (
    <Container maxWidth="sm">
      <Card variant="outlined" sx={{ maxWidth: 745 , boxShadow: 7, marginTop:5 }}>
        <CardContent>
          <InputField amountInput={amountInput} setAmountInput={setAmountInput} handleAmountInput={handleAmountInput}/>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
