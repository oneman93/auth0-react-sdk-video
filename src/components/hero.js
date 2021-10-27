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
            : <span className="red">You are not authenticated yet</span>
          }
      </h1>

      <div className="lead">
      </div>
    </div>
  )
};

export default Hero;
