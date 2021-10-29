import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = (props) => {
  const { logout } = useAuth0();
  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  return (
    <Button
      onClick={() => {
        localStorage.removeItem('jwt_with_org_id');
        addHistory(['Auth0 logout called...']);
        logout()
      }}
      id="qsLogoutBtn"
      variant="danger"
      className="btn-margin"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;