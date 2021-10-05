import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Highlight } from "../components";
import { Profile, ProfileCascade  } from "../views";

export const ProfileWrapper = (props) => {
  const { isAuthenticated, user } = useAuth0()
  
  return (
    <Row>
      <Col>
        <div className="logo-cascade"/>
        <ProfileCascade allValues={props.allValues} setAllValues={props.setAllValues} />
      </Col>
      <Col md={1}></Col>
      
      
      <Col>
        <div className="logo"/>
        {isAuthenticated 
        ? <Profile allValues={props.allValues} setAllValues={props.setAllValues} /> 
        : null}
      </Col>
      
    </Row>    
  )
};

export default ProfileWrapper;
