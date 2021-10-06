import React, { useState } from "react";
import { ButtonGroup, Button, Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight } from "../components";
import { justAlert, addHistory, clearHistory, toggleShowLog, setMessage, setMessageCascade } from "../utils";

export const ProfileCascade = (props) => {
  const { user } = useAuth0()
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  
  const updateMeta = async() => {
  };

  const getCascadeUsers = async() => {
    try {
      addHistory(props, ['cascade api called to get users ...'])  
      const token = await getAccessTokenSilently();    

      const response = await fetch(`${serverUrl}/api/cascade_users`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
      );
      const responseData = await response.json();
      setMessageCascade(props, responseData);    
      
    } catch (error) {
      setMessageCascade(props, error.message);
    }  
  };

  const getInvitedUsers = async() => {
  };

  const checkInvitation = async() => {
    try {
      const token = await getAccessTokenSilently();    
      const data = {
        email: user.email,
        jwt: token
      };

      const response = await fetch(`${serverUrl}/api/invitations/check/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          method: 'POST',
          body: JSON.stringify(data)
        }
      );
      const responseData = await response.json();
      setMessageCascade(props, responseData);    
      
    } catch (error) {
      setMessageCascade(props, error.message);
    }  
  };

  return (
    <Container className="mb-5">
      <ButtonGroup>
        <Button
            onClick={getCascadeUsers}
            id="qsConnectCascadeBtn"
            variant="secondary"
            className="btn-margin"
          >
            Get Cascade users
        </Button>
        {/* <Button
            onClick={getInvitedUsers}
            id="qsInvitedUsersBtn"
            variant="secondary"
            className="btn-margin"
          >
            Get Invited Users
        </Button> */}
        <Button
            onClick={checkInvitation}
            id="qsCheckUserInvitationBtn"
            variant="primary"
            className="btn-margin"
          >
            Check User Invitation by Auth0 JWT (+email)
        </Button>
        {/* <Button
            onClick={updateMeta}
            id="qsUpdateProfileBtn"
            variant="primary"
            className="btn-margin"
          >
            Update auth0 user meta
        </Button> */}
      </ButtonGroup>
      
      <div className="mt-5">
        <h6 className="muted">Result</h6>
        <Highlight language="json">
          {JSON.stringify(props.allValues.messageCascade, null, 2)}
        </Highlight>
      </div>
      
    </Container>
  );
};

export default ProfileCascade;
