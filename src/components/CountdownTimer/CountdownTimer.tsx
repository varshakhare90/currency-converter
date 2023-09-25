import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Box } from "@mui/system"; // importing of modules


interface timeInterface{  // interface of the props
    minutes : number;
    seconds: number;
};

const CountdownTimer = ({minutes, seconds} : timeInterface) => {
  
  return (
    <Container className="countdown-timer-class" id="countdown-timer" aria-label="timer">
      <Row fluid="true">
        <Col xs={2}></Col>
        <Col xs={10}>
          <Box
            sx={{
              p: 1,
              width: "50%",
              textAlign: "center",
              marginTop: "10px",
              marginLeft:"20px",
              alignSelf:"end",
              color: "#fff",
              bgcolor: "rgb(92,148,209)",
              border: "4px solid #8b91bd",
            }}
          >
            Expires: {minutes}' {seconds < 10 ? `0${seconds}` : seconds}''
          </Box>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default CountdownTimer;
