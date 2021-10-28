import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import Highlight from "../components/highlight";
import { useAuth0 } from "@auth0/auth0-react";
import { justAnAlert, addHistory, clearHistory, toggleShowLog, setMessage } from "../utils";
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
    setMessage(props, theUser);
  }

  /**
   * API - get all users of Auth0
   */
   const searchUsers = async() => {
    
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

  // const config = {
  //   domain: process.env.REACT_APP_AUTH0_DOMAIN,
  //   clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
  // }
  // const { isAuthenticated, user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithPopup } = useAuth0();

  // // Note that you have scope to update identities
  // const auth0 = new Auth0Client({
  //   domain: config.domain,
  //   client_id: config.clientId,
  //   audience: `https://${config.domain}/api/v2/`,
  //   scope:
  //     "read:users read:user_idp_tokens",
  // });

  // const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1EUTRPREZFUXpFeFJEaEJRVVpFTWpBMk1EZEVSakEzUVVNNFJEWXpNREJFUVVNME1FWkdPUSJ9.eyJpc3MiOiJodHRwczovL21hdHRoZXdvaDkzLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJUTGYxeDNkTFhRRXdFQnowVnlKR1UxVmVidEZuZkRsSEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9tYXR0aGV3b2g5My5hdS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTYzNTI5NTI0OSwiZXhwIjoxNjM1MzgxNjQ5LCJhenAiOiJUTGYxeDNkTFhRRXdFQnowVnlKR1UxVmVidEZuZkRsSCIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.fiPVHCF3QUcbndQ8oSb4bZDG3klJ-czM_RYq_W_VafacoRgmd2n9T1mOCNuCiJpv8KlE_LyaeNixkTYjwicihaIsFBjwzOEsJzNBVwP-1jGkDkzAiP_4kVUBbbhCL_-2H5niXOfu0gFiyi6s00Mv1TSr1DD4k-eDMbNyjNmYLLwW0a2Jo0IMkuWrzRaG-n7NVf4tlcV1KYDRXbPUK5N07STE0R-kNdRfRs50CZN5Y96D-KcdD6ZDHf7J1GHlgqR5lT1T2YoVegfkPVW6ZrEqCUqJuy20UGV8K5jqGbHCYIh2YMA2hst1gxNfFZPDp3CCxuI2zU9EEQRID5W4dh72qg";

  // /**
  //   * API link a user
  //   */
  //  const searchUsers = async () => {

  //   const users = await fetch(`https://${config.domain}/api/v2/users/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     }
  //   });

  //   console.log(users);


  // }

  return (
  <div>
    <input type="text" placeholder="your email" defaultValue="matthewoh93@gmail.com" onChange={doSomething} />
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
      props.allValues.message && props.allValues.message.identities.map((u,i) => {
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
      })}
      
    </div>
  </div>
  
);

};

export default BeginWithEmail;
