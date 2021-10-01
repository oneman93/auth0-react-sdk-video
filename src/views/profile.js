import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight } from "../components";
import { Button } from "react-bootstrap";

export const Profile = () => {
  const { user } = useAuth0()

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img 
          src={user.picture}
          alt="Profile"
          className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>     

      <Row className="farBelow">        
        <div>Link me with other users (emails)</div>
        <input type="text" placeholder="oneman93@hotmail.com"/>
        <Button
          id="qsConnectBtn"
          variant="primary"
          className="btn-margin"
        >
          Connect
        </Button>
      </Row>
    </Container>
  );
};

export default Profile;
