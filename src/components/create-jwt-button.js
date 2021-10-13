import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { justAnAlert, addHistory, clearHistory, toggleShowLog } from "../utils";

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

/**
 * Read and understand this:
 * https://auth0.com/docs/security/tokens/json-web-tokens/validate-json-web-tokens
 * 
 * what is checkJWT?
 * https://auth0.com/docs/quickstart/backend/nodejs/01-authorization
 */

const CreateJWTButton = (props) => {

  const message = 'test', nonce = 'test', path = 'test', privateKey = 'test'; // ...
  const hashDigest = sha256(nonce + message);
  const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
  var CryptoJS = require("crypto-js");

      // var data = {
    //   "id": 1337,
    //   "username": "john.doe"
    // };

    // mimic data
    var data = {
      "iss": "https://matthewoh93.au.auth0.com/",
      "sub": "auth0|6163d465b18bff007046591a",
      "aud": [
        "https://matthewoh93.au.auth0.com/api/v2/",
        "https://matthewoh93.au.auth0.com/userinfo"
      ],
      "iat": 1634080638,
      "exp": 1634167038,
      "azp": "TFcLzH4DbBXby3aWJo5DtL73ogJoJL1G",
      "scope": "openid profile email"
    };

  /**
   * Test function
   */
  const testCryptoJS = () => {    
    var data = [{id: 1}, {id: 2}]

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData); // [{id: 1}, {id: 2}]
  }

  /**
   * Custom function to use base64 url encoding.
   * Note that `source` needs to be correct format, otherwise, this function will return error.
   * 
   * @param {*} source 
   */
  const base64url = (source) => {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  /**
   * Main function to create jwt
   */
  const createJWTWrapper = () => {
    // test jwtwebtoken library
    // createJWT_jsonwebtoken();

    // test manual jwt creation
    createJWT_internet_dude();
  } 

  // Not working. Error returned with secret: Cannot read properties of null (reading '2')
  const createJWT_jsonwebtoken = () => {
    // https://github.com/auth0/node-jsonwebtoken

    var jwt = require('jsonwebtoken');

    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    var token = '';
    var privateKey = 'test';
    
    // asynchronous
    jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
      console.log(token);
    });

    // sign with RSA SHA256
    token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

    // sign with RSA SHA256
    // privateKey = "MIIDGTCCAgGgAwIBAgIJAJSExllaQ+K8MA0GCSqGSIb3DQEBCwUAMCMxITAfBgNVBAMMGG1hdHRoZXdvaDkzLmF1LmF1dGgwLmNvbTAeFw0xNTEwMjQwOTI1NDRaFw0yOTA3MDIwOTI1NDRaMCMxITAfBgNVBAMMGG1hdHRoZXdvaDkzLmF1LmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALuFUcJjlyi/6ki+gHH0RCXor1HELAjN7sq4BHNS8MBFFaPIgGHMwlhgZJ4kL4cL+YJuLJGXVinTnNu1edZxuPigm6udBDNcxDpXbAU8XfUVp2+l1TqVOcikEGz1LSW5QflPGAkSB/jtglsV7XQbyi8lbCLi/2r+kbbo+Gxcx2hh964556QXi7EDmi/SGheRBATvTicYbtexRp1iOH06vR8g7N1Fn99oan1r0/5KUgqY7HRUIxSc223IJ6lS4Cu8bs5+/NzeRB9+kBss0AiCgSjmjSB6yDAec361VJ8dGXdoy6xK4DCFElimWSKQxRmmmCCm1l7HBhBIV5VEfVBHwK8CAwEAAaNQME4wHQYDVR0OBBYEFP8340pZeFvCnvgOrG4xiMuaEIy8MB8GA1UdIwQYMBaAFP8340pZeFvCnvgOrG4xiMuaEIy8MAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAEB6apQa12hygl1kL9GfISTMRWrgNlCfrjZwUc/WcL67djc87q/6FuoneYz2l/a0s/x3allCFY4fX8OKuZP+nOB/hoYlD531dK+u67GVKCVip5tu4W1afKNZzHbc1jJXJGTDKUs51sr2WSi+m7UijXWGbGyjBEOjELrHAuvgCtJeXCRL/mjHPCiLTDZFyvXX3K3MZlt39bnikll/IO833U//FFgRnj77Qyo3nVCw3NoYaOeuRjlle00gJNGoDaYbgVxqa5kTS8CgMe0/WD+kpSXQnM6DuaCKEx9guP21LXrInva2ckbef6xW691QhM5/QPZej2wxJDtnpbO/CwFlmiU=";
    // token = jwt.sign(data, privateKey, { algorithm: 'RS256' });

    console.log('jsonwebtoken: ' + token);
  }

  /**
   * Copied from below:
   * https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html
   * https://github.com/brix/crypto-js
   */

  const createJWT_internet_dude = () => {
    var header = {
      "alg": "RS256",
      "typ": "JWT"
    };
    
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);
    

    
    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);
    
    var token = encodedHeader + "." + encodedData;

    var secret = "private key? public key?";

    var signature = CryptoJS.HmacSHA256(token, secret);
    signature = base64url(signature);

    var signedToken = token + "." + signature;
    console.log('manual token created: ' + signedToken);
  }

  return (
    <Button
      onClick={() => {        
          createJWTWrapper();                
      }}
      id="qsCreateJWTBtn"
      variant="primary"      
      className="mt-5" 
    >
      Create JWT
    </Button>
  );
};

export default CreateJWTButton;