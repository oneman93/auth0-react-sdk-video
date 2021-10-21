import React from "react";

//import logo from "../assets/logo.svg";
import logo from "../assets/jnj150.png";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
      <h1 className="mb-4">{ isAuthenticated ? <span>Hi, {user.nickname}</span>
            : <span>You are not authenticated yet</span>
          }
      </h1>

      <div className="lead">
        Use case2: 
        <li>Instance jnj is created.</li>
        <li>Cascade users invited. </li>
        <li>Auth0 user does not exist.</li>
      </div>
    </div>
  )
};

export default Hero;
