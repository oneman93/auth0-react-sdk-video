import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { justAnAlert, setMessage, addHistory, clearHistory, setProfile } from "../utils";
import { SettingsApplicationsRounded } from "@material-ui/icons";
import { LinkAccount } from ".";

const LinkedAccountList = (props) => {
  const config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
  }
  const { isAuthenticated, user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithPopup } = useAuth0();
 
  
  // Constructor  
  useEffect(() => {
    console.log(
      "This only happens ONCE.  But it happens AFTER the initial render."
    );
  }, []);


  // Note that you have scope to update identities
  const auth0 = new Auth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: `https://${config.domain}/api/v2/`,
    scope:
      "openid email profile read:current_user update:current_user_identities",
  });


  const {
    user_id: primaryUserId,
    identities,
    email_verified,
    email = "",
  } = props.allValues.profile;

  // Filter function that excludes primary user
  const primary = (identity) =>
    identity.provider !== primaryUserId.split("|")[0] ||
    identity.user_id !== primaryUserId.split("|")[1];

  const displayable = (identity) => ({
    connection: identity.connection,
    isSocial: identity.isSocial,
    provider: identity.provider,
    user_id: identity.user_id,
    profileData: JSON.stringify(identity.profileData, null, 2),
  });



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
   * Wrapper functions to handle errors, exceptions
   */
   const unlinkAccountWrapper = async(identity) => {
    try {
      await unlinkAccount(identity);
      // refresh();
      const updatedProfile = await getUserProfile(primaryUserId);
      setMessage(props, updatedProfile);
      setProfile(props, updatedProfile);

    } catch ({ message }) {
      setMessage(props, message);
    }
  }
  
  const unlinkAccount = async (secondaryIdentity) => {
    const { provider, user_id } = secondaryIdentity;
    const accessToken = await auth0.getTokenSilently();
    const { sub } = await auth0.getUser();
    await fetch(
      `https://${config.domain}/api/v2/users/${sub}/identities/${provider}/${user_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const divIdentities = props.allValues.profile.identities && props.allValues.profile.identities.filter(primary).map(displayable).map((identity, index) => {          
    return (
      <tr key={index}>
        <td>{identity.connection}</td>
        <td>{identity.isSocial.toString()}</td>
        <td>{identity.provider}</td>
        <td>{identity.user_id}</td>
        <td>{identity.profileData}</td>
        <td>
          <Button
            onClick={() => {                      
              unlinkAccountWrapper(identity);                
            }}
            id="qsUnlinkAccountBtn"
            variant="danger"
            className="btn-margin"
          >
            Unlink
          </Button>
        </td>
      </tr>)
  });
  

  let numIdentities = 0;  
  if (props.allValues.profile) {
    const identities = props.allValues.profile.identities;
    if (identities && Array.isArray(identities)) {
      numIdentities = identities.length;
    }
  } 

  const msgIdentities = numIdentities >=2 
  ? `You have ${numIdentities} identities`
  : 'You have a single identity';

  return (
    <div>
      <p><strong>{msgIdentities}</strong></p>

      { numIdentities>=2 ? 
      <table className="table table-striped table-hover accounts">
        <thead>
          <tr>
            <th>connection</th>
            <th>isSocial</th>
            <th>provider</th>
            <th>user_id</th>
            <th>profileData</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {divIdentities}
        </tbody>
      </table>
      : null}

      <LinkAccount {...props} />
    </div>
    

  );
};

export default LinkedAccountList;