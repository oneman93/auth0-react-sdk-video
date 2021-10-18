import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "react-bootstrap";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  return (
    <ButtonGroup>
      <Button
        onClick={() => {        
            loginWithRedirect({
              screen_hint: 'signup',
              appState: {
                returnTo: '/my-redirect'
              }
            });                
        }}
        id="qsLoginBtn"
        variant="primary"
        className="btn-margin"
      >
        Try For Free
      </Button>

      <Button
        onClick={() => {        
            addHistory(['Auth0 loginWithRedirect called...']);
            loginWithRedirect(
              {
                organization: 'org_ASk47QV0qNjstfjW'
              }
            );                
        }}
        id="qsLoginBtn"
        variant="primary"
        className="btn-margin"
      >
        Login
      </Button>
    </ButtonGroup>
    
  );
};

export default LoginButton;