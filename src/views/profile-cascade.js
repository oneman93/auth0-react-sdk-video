import React, { useState } from "react";
import { ButtonGroup, Button, Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight } from "../components";

export const ProfileCascade = (props) => {
  const { user } = useAuth0()
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

  const updateMeta = async() => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/api/users`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'POST'
        }
      );

      const responseData = await response.json();
      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }  
  };

  const getCascadeUsers = async() => {
    try {
      addHistory(['cascade api called to get users ...'])  
      const response = await fetch(`${serverUrl}/api/cascade_users`);
      const responseData = await response.json();
      setMessage(responseData);    
      
    } catch (error) {
      setMessage(error.message);
    }  
  };

  return (
    <Container className="mb-5">
      <ButtonGroup>
        <Button
            onClick={getCascadeUsers}
            id="qsConnectCascadeBtn"
            variant="primary"
            className="btn-margin"
          >
            Get Cascade users
        </Button>
        <Button
            onClick={updateMeta}
            id="qsUpdateProfileBtn"
            variant="primary"
            className="btn-margin"
          >
            Update auth0 user meta
        </Button>
      </ButtonGroup>
      
      <div className="mt-5">
        <h6 className="muted">Result</h6>
        <Highlight language="json">
          {JSON.stringify(props.allValues.message, null, 2)}
        </Highlight>
      </div>
      
    </Container>
  );
};

export default ProfileCascade;
