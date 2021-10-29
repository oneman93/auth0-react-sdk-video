import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight, LinkedAccountList } from "../components";
import { Button, ButtonGroup } from "react-bootstrap";
import { justAnAlert, addHistory, clearHistory } from "../utils";
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
  const target = query.get('target');
  const required = query.get('required');
  const pause = query.get('pause') == 'true';

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getJWTAndRedirect();
  //   }
  // }, [isAuthenticated]);


  const getDefaultOrganizationAndRedirect = async () => {
    var url = new URL(`${serverUrl}/api/users/${user.sub}/organizations`)
    const response = await fetch(url);
    const orgsData = await response.json();
    
    const defaultOrg = orgsData[0];
    console.log('defaultOrg: ', defaultOrg);

    if (defaultOrg === undefined) {
      return <div>You don't have any organization, can't continue authenticate ...</div>
    }

    const orgId = defaultOrg.id;
    let token = ''; //token with org_id

    try {

      const jwtWithOrg = localStorage.getItem('jwt_with_org_id');

      // set jwt with org_id
      if (!jwtWithOrg) {
        token = await getAccessTokenSilently({
          organization: `${orgId}`,
          ignoreCache: true,
        });
      
        localStorage.setItem('jwt_with_org_id', token);

        const urlResult = `${target}?token=${token}`;
        console.log('url: ', urlResult);
        console.log('jwt with org_id is set.')
      }      

      // redirect
      if (!pause) {
        window.location.href = `${target}?jwt=${token}`;
      }

    } catch(error) {
      console.log('error: ', error.message);
    }
  }


  const getJWTAndRedirect = async () => {
    const jwt = await getAccessTokenSilently();
    const requiredList = required.split(',');

    if (requiredList.indexOf('org_id') >= 0) {
      getDefaultOrganizationAndRedirect();
    } else {
      if (!pause) {
        window.location.href = `${target}?jwt=${jwt}`;
      } else {
        const url = `${target}?jwt=${jwt}`;
        console.log('url: ', url);
      }
    }        
  }

  getJWTAndRedirect();

  
  // if pause is true, below will show. if pause is false, you are redirect to target page automatcially
  return (
    <Container className="mb-5">
      <div>You are paused before redirecting to:</div>
      <br/>
      {/* <div>{target}?jwt={props.allValues.message}</div> */}
      <div>see console for redirect target</div>
    </Container>
  );
};

export default MyRedirect;
