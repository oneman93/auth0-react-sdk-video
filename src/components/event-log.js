import React from "react";

//import logo from "../assets/logo.svg";
import logo from "../assets/jnj150.png";
import { useAuth0 } from "@auth0/auth0-react";

const EventLog = (props) => {
  const { isAuthenticated, user } = useAuth0()

  
  // const state = {
  //   history: [
  //     {desc: '3. User verified in Cascade database through email ...'},
  //     {desc: '4. Update auth0 user with user_id:123 ...'}
  //   ]
  // };

  const historyDiv = props.allValues.history.map((item, index) => {
    return (<li key={index}>{item}</li>)
  })

  // const historyDiv = <div>test</div>
  
  return (
    historyDiv   
  )
};

export default EventLog;
