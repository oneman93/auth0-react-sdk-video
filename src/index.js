import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0PRoviderWithHistory from "./auth0-provider-with-history";

import "./index.css";

// https://daveceddia.com/context-api-vs-redux/
// We need createStore, connect, and Provider
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

// Create a reducer with an empty initial state
const initialState = {};
function reducer(state = initialState, action) {
  switch (action.type) {
    // Respond to the SET_USER action and update the state accordingly
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}

// Create the store with the reducer
const store = createStore(reducer);

// Dispatch an action to set the user (since initial state is empty)
store.dispatch({
  type: "SET_USER",
  user: {
    avatar: "https://dolsoft.com.au/Image/stone.png",
    name: "Matthew2",
    followers: 1234,
    following: 123,
    avatarSize: 50
  }
});


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Auth0PRoviderWithHistory>
        <App />
      </Auth0PRoviderWithHistory>
    </Provider>
  </Router>,
  document.getElementById("root")
);
