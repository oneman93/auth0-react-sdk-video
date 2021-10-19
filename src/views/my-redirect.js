import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight, LinkedAccountList } from "../components";
import { Button, ButtonGroup } from "react-bootstrap";
import { justAnAlert, setMessage, addHistory, clearHistory } from "../utils";
import CreateJWTButton from "../components/create-jwt-button";
import { useHistory, useParams, useLocation } from "react-router-dom";

export const MyRedirect = (props) => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithPopup, isAuthenticated } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  
  // A custom hook that builds on useLocation to parse the query string for you.
  // https://reactrouter.com/web/example/query-parameters
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  useEffect(() => {
    if (isAuthenticated) {
      getJWTAndRedirect();
    }
  }, [isAuthenticated]);

  const getJWTAndRedirect = async () => {
    const jwt = await getAccessTokenSilently();
    setMessage(props, jwt);
    window.location.href = `${query.get('url')}?jwt=${jwt}`;
  }

  return (
    <Container className="mb-5">
      <div>You will be redirected to:</div>
      <br/>
      <div>{query.get('url')}?jwt={props.allValues.message}</div>
    </Container>
  );
};

export default MyRedirect;
