import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight } from "../components";
import { Button, ButtonGroup } from "react-bootstrap";
import { justAlert, setMessage, addHistory, clearHistory } from "../utils";

export const Profile = (props) => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  //justAlert();

  const getJWT = async() => {     
    try {
      const token = await getAccessTokenSilently();    
      setMessage(props, token);
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
      const responseData = await response.json();
      setMessage(props, responseData);
    } catch (error) {
      setMessage(props, error.message);
    }  
  };

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
          <Button color="primary" className="mt-5" onClick={getAUser}>
            Get A User
          </Button>
          
        </ButtonGroup>
        
        <Highlight>{JSON.stringify(props.allValues.message, null, 2)}</Highlight>        
      </Row>     

      <Row className="farBelow">        
        <div>Link me with other users (emails)</div>
        <input type="text" placeholder="oneman93@hotmail.com"/>
        <Button
          id="qsConnectBtn"
          variant="primary"
          className="btn-margin"
        >
          Connect
        </Button>
      </Row>
    </Container>
  );
};

export default Profile;
