import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { Highlight } from "../components";
import { Button, ButtonGroup } from "react-bootstrap";
import { justAlert, setMessage, addHistory, clearHistory } from "../utils";

export const Profile = (props) => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithPopup } = useAuth0();
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

  const linkAccount = async () => {
    const config = {
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
    }

    const auth0 = new Auth0Client({
      domain: config.domain,
      client_id: config.clientId,
      audience: `https://${config.domain}/api/v2/`,
      scope:
        "openid email profile read:current_user update:current_user_identities",
    });
    
    const authenticateUser = async () => {
      const a0 = new Auth0Client({
        domain: config.domain,
        client_id: config.clientId,
      });
      await a0.loginWithPopup({
        max_age: 0,
        scope: "openid",
      });
      return await a0.getIdTokenClaims();
    };

    // const primaryAccessToken = await getAccessTokenSilently();
    // const primaryUserId = user.sub;

    const accessToken = await auth0.getTokenSilently();
    const { sub } = await auth0.getUser();

    // const response1 = await loginWithPopup();
    const {
      __raw: targetUserIdToken,
      email_verified,
      email,
    } = await authenticateUser();
  
    if (!email_verified) {
      throw new Error(
        `Account linking is only allowed to a verified account. Please verify your email ${email}.`
      );
    }
  
    await fetch(`https://${config.domain}/api/v2/users/${sub}/identities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        link_with: targetUserIdToken,
      }),
    });

    // await fetch(`${serverUrl}/api/linkAccount`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify({
    //     sub: sub,
    //     link_with: targetUserIdToken,
    //     accessToken: accessToken
    //   }),
    // });

    // try {
    
    //   const response = await fetch(`${serverUrl}/api/linkAccount`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${primaryAccessToken}`,
    //     },
    //     body: JSON.stringify({
    //       primaryUserId: primaryUserId,
    //       secondaryProvider: "secondary",
    //       secondaryUserId: "secondary"
    //     }),
    //   });

    //   const responseData = await response.json();
    //   setMessage(props, responseData);

    // } catch (error) {
    //   setMessage(props, error.message);
    // } 
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
        
        <Button
          onClick={() => {                      
              linkAccount();                
          }}
          id="qsLoginAgainBtn"
          variant="primary"
          className="btn-margin"
        >
          Link Accounts
        </Button>
      </Row>
    </Container>
  );
};

export default Profile;
