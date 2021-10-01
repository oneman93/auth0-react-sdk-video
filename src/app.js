import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import { NavBar, Footer, Loading } from "./components";
import { Home, Profile, ExternalApi } from "./views";
import { useAuth0 } from "@auth0/auth0-react";

import "./app.css";

const App = () => {
  const { isAuthenticated, user } = useAuth0()  

  // Kind of constructor.
  const [allValues, setAllValues] = useState({
    message: '',
    history: ['App started...']
  });
  
  const setMessage = (message) => {
    setAllValues(preValues => {
      return {...preValues, ['message']: message}
    })
  }

  // If I change here, later components' event were not appended.
  // if (isAuthenticated) {
  //   allValues.history = ['App Started, User is authenticated.'];
  // }

  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading/>
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar allValues={allValues} setAllValues={setAllValues} />

      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={() => (<Home allValues={allValues} setAllValues={setAllValues} />)} />
          <Route path="/profile" component={Profile} />
          <Route path="/external-api" component={() => (<ExternalApi message={allValues.message} setMessage={setMessage} />)} />
        </Switch>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default App;