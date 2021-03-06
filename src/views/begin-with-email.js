import React, { useState } from "react";
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


export const BeginWithEmail = (props) => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0()
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let userEmail = '';
  
  // the whole object
  const theUser = {
    identities: []
  }

  // email changed
  const doSomething = (evt) => {
    userEmail = evt.target.value;
  }

  const loginOrganization = (org_id) => {
    loginWithRedirect(
      {
        organization: `${org_id}`
      }
    );
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
   */
   const searchUsers = async() => {
    // check inputbox empty
    if (!userEmail) {
      justAnAlert('enter email');
      return;
    }

    try {
      var url = new URL(`${serverUrl}/api/users`)
      var params = {email:userEmail}
      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url);
      const usersData = await response.json();

      usersData.map((n,i) => {
        const userId = `${n.identities[0].provider}|${n.identities[0].user_id}`;

        theUser.identities.push({
          provider: n.identities[0].provider,
          id: n.identities[0].user_id,
          name: n.name,
          userId: userId,
          organizations:[]
        });

        // get each user's orgs
        getOrganizations(userId);

      })

      
    } catch (error) {
      addHistory(props, [error.message]);
    }
  };

  return (
  <div>
    <input type="text" placeholder="type your email" onChange={doSomething} />
    <Button
      onClick={() => {                      
        searchUsers();
      }}
      id="qsFindOrganizationsBtn"
      variant="primary"
      className="btn-margin"
    >
      Find my organizations
    </Button>

    
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
                  loginOrganization(o.id);
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

export default BeginWithEmail;
