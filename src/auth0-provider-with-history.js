import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0PRoviderWithHistory = ({ children }) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedreictCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
    //window.location.href = "https://www.hotmail.com";
  };

  return (
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    onRedreictCallback={onRedreictCallback}
    audience={audience}
    >
      {children}
    </Auth0Provider>
  );

};

export default Auth0PRoviderWithHistory;