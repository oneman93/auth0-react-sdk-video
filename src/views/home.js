import React, { Fragment, useEffect, useRef } from "react";

import { Hero, Content  } from "../components";
import { useAuth0 } from "@auth0/auth0-react";
import { ProfileWrapper } from "../views";

// https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
// Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount metho

const Home = (props) => {

  return (
    <Fragment>
      <Hero />
      <hr />
      <ProfileWrapper allValues={props.allValues} setAllValues={props.setAllValues} />
    </Fragment>
    )
  
  
};

export default Home;
