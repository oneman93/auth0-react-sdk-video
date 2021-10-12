import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { justAnAlert, addHistory, clearHistory, toggleShowLog } from "../utils";

//https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html

const CreateJWTButton = (props) => {

  const base64url = (source) => {
    // // Encode in classical base64
    // encodedSource = CryptoJS.enc.Base64.stringify(source);

    // // Remove padding equal characters
    // encodedSource = encodedSource.replace(/=+$/, '');

    // // Replace characters according to base64url specifications
    // encodedSource = encodedSource.replace(/\+/g, '-');
    // encodedSource = encodedSource.replace(/\//g, '_');

    // return encodedSource;
  }

  const createJWT = () => {
    const str = "test";
    const jwt = base64url(str);
    justAnAlert(jwt);
  } 

  return (
    <Button
      onClick={() => {        
          createJWT();                
      }}
      id="qsCreateJWTBtn"
      variant="primary"
      className="btn-margin"
    >
      Create JWT
    </Button>
  );
};

export default CreateJWTButton;