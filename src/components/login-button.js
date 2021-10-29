import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }
  const history = useHistory();

  return (
    <ButtonGroup>
      <Button
        onClick={() => {        
            loginWithRedirect(
              {
                screen_hint: 'signup',
                appState: {
                  returnTo: '/my-redirect?target=http://demo.cascade.localhost&required=jwt&pause=true'
                }
              }
            );                
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
        jnj Login
      </Button>

      <Button
        onClick={() => {   
          localStorage.removeItem('jwt_with_org_id');
     
          loginWithRedirect(
            {
              appState: {
                //returnTo: '/my-redirect?target=http://demo.cascade.localhost&required=jwt,org_id&pause=false'
                returnTo: '/my-redirect?target=http://localhost:3000&required=jwt,org_id&pause=false'
              }
            }
          );    
        }}
        id="qsUniversialLoginBtn"
        variant="primary"
        className="btn-margin"
      >
        Universial Login
      </Button>

      {/* <button onClick={() => history.push('/')}>Go to home</button> */}

    </ButtonGroup>
    
  );
};

export default LoginButton;