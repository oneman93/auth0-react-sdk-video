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


export const OrgSelector = (props) => {
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } = useAuth0()
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let userEmail = '';

  // Constructor  
  useEffect(() => {
    if (isAuthenticated && !props.allValues.sessionUser) {
      searchUserByID(user.sub);     
        
    }    
  }, [isAuthenticated, props.allValues.sessionUser]);
  
  // the whole object
  const theUser = {
    identities: []
  }

  // email changed
  const doSomething = (evt) => {
    userEmail = evt.target.value;
  }

  // Update jwt with org_id then redirect.
  // Refer to `getDefaultOrganizationAndRedirect` in my-redirect.js
  const loginOrganizationSilently = async (orgId) => {
    
    try {

      const jwtWithOrg = localStorage.getItem('jwt_with_org_id');

      // Update jwt with org_id
      if (!jwtWithOrg) {
        const token = await getAccessTokenSilently({
          organization: `${orgId}`,
          ignoreCache: true,
        });
      
        localStorage.setItem('jwt_with_org_id', token);

        const target = '/';
        const urlResult = `${target}?jwt=${token}`;
        console.log('url: ', urlResult);
        console.log('jwt with org_id is set.')

        // redirect
        window.location.href = urlResult;
      }     

    } catch(error) {
      console.log('error: ', error.message);
    }
  }

  const getOrganizations = async(userId) => {
    var url = new URL(`${serverUrl}/api/users/${userId}/organizations`)
    const response = await fetch(url);
    const orgsData = await response.json();
    const userFound = theUser.identities.find(u => u.userId === userId);

    if (userFound) {
      orgsData.map((o,i) => {
        userFound.organizations.push({
          id: o.id,
          name: o.name,
          displayName: o.display_name
        });
      });      
    }

    // Update theUser whenever each user is ready.
    setSessionUser(props, theUser);
  }

  /**
   * API - get all users of Auth0
   * GET	/api/v2/users/{id}
   */
   const searchUserByID = async(userId) => {
    // check inputbox empty
    if (!userId) {
      justAnAlert('enter userId');
      return;
    }

    try {
      // You can get token from query param as well
      const token = await getAccessTokenSilently();   

      const response = await fetch(`${serverUrl}/api/users/${userId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'GET'
        }
      );

      const userData = await response.json();

      
      
      theUser.identities.push({
        provider: userData.identities[0].provider,
        id: userData.identities[0].user_id,
        name: userData.name,
        userId: userId,
        organizations:[]
      });

      // get each user's orgs
      getOrganizations(userId);

      
      
    } catch (error) {
      addHistory(props, [error.message]);
    }
  };

  return (
  <div>
    <span>Please select organization</span>
    <div>
      {
        props.allValues.sessionUser ?
        props.allValues.sessionUser.identities.map((u,i) => {
          return (<div key={i} className="auth0-user-id">
            <FaceRounded />
            <span className="item provider">{u.provider == 'auth0' ? 'username-password-authenticaton' : u.provider}</span>
            <span className="item">{u.id}</span>
            <span className="item">{u.name}</span>
            
            {u.organizations.map((o, j) => (
              <div key={j}>
                <span>{o.id}</span>
                <Button onClick={() => {                      
                  loginOrganizationSilently(o.id);
                }}
                >{o.displayName}</Button>
                <hr />
              </div>
            ))}
          </div>);
        })
        : <div>no user found</div>
    }
      
    </div>
  </div>
  
);

};

export default OrgSelector;
