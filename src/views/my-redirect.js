import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight, LinkedAccountList } from "../components";
import { Button, ButtonGroup } from "react-bootstrap";
import { justAnAlert, setMessage, addHistory, clearHistory, setRedirect } from "../utils";
import CreateJWTButton from "../components/create-jwt-button";

export const MyRedirect = (props) => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithPopup } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  
  // Constructor  
  useEffect(() => {
    console.log('i am here');
    window.location.href="https://www.hotmail.com";
  }, []);

  return (
    <Container className="mb-5">                
      <div>test</div>
      <div>asd;lfkjasdlfkjalsd;kfjalsdjkflkj</div>
    </Container>    
  );
};

export default MyRedirect;
