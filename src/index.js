import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0PRoviderWithHistory from "./auth0-provider-with-history";

import "./index.css";

ReactDOM.render(
  <Router>
    <Auth0PRoviderWithHistory>
      <App />
    </Auth0PRoviderWithHistory>
  </Router>,
  document.getElementById("root")
);
