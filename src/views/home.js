import React, { Fragment, useEffect } from "react";

import { Hero, EventLog, Content  } from "../components";
import { useAuth0 } from "@auth0/auth0-react";
import { ProfileWrapper } from "../views";

const Home = (props) => {
  const { isAuthenticated, user } = useAuth0()

  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {    
  //   if (isAuthenticated) {
  //     addHistory(['User is authenticated']);
  //   }  
  // });


  return (
    <Fragment>
      <Hero />
      <hr />
      <EventLog allValues={props.allValues} setAllValues={props.setAllValues} />
      <hr />
      <ProfileWrapper allValues={props.allValues} setAllValues={props.setAllValues} />
    </Fragment>
    )
  
  
};

export default Home;
