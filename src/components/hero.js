import React, {useEffect, useState } from "react";

//import logo from "../assets/logo.svg";
import logo from "../assets/jnj150.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, useParams, useLocation } from "react-router-dom";

const Hero = () => {
  const { isAuthenticated, user } = useAuth0()
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [orgDisplayName, setOrgDisplayName] = useState(0);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const jwt = query.get('jwt');

  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  // Constructor  
  useEffect(() => {
    if (isAuthenticated) {

      if (jwt) {
        // get org id from jwt
        const decodedToken = parseJwt(jwt)
        console.log('decodedToken: ', decodedToken);
        
        getOrganization(decodedToken.org_id).then((orgData) => {
          // display org name
          setOrgDisplayName(orgData.display_name);
        });   
      }
       
    }    
  }, [isAuthenticated]);

  /**
   * API - get org
   */
   const getOrganization = async(orgId) => {
    
    try {
      var url = new URL(`${serverUrl}/api/organizations/${orgId}`)
      const response = await fetch(url);
      const orgData = await response.json();    

      console.log('orgData: ', orgData);
      return orgData;

    } catch (error) {
      console.log('error: ', error.message);
    }
  };
  
  return (
    <div className="text-center hero my-5">
      {/* organization logo */}
      { 
        isAuthenticated 
        // ? <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
        ? <div>Welcome to <b>{orgDisplayName}</b></div>
        : <div>No org (because not authenticated yet)</div>
      }
      
      <h1 className="mb-4">{ isAuthenticated ? <span>Hi, {user.nickname}</span>
            : <span className="red">You are not authenticated yet</span>
          }
      </h1>

      <div className="lead">
      </div>
    </div>
  )
};

export default Hero;
