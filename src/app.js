import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import { NavBar, Footer, Loading, EventLog } from "./components";
import { Home, Profile, ExternalApi } from "./views";
import { useAuth0 } from "@auth0/auth0-react";

import "./app.css";


const App = () => {
  const { isAuthenticated, user } = useAuth0()  

  /**
   * Constructor.
   *    message: json result from Auth0 api call
   *    messageCascade: json result from Cascade api call
   *    history: event log
   *    showLog: boolean flag to on/off log
   */
  const [allValues, setAllValues] = useState({
    message: '',
    messageCascade: '',
    history: ['App started ...'],
    showLog: false
  });
  
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading/>
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar allValues={allValues} setAllValues={setAllValues} />
      <EventLog allValues={allValues} setAllValues={setAllValues} />

      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={() => (<Home allValues={allValues} setAllValues={setAllValues} />)} />
          <Route path="/profile" component={() => (<Profile allValues={allValues} setAllValues={setAllValues} />)} />
          <Route path="/external-api" component={() => (<ExternalApi allValues={allValues} setAllValues={setAllValues} />)} />
        </Switch>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default App;