import React, { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCountRenders } from "./useCountRenders";

export const Square = React.memo(({ n, increment }) => {
  
  useCountRenders();
  return (
    <button onClick={() => {increment(n)}  }>{n}</button>
  ) 
});

export default Square;