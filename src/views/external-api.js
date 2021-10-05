import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import Highlight from "../components/highlight";
import { useAuth0 } from "@auth0/auth0-react";

export const ExternalApi = (props) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const setMessage = (message) => {
    props.setAllValues(preValues => {
      return {...preValues, ['message']: message}
    })
  }
  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  /**
   * API - public message
   */
  const callApi = async() => {
    try {
      const response = await fetch(`${serverUrl}/api/messages/public-message`);
      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  /**
   * API - secure message
   */
  const callSecureApi = async() => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/api/messages/protected-message`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }

  };

  /**
   * API - get all users of Auth0
   */
  const getUsers = async() => {
    try {
      const token = await getAccessTokenSilently();
      addHistory(['Access Token: ' + token]);
      addHistory(['Calling express server http://localhost:6060/api/users with the access token ...']);
      addHistory(['In the server ...']);
      addHistory(['... /oauth/token will be called to get an API token. See terminal to get this token ...']);
      addHistory(['... /api/v2/users will be called with the API token ...']);

      const response = await fetch(`${serverUrl}/api/users`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'GET'
        }
      );

      addHistory(['Response is returned.']);
      const responseData = await response.json();
      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }  
  };

  /*********************************
   * FUNCTIONS
  *********************************/

  /*********************************
   * RENDER
  *********************************/
  return (
    <Container className="mb-5">
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token,
        and the API will validate it using the API's audience value.{" "}
        <strong>This route should be private</strong>.
      </p>
      <ButtonGroup>
        <Button color="primary" className="mt-5" onClick={callApi}>
          Get Public Message
        </Button>        
        <Button color="primary" className="mt-5" onClick={callSecureApi}>
          Get Private Message
        </Button>
        <Button color="primary" className="mt-5" onClick={getUsers}>
          Get Users
        </Button>
      </ButtonGroup>

      {props.allValues.message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <Highlight language="json">
            {JSON.stringify(props.allValues.message, null, 2)}
          </Highlight>
        </div>
      )}
    </Container>
  );
};

export default ExternalApi;
