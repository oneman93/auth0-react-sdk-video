import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// We need createStore, connect, and Provider
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

// This mapStateToProps function extracts a single key from state (user) and passes it as the `user` prop.
const mapStateToProps = state => ({
  user: state.user
});



const UserAvatarAtom = ({user}) => {
  
  return (
    <img
      className={`user-avatar w${user.avatarSize || ""}`}
      alt="user avatar"
      src={user.avatar}
    />
    
  );
};

// connect() UserAvatar so it receives the `user` directly, without having to receive it from a component above.
const UserAvatar = connect(mapStateToProps)(UserAvatarAtom);

export default UserAvatar;