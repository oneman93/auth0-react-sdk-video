import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { Button } from "react-bootstrap";
import { justAnAlert, setMessage, addHistory, clearHistory, setProfile } from "../utils";
import React, { useEffect, useState } from "react";

/**
 * This project copied from https://github.com/auth0-samples/auth0-link-accounts-sample/tree/master/SPA
 * and calls auth0 api wihtou connection to local server.
 * 11/10/21
 */

const LinkAccount = (props) => {  
  
  const config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
  }
  const { isAuthenticated, user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithPopup } = useAuth0();

  // Note that you have scope to update identities
  const auth0 = new Auth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: `https://${config.domain}/api/v2/`,
    scope:
      "openid email profile read:current_user update:current_user_identities",
  });
  
  /**
   * Wrapper functions to handle errors, exceptions
   */
  const linkAccountWrapper = async() => {
    try {
      await linkAccount();
      // refresh();
      const updatedProfile = await getUserProfile(user.sub);
      setMessage(props, updatedProfile);
      setProfile(props, updatedProfile);

    } catch (error) {
      const { message } = error;
      setMessage(props, message);
    }
  }

  /**
    * API link a user
    */
  const linkAccount = async () => {

    const authenticateUser = async () => {
      const a0 = new Auth0Client({
        domain: config.domain,
        client_id: config.clientId,
      });
      await a0.loginWithPopup({
        max_age: 0,
        scope: "openid",
      });
      return await a0.getIdTokenClaims();
    };

    const accessToken = await auth0.getTokenSilently();
    const { sub } = await auth0.getUser();

    // Authenticate second user
    const {
      __raw: targetUserIdToken,
      email_verified,
      email,
    } = await authenticateUser();
  
    if (!email_verified) {
      throw new Error(
        `Account linking is only allowed to a verified account. Please verify your email ${email}.`
      );
    }
  
    await fetch(`https://${config.domain}/api/v2/users/${sub}/identities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        link_with: targetUserIdToken,
      }),
    });


  }


  const getUserProfile = async (userId) => {
    const token = await auth0.getTokenSilently();
    const response = await fetch(
      `https://${config.domain}/api/v2/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  };

  /**
   * Return
   */
  return (
    <div id="linked-accounts">
      
      <Button
        onClick={() => {                      
          linkAccountWrapper();                
        }}
        id="qsLinkAccountBtn"
        variant="primary"
        className="btn-margin"
      >
        Link Account
      </Button>
    </div>
    
  );
};

export default LinkAccount;