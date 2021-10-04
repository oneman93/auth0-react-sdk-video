import React, { Fragment, useEffect, useRef } from "react";

import { Hero, EventLog, Content  } from "../components";
import { useAuth0 } from "@auth0/auth0-react";
import { ProfileWrapper } from "../views";

// https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
// Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount metho

const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(()=> {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  return isMounted;
}

const Home = (props) => {
  const { isAuthenticated, user } = useAuth0()
  const msgAuthenticated = 'User is authenticated';
  const msgUnAuthenticated = 'User is not authenticated yet';

  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  // Similar to componentDidMount and componentDidUpdate:
  // This is still endlessly repeating.
  const isMounted = useIsMounted();

  // useEffect(() => {   
  //   if (isAuthenticated) {
  //     if (isMounted.current) {
  //       if (!props.allValues.history.includes(msgAuthenticated)) {        
  //         addHistory([msgAuthenticated]);        
  //       }
  //     }      
  //   } else {
  //     if (isMounted.current) {
  //       addHistory([msgUnAuthenticated]);        
  //     }
  //   }    
  // }, []);


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
