import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import UserAvatar from "./user-avatar";

const MainNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Nav className="mr-auto">
      <Nav.Link
        as={RouterNavLink}
        to="/"
        exact
        activeClassName="router-link-exact-active"
      >
        Home
      </Nav.Link>
      
      {isAuthenticated ? 
        <Nav.Link
          as={RouterNavLink}
          to="/profile"
          exact
          activeClassName="router-link-exact-active"
        >
          Profile
        </Nav.Link>
      : null}

      <Nav.Link
        as={RouterNavLink}
        to="/external-api"
        exact
        activeClassName="router-link-exact-active"
      >
        External API
      </Nav.Link>

      <Nav.Link
        as={RouterNavLink}
        to="/my-redirect"
        exact
        activeClassName="router-link-exact-active"
      >
        My Redirect
      </Nav.Link>

      <Nav.Link
        as={RouterNavLink}
        to="/begin-with-email"
        exact
        activeClassName="router-link-exact-active"
      >
        Begin with Email
      </Nav.Link>

      <Nav.Link
        as={RouterNavLink}
        to="/arengu"
        exact
        activeClassName="router-link-exact-active"
      >
        Arengu
      </Nav.Link>
    </Nav>
  );
};

const AuthNav = (props) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Nav className="justify-content-end">
      {isAuthenticated 
      ? <div>
          <UserAvatar/>
          <LogoutButton allValues={props.allValues} setAllValues={props.setAllValues} /> 
        </div>
      : <LoginButton allValues={props.allValues} setAllValues={props.setAllValues} /> }
    </Nav>
  )
};

const NavBar = (props) => {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo-grapes" to="/" />
        <MainNav />
        <AuthNav allValues={props.allValues} setAllValues={props.setAllValues} /> 
      </Container>
    </Navbar>
  );
};

export default NavBar;
