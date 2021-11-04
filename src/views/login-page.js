import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import Highlight from "../components/highlight";
import { useAuth0 } from "@auth0/auth0-react";
import { justAnAlert, addHistory, clearHistory, toggleShowLog, setSessionUser } from "../utils";
import { FaceRounded } from '@material-ui/icons';

/**
 * This project copied from https://github.com/auth0-samples/auth0-link-accounts-sample/tree/master/SPA
 * and calls auth0 api wihtou connection to local server.
 * 11/10/21
 */


 export const LoginPage = (props) => {
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently} = useAuth0()
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let userEmail = '';

  const jwtWithOrg = localStorage.getItem('jwt_with_org_id');

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('jwt_with_org_id');
      // login with default org >> and come back to home page.
      loginWithRedirect(
        {
          appState: {
            //returnTo: '/my-redirect?target=http://demo.cascade.localhost&required=jwt,org_id&pause=false'
            returnTo: '/my-redirect?target=http://localhost:3000&required=jwt,org_id&pause=false'
          }
        }
      );
    }
  }, [isAuthenticated]);

      
  return <div>You are logged in already ... Please log out</div>  ;
  // return <Loading/>;

};

export default LoginPage;
