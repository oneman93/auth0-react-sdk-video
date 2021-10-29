import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import { NavBar, Footer, Loading, EventLog } from "./components";
import { Home, Profile, ExternalApi } from "./views";
import { useAuth0 } from "@auth0/auth0-react";

import "./app.css";
import MyRedirect from "./views/my-redirect";
import Hello from "./components/hello";
import Square from "./components/square";
import BeginWithEmail from "./views/begin-with-email";

const App = () => {
  const { isAuthenticated, user } = useAuth0()

  /**
   * Constructor.
   * App initializes the state to contain below objects:
   * 
   *    message: json result from Auth0 api call
   *    messageCascade: json result from Cascade api call
   *    history: event log
   *    showLog: boolean flag to on/off log
   */
  const [allValues, setAllValues] = useState({
    message: '',
    messageCascade: '',
    history: ['App started ...'],
    showLog: false,
    profile: '',
    sessionUser: null
  });


  const [count, setCount] = useState(0);
  const favoriteNums = [7, 21, 37];

  const increment = useCallback(
    n => {
      setCount(c => c + n);
    },
    [setCount]
  );

  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <div className="invisible">
        <div className="myButtonWrapper">
          <Hello increment={increment} />
        </div>
        <div>count: {count}</div>
        <div className="myButtonWrapper">
          {favoriteNums.map(n => {
            return <Square increment={increment} n={n} key={n} />;
          })}
        </div>      
      </div>

      <NavBar allValues={allValues} setAllValues={setAllValues} />
      <EventLog allValues={allValues} setAllValues={setAllValues} />

      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={() => (<Home allValues={allValues} setAllValues={setAllValues} />)} />
          <Route path="/profile" component={() => (<Profile allValues={allValues} setAllValues={setAllValues} />)} />
          <Route path="/external-api" component={() => (<ExternalApi allValues={allValues} setAllValues={setAllValues} />)} />
          <Route path="/my-redirect" component={() => (<MyRedirect allValues={allValues} setAllValues={setAllValues} />)} />
          <Route path="/begin-with-email" component={() => (<BeginWithEmail allValues={allValues} setAllValues={setAllValues} />)} />
        </Switch>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default App;