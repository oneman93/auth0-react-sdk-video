import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  return (
    <Button
      onClick={() => {
        addHistory(['Auth0 loginWithRedirect called...']);
        loginWithRedirect()
      }}
      id="qsLoginBtn"
      variant="primary"
      className="btn-margin"
    >
      Login
    </Button>
  );
};

export default LoginButton;