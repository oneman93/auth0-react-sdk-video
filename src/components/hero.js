import React, {useEffect, useState } from "react";

//import logo from "../assets/logo.svg";
import logo from "../assets/jnj150.png";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const { isAuthenticated, user } = useAuth0()
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [orgDisplayName, setOrgDisplayName] = useState(0);

  // Constructor  
  useEffect(() => {
    if (isAuthenticated) {
      getOrganization(user.org_id).then((orgData) => {
        // display org name
        setOrgDisplayName(orgData.display_name);
      });    
    }    
  }, [isAuthenticated]);

  /**
   * API - get all users of Auth0
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
