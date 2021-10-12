import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight, LinkedAccountList } from "../components";
import { Button, ButtonGroup } from "react-bootstrap";
import { justAnAlert, setMessage, addHistory, clearHistory, setProfile } from "../utils";
import CreateJWTButton from "../components/create-jwt-button";

export const Profile = (props) => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithPopup } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  // justAnAlert();

  const getJWT = async() => {     
    try {
      const token = await getAccessTokenSilently();    
      setMessage(props, token);
    } catch (error) {
      setMessage(props, error.message);
    }  
  };

  //https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const decodeJWT = async() => {     
    try {
      const token = await getAccessTokenSilently();
      const info = parseJwt(token);
      setMessage(props, info);
    } catch (error) {
      setMessage(props, error.message);
    }  
  };

  /**
   * API - get all users of Auth0
   */
   const getAUser = async() => {     
    try {
      const token = await getAccessTokenSilently();    
      const response = await fetch(`${serverUrl}/api/users/${user.sub}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'GET'
        }
      );

      addHistory(props, ['Response is returned.']);
      const profile = await response.json();
      setMessage(props, profile);
      setProfile(props, profile);

    } catch (error) {
      setMessage(props, error.message);
    }  
  };

  // Constructor  
  useEffect(() => {
    console.log(
      "This only happens ONCE.  But it happens AFTER the initial render."
    );
  }, []);

  return (
    <Container className="mb-5">                
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img 
          src={user.picture}
          alt="Profile"
          className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>     
      <Row>
        <ButtonGroup>
          <Button color="primary" className="mt-5" onClick={getJWT}>
            Get Auth0 JWT
          </Button>
          <Button color="primary" className="mt-5" onClick={decodeJWT}>
            Decode JWT
          </Button>
          <Button color="primary" className="mt-5" onClick={getAUser}>
            Get Profile
          </Button>
          <CreateJWTButton {...props} />
          
        </ButtonGroup>
        
        <Highlight>{JSON.stringify(props.allValues.message, null, 2)}</Highlight>        
      </Row>     
      <Row>
        { props.allValues.message ? <LinkedAccountList {...props} /> : null}        
      </Row>
    </Container>
  );
};

export default Profile;
